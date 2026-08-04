import axios from 'axios';
import * as yup from 'yup';
import fetchFeed from './rss.js';
import { uniqueId } from './utils.js';

const buildSchema = (feeds) => yup.string()
  .trim()
  .required('required')
  .url('invalidUrl')
  .notOneOf(feeds.map((feed) => feed.url), 'exists');

const buildErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    return 'network';
  }
  return error.message;
};

const initController = (state, elements) => {
  const {
    form, input, postsContainer,
  } = elements;

  const openModal = (post) => {
    state.uiState.visitedPosts[post.id] = true;
    state.uiState.modal = post;
  };

  const loadFeed = (url) => {
    state.processState = 'loading';
    return fetchFeed(url);
  };

  const handleError = (error) => {
    state.error = buildErrorMessage(error);
    state.processState = 'failed';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    state.error = null;
    state.processState = 'filling';

    const url = new FormData(form).get('url').trim();

    const handleSuccess = (feed) => {
      state.processState = 'parsing';
      const feedId = uniqueId();

      state.feeds.push({
        id: feedId,
        title: feed.title,
        description: feed.description,
        url,
      });
      state.posts.push(...feed.items.map((item) => ({
        ...item,
        id: uniqueId(),
        feedId,
      })));

      state.processState = 'succeeded';
      form.reset();
      input.disabled = false;
      input.focus();
    };

    buildSchema(state.feeds).validate(url)
      .then(loadFeed)
      .then(handleSuccess)
      .catch(handleError);
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
};

export default initController;
