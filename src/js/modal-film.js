import { renderMarkupModal } from './render-modal';
import { fetchModal } from './fetch-modal';
import { spinnerOn, spinnerOff } from './spinner';
import {onTrailerClick} from './modal-trailer';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'fa9433e46ed4abfaeb75bcf31f473feb';

import { refs } from './refs';

refs.openModalCard.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.backdrop.addEventListener('click', onBackdropClick);


export function openModal(evt) {
  if (evt.currentTarget === evt.target) {
    return;
  }
  document.querySelector('.wrap-disc').innerHTML = '';

  const currentFilm = evt.target.closest('.js-item');
  const currentId = Number(currentFilm.dataset.id);
  fetchModal(currentId)
    .then(data => {
      renderMarkupModal(data);
    })
    .finally(() => spinnerOff());
  spinnerOn();
  toggleModal();
  
}

function toggleModal() {
  window.addEventListener('keydown', onEscPress);
  refs.modalFilm.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
  if (refs.modalFilm.classList.contains('is-hidden')) {
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
