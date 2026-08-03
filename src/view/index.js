import renderFeeds from './feeds.js';
import renderPosts from './posts.js';
import renderFeedback from './feedback.js';
import renderModal from './modal.js';
import renderStaticTexts from './static.js';

const render = (state, elements, path) => {
  if (path === 'processState' || path === 'error') {
    renderFeedback(state, elements);
  }

  if (path === 'uiState.modal') {
    renderModal(state.uiState.modal, elements);
  }

  if (path.startsWith('uiState.visitedPosts')) {
    renderPosts(state, elements);
  }

  if (path === 'feeds' || path.startsWith('feeds.')) {
    renderFeeds(state.feeds, elements);
  }

  if (path === 'posts' || path.startsWith('posts.')) {
    renderPosts(state, elements);
  }
};

const renderAll = (state, elements) => {
  renderStaticTexts(elements);
  renderFeeds(state.feeds, elements);
  renderPosts(state, elements);
  renderFeedback(state, elements);
};

export { render, renderAll };
