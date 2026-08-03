const renderFeeds = (feeds, elements) => {
  const { feedsContainer } = elements;

  const list = document.createElement('ul');
  list.classList.add('list-group', 'mb-5');

  feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');

    const title = document.createElement('h3');
    title.classList.add('h6', 'm-0');
    title.textContent = feed.title;

    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feed.description;

    li.append(title, description);
    list.append(li);
  });

  feedsContainer.replaceChildren(list);
};

export default renderFeeds;
