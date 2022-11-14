import { renderMarkupModal } from './render-modal';
import { fetchModal } from './fetch-modal';
import { spinnerOn, spinnerOff } from './spinner';
import { fetchTrailer } from './modal-trailer';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'fa9433e46ed4abfaeb75bcf31f473feb';

import { refs } from './refs';

refs.sliderModal.addEventListener('click', openModal);
refs.closeModalSliderBtn.addEventListener('click', toggleModal);
refs.backdropSlider.addEventListener('click', onBackdropClick);

function openModal(evt) {
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

  refs.trailerBtn.addEventListener('click', () => fetchTrailer(currentId), {
    once: true,
  });

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

// щоб трейлер закривався при закритті модалки
refs.closeModalBtn.addEventListener('click', () => {
  document.querySelector('.modal-trailer')
    ? (document.querySelector('.modal-trailer').innerHTML = '')
    : null;
});
