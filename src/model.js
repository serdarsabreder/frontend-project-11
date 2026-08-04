import { proxy, unstable_enableOp as enableOpTracking } from 'valtio/vanilla';

enableOpTracking(true);

const initState = () => proxy({
  feeds: [],
  posts: [],
  uiState: {
    visitedPosts: {},
    modal: null,
  },
  error: null,
  processState: 'filling',
});

export default initState;
