import i18next from 'i18next';

const renderFeeds = (feeds, elements) => {
  const { feedsContainer } = elements;

  if (feeds.length === 0) {
    feedsContainer.replaceChildren();
    return;
  }

  const heading = document.createElement('h2');
  heading.classList.add('section-title');
  heading.textContent = i18next.t('feeds');

  const list = document.createElement('ul');
  list.classList.add('feeds-list');

  feeds.forEach((feed) => {
    const card = document.createElement('li');
    card.classList.add('feed-card');

    const info = document.createElement('div');
    info.classList.add('feed-info');

    const title = document.createElement('h3');
    title.classList.add('feed-title');
    title.textContent = feed.title;

    const description = document.createElement('p');
    description.classList.add('feed-desc');
    description.textContent = feed.description;

    info.append(title, description);
    card.append(info);
    list.append(card);
  });

  feedsContainer.replaceChildren(heading, list);
};

export default renderFeeds;
