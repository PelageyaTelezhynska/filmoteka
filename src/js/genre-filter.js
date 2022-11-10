import { fetchTrending } from './fetch-trending';
import { configMarkupData } from './page-render';
import { renderMarkupTrending } from './render-trending';
import Pagination from 'tui-pagination';

const selectGenre = document.querySelector('.genre-select');
selectGenre.addEventListener('change', onGenreSelect);

function onGenreSelect() {
  const pagination = new Pagination(document.getElementById('pagination'));
  pagination.off();

  sessionStorage.setItem('searchGenresData', '[]');
  creatingRenderData(1, selectGenre.value);
}

function creatingRenderData(page, selectionGenre) {
  fetchTrending(page)
    .then(data => {
      configMarkupData(data.results);
      data.results.forEach(movie => {
        if (movie.genre_ids.includes(Number(selectionGenre))) {
          const moviesArr = JSON.parse(
            sessionStorage.getItem('searchGenresData')
          );
          moviesArr.push(movie);
          sessionStorage.setItem('searchGenresData', JSON.stringify(moviesArr));
        }
      });
      if (JSON.parse(sessionStorage.getItem('searchGenresData')).length <= 18)
        creatingRenderData(page + 1, selectionGenre);
      else {
        const storageData = JSON.parse(
          sessionStorage.getItem('searchGenresData')
        );
        const renderingData = storageData.splice(0, 18);
        sessionStorage.setItem('searchGenresData', JSON.stringify(storageData));
        renderMarkupTrending(renderingData);
        return;
      }
    })
    .catch(console.log);
}
