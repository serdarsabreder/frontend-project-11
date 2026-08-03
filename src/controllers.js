import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';
import fetchFeed from './rss.js';
import { uniqueId } from './utils.js';

const schema = yup.string().trim().required('invalidUrl').url('invalidUrl');

const buildErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    return 'network';
  }
  return error.message;
};

const initController = (state, elements, view) => {
  const {
    form, input, postsContainer, languageButtons,
  } = elements;

  const openModal = (post) => {
    state.uiState.visitedPosts.add(post.id);
    state.uiState.modal = post;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    state.error = null;

    const formData = new FormData(form);
    const url = formData.get('url').trim();

    schema.validate(url)
      .then(() => {
        const isExists = state.feeds.some((feed) => feed.url === url);
        if (isExists) {
          throw new Error('exists');
        }
      })
      .then(() => {
        state.processState = 'loading';
        return fetchFeed(url);
      })
      .then((feed) => {
        state.processState = 'parsing';
        const feedId = uniqueId();
        state.feeds.push({
          id: feedId,
          title: feed.title,
          description: feed.description,
          url,
        });
        const newPosts = feed.items.map((item) => ({
          ...item,
          id: uniqueId(),
          feedId,
        }));
        state.posts.push(...newPosts);
        state.processState = 'succeeded';
        form.reset();
        input.focus();
      })
      .catch((error) => {
        state.error = buildErrorMessage(error);
        state.processState = 'failed';
      });
  };

  const handlePostsClick = (event) => {
    const link = event.target.closest('a[data-id]');
    if (link) {
      event.preventDefault();
      const post = state.posts.find((item) => item.id === link.dataset.id);
      if (post) {
        openModal(post);
      }
      return;
    }

    const button = event.target.closest('button[data-id]');
    if (button) {
      const post = state.posts.find((item) => item.id === button.dataset.id);
      if (post) {
        openModal(post);
      }
    }
  };

  const handleInput = () => {
    state.error = null;
  };

  form.addEventListener('submit', handleSubmit);
  input.addEventListener('input', handleInput);
  postsContainer.addEventListener('click', handlePostsClick);

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const { language } = button.dataset;
      i18next.changeLanguage(language).then(() => {
        view.renderAll(state, elements);
      });
    });
  });
};

export default initController;
