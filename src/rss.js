import axios from 'axios';
import parse from './parser.js';
import { isAllOriginsUrl } from './utils.js';

const allOriginsUrl = 'https://allorigins.win/get?disableCache=true&url=';

const getProxiedUrl = (url) => {
  if (isAllOriginsUrl(url)) {
    return url;
  }
  return `${allOriginsUrl}${encodeURIComponent(url)}`;
};

const fetchFeed = (url) => axios.get(getProxiedUrl(url))
  .then((response) => {
    const { contents, status } = response.data;
    if (status && status.http_code >= 400) {
      throw new Error('network');
    }
    return typeof contents === 'string' ? contents : response.data;
  })
  .then((data) => parse(data));

export default fetchFeed;
