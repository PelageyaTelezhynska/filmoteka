// const filmItems = [
//   {
//     poster_path:
//       'https://i11.haber7.net//haber/haber7/photos/2022/30/VZbHy_1658831645_6941.jpg',
//     id: 1,
//     title: 'Bullet Train',
//     vote: 7.3,
//     votes: 1250,
//     popularity: 100.2,
//     original_title: 'Bullet Train',
//     genre: 'action, thriller',
//     about:
//       'Take a trip to Tokyo. Buy a ticket for the near-mythical bullet train. And as that sleek metal snake rockets to a staggering top speed of 200mph, you’ll no doubt find yourself thinking: this would make an amazing setting for an all-guns-blazing action-comedy.',
//   },
// ];

const refs = {
  openModalCard: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
  backdrop: document.querySelector('.backdrop'),
};

refs.openModalCard.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function openModal(evt) {
  if (evt.currentTarget === evt.target) {
    return;
  }
  toggleModal();
}

function toggleModal() {
  window.addEventListener('keydown', onEscPress);
  refs.modal.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
  if (refs.modal.classList.contains('is-hidden')) {
    window.removeEventListener('keydown', onEscPress);
  }
}

function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    toggleModal();
  }
}

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    toggleModal();
  }
}
