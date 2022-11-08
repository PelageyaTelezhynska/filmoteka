import { renderMarkupModal } from './render-modal';
import { fetchModal } from './fetch-modal';
import { spinnerOn, spinnerOff } from './spinner';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
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









//потрібно виправити функцію fetchTrailer щоб вона відображала трейлер по кліку 
//на кнопку trailer-button в модальному вікні фільму (приклад вище) і видалити 
//ункцію onTrailerClick з index.js та зв'язані з нею функції




function fetchTrailer() {
  const BASE_URL = 'https://api.themoviedb.org/3/movie/';
  const API_KEY = 'fa9433e46ed4abfaeb75bcf31f473feb';
  const movie_id = 475557;
  const url = `${BASE_URL}${movie_id}/videos?api_key=${API_KEY}&language=en-US`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const trailer = data.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube',
      );
      const trailerMarkup = createTrailerMarkup(trailer);
      insertTrailerMarkup(trailerMarkup);
    });
}

function createTrailerMarkup(trailer) {
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

function insertTrailerMarkup(trailerMarkup) {
  const trailerContainer = document.querySelector('.trailer');
  trailerContainer.insertAdjacentHTML('beforeend', trailerMarkup);
}

function renderMarkupModal(data) {
  const markup = createMarkupModal(data);
  insertMarkupModal(markup);
}

function createMarkupModal(data) {
  return `<div class="modal">
  <div class="modal__content">
    <button type="button" class="modal__close-btn" data-modal-close>
      <svg class="modal__close-icon" width="20" height="20">
        <use href="./images/sprite.svg#icon-close"></use>
      </svg>
    </button>
    <div class="modal__poster">
      <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}" />
    </div>
    <div class="modal__info">
      <h2 class="modal__title">${data.title}</h2>
      <p class="modal__vote">User Score: ${data.vote_average * 10}%</p>
      <h3 class="modal__subtitle">Overview</h3>
      <p class="modal__description">${data.overview}</p>
      <h3 class="modal__subtitle">Genres</h3>
      <ul class="modal__genres">
        ${data.genres.map(genre => `<li class="modal__genre">${genre.name}</li>`).join('')}
      </ul>
    </div>
    <div class="trailer"></div>
  </div>
</div>`;
}

function insertMarkupModal(markup) {
  const modalContainer = document.querySelector('.backdrop');
  modalContainer.insertAdjacentHTML('beforeend', markup);
}

function fetchModal(currentId) {
  const BASE_URL = 'https://api.themoviedb.org/3/movie/';
  const API_KEY = 'fa9433e46ed4abfaeb75bcf31f473feb';
  const url = `${BASE_URL}${currentId}?api_key=${API_KEY}&language=en-US`;
  return fetch(url).then(response => response.json());
}

function spinnerOn() {
  refs.spinner.classList.remove('is-hidden');
}

function spinnerOff() {
  refs.spinner.classList.add('is-hidden');
}

function fetchFilms() {
  const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day?';
  const API_KEY = 'fa9433e46ed4abfaeb75bcf31f473feb';
  const url = `${BASE_URL}api_key=${API_KEY}`;
  return fetch(url).then(response => response.json());
}

function renderMarkup(data) {
  const markup = createMarkup(data);
  insertMarkup(markup);
}



function renderTrailer(data) {
  const markup = `<div class="trailer-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/${data.results[0].key}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>`;
  document.querySelector('.wrap-disc').insertAdjacentHTML('beforeend', markup);
}

function renderMarkupModal(data) {
  const markup = ` <img class='modal-poster'
    src='https://image.tmdb.org/t/p/w500${data.poster_path}' alt=${
    data.title
  } width='240'/>
  <div>

    <div>
      <h2 class='modal-movie-title'>${data.title}</h2>

      <div class='wrap-flex'>
        <div class="labels-wrap">
          <p class='movie-label'>Vote / Votes</p>
          <p class='movie-label'>Popularity</p>
          <p class='movie-label'>Original Title</p>
          <p class='movie-label'>Genre</p>
        </div>
        <div class="values-wrap">
          <p class='movie-value'>${data.vote_average} / ${data.vote_count}</p>
          <p class='movie-value'>${data.popularity}</p>
          <p class='movie-value'>${data.original_title}</p>
          <p class='movie-value'>${data.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
    </div>

    <div class='wrap-disc'>
      <h3 class='modal-movie-title'>Overview</h3>
      <p class='modal-movie-disc'>${data.overview}</p>
    </div>
  </div>`;
  refs.modal.insertAdjacentHTML('beforeend', markup);
}

function fetchModal(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=fa9433e46ed4abfaeb75bcf31f473feb&language=en-US`,
  )
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}


// const btnModalTrailer = document.querySelector('.trailer-button');

// console.log(btnModalTrailer);

// btnModalTrailer.addEventListener('click', onTrailerClick);

// function onTrailerClick() {
//   fetchTrailer().then(renderTrailer);
// }

// function fetchTrailer() {

//   return fetch(
//     `https://api.themoviedb.org/3/movie/337401/videos?api_key=fa9433e46ed4abfaeb75bcf31f473feb&language=en-US`,
//   )
//     .then(response => response.json())
//     .then(data => data)
//     .catch(error => console.log(error));
// }





// function fetchTrailer(currentId) {
//   const BASE_URL = 'https://api.themoviedb.org/3/movie/';
//   const API_KEY = 'fa9433e46ed4abfaeb75bcf31f473feb';
//   return fetch(`${BASE_URL}${currentId}/videos?api_key=${API_KEY}&language=en-US`)
//     .then(response => response.json())
//     .then(data => data.results[0]);
// }





