import { renderMarkupModal } from './render-modal';
import { fetchModal } from './fetch-modal';
import { spinnerOn, spinnerOff } from './spinner';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'fa9433e46ed4abfaeb75bcf31f473feb';

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
  document.querySelector('.wrap-disc').innerHTML = '';

  const currentFilm = evt.target.closest('.js-item');
  const currentId = Number(currentFilm.dataset.id);
  fetchModal(currentId)
    .then(data => {
      // console.dir(data);
      renderMarkupModal(data);
    })
    .finally(() => spinnerOff());
  spinnerOn();
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
