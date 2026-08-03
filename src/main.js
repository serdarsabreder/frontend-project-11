import 'bootstrap';
import './styles.css';

const form = document.querySelector('#rss-form');
const input = form.querySelector('#url-input');
const button = form.querySelector('button[type="submit"]');
const feedback = form.querySelector('#feedback');

const handleSubmit = (event) => {
  event.preventDefault();

  if (!input.value.trim()) {
    input.classList.add('is-invalid');
    feedback.textContent = 'The field cannot be empty';
    return;
  }

  input.classList.remove('is-invalid');
  feedback.textContent = '';
  input.value = '';
  button.disabled = true;
};

form.addEventListener('submit', handleSubmit);
input.addEventListener('input', () => {
  input.classList.remove('is-invalid');
  feedback.textContent = '';
  button.disabled = false;
});
