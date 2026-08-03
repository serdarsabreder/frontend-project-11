import i18next from 'i18next';

const renderStaticTexts = (elements) => {
  const {
    title,
    tagline,
    feedsHeading,
    postsHeading,
    input,
    button,
    languagesDropdownLabel,
    modalLink,
    modalClose,
  } = elements;

  document.documentElement.lang = i18next.language;
  title.textContent = i18next.t('title');
  tagline.textContent = i18next.t('tagline');
  feedsHeading.textContent = i18next.t('feeds');
  postsHeading.textContent = i18next.t('posts');
  input.placeholder = i18next.t('url');
  button.textContent = i18next.t('submit');
  languagesDropdownLabel.textContent = i18next.t('languages');
  modalLink.textContent = i18next.t('post.openFullArticle');
  modalClose.textContent = i18next.t('post.close');
};

export default renderStaticTexts;
