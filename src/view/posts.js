import i18next from 'i18next';

const renderPosts = (state, elements) => {
  const { postsContainer } = elements;
  const { posts, uiState } = state;

  const list = document.createElement('ul');
  list.classList.add('list-group');

  posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'gap-2',
    );

    const link = document.createElement('a');
    link.href = post.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.dataset.id = post.id;
    link.textContent = post.title;
    link.classList.add(uiState.visitedPosts.has(post.id) ? 'fw-normal' : 'fw-bold');

    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.id = post.id;
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'flex-shrink-0');
    button.textContent = i18next.t('post.preview');

    li.append(link, button);
    list.append(li);
  });

  postsContainer.replaceChildren(list);
};

export default renderPosts;
