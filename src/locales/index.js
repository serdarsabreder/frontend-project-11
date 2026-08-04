import * as yup from 'yup';
import ru from './ru.js';
import en from './en.js';

yup.setLocale({
  mixed: {
    required: 'required',
  },
  string: {
    url: 'invalidUrl',
  },
});

const resources = {
  ru,
  en,
};

export default resources;
