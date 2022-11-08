import { renderMarkupTrending } from './render-trending';
import { fetchTrending } from './fetch-trending';
import NewsApiService from './fetch-colection';
import { refs } from './refs';
import Notiflix from 'notiflix';
import { pageRender, parseMeta } from './page-render';

const newsApiService = new NewsApiService();
refs.formRef.addEventListener('submit', searchMovie);

function searchMovie(e) {
  e.preventDefault();

  newsApiService.query = refs.inputRef.value.trim();
  console.log(newsApiService.query);

  if (!newsApiService.query) {
    Notiflix.Notify.failure('Enter data to search.');
    pageRender(1);
    return;
  } else {
    newsApiService
      .fetchMovies()
      .then(data => {
        console.log(data);
        data = parseMeta(data);
        renderMarkupTrending(data.results);
      })
      .catch(error => {
        clearCard();
        Notiflix.Notify.failure(error);
        pageRender(1);
      })
      .finally(() => {
        clearInput();
      });
  }
}

function clearCard() {
  document.querySelector('.movies__list').innerHTML = '';
}
function clearInput() {
  document.querySelector('.search__input').value = '';
}
