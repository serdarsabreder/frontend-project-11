import i18next from 'i18next';
import { Toast } from 'bootstrap';
import fetchFeed from './rss.js';
import { uniqueId } from './utils.js';

const initUpdater = (state, elements) => {
  const { toast, toastBody } = elements;
  const toastInstance = Toast.getOrCreateInstance(toast);

  const updateFeeds = () => {
    const requests = state.feeds.map((feed) => fetchFeed(feed.url)
      .then((data) => {
        const existingLinks = state.posts
          .filter((post) => post.feedId === feed.id)
          .map((post) => post.link);
        const newPosts = data.items
          .filter((item) => !existingLinks.includes(item.link))
          .map((item) => ({ ...item, id: uniqueId(), feedId: feed.id }));
        if (newPosts.length > 0) {
          state.posts.push(...newPosts);
          toastBody.textContent = i18next.t('newPosts', { title: feed.title });
          toastInstance.show();
        }
      })
      .catch(() => null));
    Promise.all(requests).catch(() => null);
  };

  setInterval(updateFeeds, 5000);
};

export default initUpdater;
