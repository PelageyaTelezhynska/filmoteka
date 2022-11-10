import { renderMarkupModal } from './render-modal';
import { fetchModal } from './fetch-modal';
import { spinnerOn, spinnerOff } from './spinner';
import {onTrailerClick} from './modal-trailer';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'fa9433e46ed4abfaeb75bcf31f473feb';

import { refs } from './refs';


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



// const trailerBtn = document.querySelector('.trailer-btn');

// trailerBtn.addEventListener('click', onTrailerClick);

// //id трейлера взяла из модалки фильма и передала в функцию fetchTrailer как аргумент currentId 
// async function fetchTrailer(currentId) {
//   const response = await fetch(
//     `${BASE_URL}${currentId}/videos?api_key=${API_KEY}&language=en-US`,
//   );
//   const data = await response.json();
//   return data.results;
// }

// async function onTrailerClick(evt) {
//   const currentFilm = document.querySelector('.js-item');
//   const currentId = Number(currentFilm.dataset.id);
//   const data = await fetchTrailer(currentId);
//   renderMarkupTrailer(data);
//   toggleModal();
// }

// async function renderMarkupTrailer(data) {
//   const markup = data
//     .map(({ key }) => {
//       return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
//     })
//     .join('');
//   const instance = basicLightbox.create(markup);
//   instance.show();
// }







