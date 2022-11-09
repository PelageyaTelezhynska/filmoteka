import { renderMarkupTrending } from './render-trending';
import { fetchTrending } from './fetch-trending';
import NewsApiService from './fetch-colection';
import { refs } from './refs';
import Notiflix from 'notiflix';
import { pageRender, parseMeta } from './page-render';
import Pagination from 'tui-pagination';
import { toggleLightTheme } from './day-night-theme';

const newsApiService = new NewsApiService();
refs.formRef.addEventListener('submit', searchMovie);

function searchMovie(e) {
  e.preventDefault();
  newsApiService.query = refs.inputRef.value.trim();
  // console.log(newsApiService.query);

  if (!newsApiService.query) {
    Notiflix.Notify.failure('Enter data to search.');
    pageRender(1);
    return;
  } else {
    newsApiService
      .fetchMovies(1)
      .then(data => {
        data = parseMeta(data);
        renderMarkupTrending(data.results);
        const searchTotalResults = data.total_results;
        const pagination = new Pagination(
          document.getElementById('pagination'),
          {
            totalItems: searchTotalResults,
            itemsPerPage: 20,
            visiblePages: 5,
            centerAlign: true,
          }
        );
        pagination.on('afterMove', function (eventData) {
          toggleLightTheme();
          searchPageRender(eventData.page);
        });
      })
      .catch(error => {
        clearCard();
        toggleLightTheme();
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

function searchPageRender(pageNum) {
  newsApiService.fetchMovies(pageNum).then(data => {
    data = parseMeta(data);
    renderMarkupTrending(data.results);
    toggleLightTheme();
  });
}
