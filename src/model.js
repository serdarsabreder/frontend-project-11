const initState = () => ({
  feeds: [],
  posts: [],
  uiState: {
    visitedPosts: new Set(),
    modal: null,
  },
  error: null,
  processState: 'filling',
});

export default initState;
