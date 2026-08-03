import { Modal } from 'bootstrap';

const renderModal = (post, elements) => {
  if (!post) {
    return;
  }
  const {
    modal, modalTitle, modalBody, modalLink,
  } = elements;

  modalTitle.textContent = post.title;
  modalBody.textContent = post.description;
  modalLink.href = post.link;

  const modalInstance = Modal.getOrCreateInstance(modal);
  modalInstance.show();
};

export default renderModal;
