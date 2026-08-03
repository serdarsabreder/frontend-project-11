const uniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).slice(2);
  return `${timestamp}-${randomPart}`;
};

const isAllOriginsUrl = (url) => {
  try {
    return new URL(url).host === 'allorigins.hexlet.app';
  } catch {
    return false;
  }
};

export { uniqueId, isAllOriginsUrl };
