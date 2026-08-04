import i18next from 'i18next';

const renderStaticTexts = (elements) => {
  const {
    title,
    tagline,
    label,
    input,
    button,
    modalLink,
    modalClose,
  } = elements;

  document.documentElement.lang = i18next.language;
  title.textContent = i18next.t('title');
  tagline.textContent = i18next.t('tagline');
  label.textContent = i18next.t('url');
  input.placeholder = i18next.t('url');
  input.setAttribute('aria-label', i18next.t('url'));
  button.textContent = i18next.t('submit');
  modalLink.textContent = i18next.t('post.openFullArticle');
  modalClose.textContent = i18next.t('post.close');
};

export default renderStaticTexts;
