import i18next from 'i18next';

const renderFeedback = (state, elements) => {
  const {
    input, button, feedback,
  } = elements;

  const isLoading = state.processState === 'loading' || state.processState === 'parsing';
  input.disabled = isLoading;
  button.disabled = isLoading;

  feedback.classList.remove('text-secondary', 'text-success', 'text-danger');

  if (state.error) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
    feedback.textContent = i18next.t(`feedback.${state.error}`);
    return;
  }

  input.classList.remove('is-invalid');

  if (state.processState === 'succeeded') {
    feedback.classList.add('text-success');
    feedback.textContent = i18next.t('feedback.success');
    return;
  }

  feedback.textContent = '';
};

export default renderFeedback;
