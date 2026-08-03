import i18next from 'i18next';
import onChange from 'on-change';
import resources from './locales/index.js';
import initState from './model.js';
import initController from './controllers.js';
import initUpdater from './updater.js';
import * as view from './view/index.js';

const getElements = () => ({
  title: document.querySelector('#page-title'),
  form: document.querySelector('#rss-form'),
  input: document.querySelector('#url-input'),
  button: document.querySelector('#rss-form button[type="submit"]'),
  feedback: document.querySelector('#feedback'),
  feedsContainer: document.querySelector('#feeds'),
  postsContainer: document.querySelector('#posts'),
  tagline: document.querySelector('#tagline'),
  feedsHeading: document.querySelector('#feeds-heading'),
  postsHeading: document.querySelector('#posts-heading'),
  languagesDropdownLabel: document.querySelector('#languages-label'),
  languageButtons: document.querySelectorAll('[data-language]'),
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

  const watchedState = onChange(state, (path) => {
    view.render(watchedState, elements, path);
  });

  i18next.init({ resources, lng: 'ru', fallbackLng: 'ru' })
    .then(() => {
      view.renderAll(watchedState, elements);
      initController(watchedState, elements, view);
      initUpdater(watchedState, elements);
    });
};

export default initApp;
