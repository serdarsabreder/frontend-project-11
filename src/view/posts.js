import i18next from 'i18next';

const renderPosts = (state, elements) => {
  const { postsContainer } = elements;
  const { posts, uiState } = state;

  if (posts.length === 0) {
    postsContainer.replaceChildren();
    return;
  }

  const heading = document.createElement('h2');
  heading.classList.add('section-title');
  heading.textContent = i18next.t('posts');

  const list = document.createElement('ul');
  list.classList.add('posts-list');

  posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('post-item');

    const link = document.createElement('a');
    link.href = post.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.dataset.id = post.id;
    link.textContent = post.title;
    link.classList.add('post-link');
    link.classList.add(Object.hasOwn(uiState.visitedPosts, post.id) ? 'fw-normal' : 'fw-bold');

    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.id = post.id;
    button.classList.add('btn-view');
    button.textContent = i18next.t('post.preview');

    li.append(link, button);
    list.append(li);
  });

  postsContainer.replaceChildren(heading, list);
};

export default renderPosts;
