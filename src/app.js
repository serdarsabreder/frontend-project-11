import i18next from 'i18next';
import resources from './locales/index.js';
import initState from './model.js';
import initController from './controllers.js';
import initUpdater from './updater.js';
import { initView, renderAll } from './view/index.js';

const getElements = () => ({
  title: document.querySelector('#page-title'),
  label: document.querySelector('#url-label'),
  form: document.querySelector('#rss-form'),
  input: document.querySelector('#url-input'),
  button: document.querySelector('#rss-form button[type="submit"]'),
  feedback: document.querySelector('#feedback'),
  errorIcon: document.querySelector('#input-error-icon'),
  feedsContainer: document.querySelector('#feeds'),
  postsContainer: document.querySelector('#posts'),
  tagline: document.querySelector('#tagline'),
  modal: document.querySelector('#modal'),
  modalTitle: document.querySelector('#modal-title'),
  modalBody: document.querySelector('#modal-body'),
  modalLink: document.querySelector('#modal-link'),
  modalClose: document.querySelector('#modal-close'),
  toast: document.querySelector('#toast'),
  toastBody: document.querySelector('#toast-body'),
});

const initApp = () => {
  const state = initState();
  const elements = getElements();

  initView(state, elements);

  i18next.init({ resources, lng: 'ru', fallbackLng: 'ru' })
    .then(() => {
      renderAll(state, elements);
      initController(state, elements);
      initUpdater(state, elements);
    });
};

export default initApp;
