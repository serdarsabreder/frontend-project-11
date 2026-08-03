const getTagContent = (node, tag) => {
  const element = node.querySelector(tag);
  return element ? element.textContent.trim() : '';
};

const parse = (data) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'application/xml');
  const parseError = xml.querySelector('parsererror');
  if (parseError) {
    const error = new Error('noRss');
    error.isParsingError = true;
    throw error;
  }

  const channel = xml.querySelector('channel');
  if (!channel) {
    const error = new Error('noRss');
    error.isParsingError = true;
    throw error;
  }

  const title = getTagContent(channel, 'title');
  const description = getTagContent(channel, 'description');

  if (!title) {
    const error = new Error('noRss');
    error.isParsingError = true;
    throw error;
  }

  const items = [...channel.querySelectorAll('item')].map((item) => ({
    title: getTagContent(item, 'title'),
    description: getTagContent(item, 'description'),
    link: getTagContent(item, 'link'),
    pubDate: getTagContent(item, 'pubDate'),
  }));

  return { title, description, items };
};

export default parse;
