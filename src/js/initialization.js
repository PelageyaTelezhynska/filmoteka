import { markupTrending } from './render-trending';
import { fetchTrending } from './fetch-trending';
import NewsApiService from './fetch-colection';
import markupColection from './render-colection';
import { refs } from './refs';
import Notiflix from 'notiflix';

// export function init() {
//   fetchTrending().then(data => {
//     // console.log(data.results);
//     markupTrending(data.results);
//   });
// }

// const newsApiService = new NewsApiService();
// refs.inputRef.addEventListener('input', searchMovie);

// export function searchMovie(e) {
//   e.preventDefault();

//   newsApiService.query = refs.inputRef.value.trim();

//   newsApiService
//     .fetchMovies()
//     .then(data => {
//       markupColection(data.results);
//     })
//     .catch(error => {
//       clearCard();
//       Notiflix.Notify.failure(error);
//     });
// }

// function clearCard() {
//  document.querySelector('.movies__list') = '';
// }
