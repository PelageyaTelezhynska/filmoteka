import { fetchTrending } from './fetch-trending';
import { configMarkupData } from './page-render';
import { insertRenderMarkupTrending } from './render-trending';
import { addPagination } from './pagination';
import { pageRender } from './page-render';
import Pagination from 'tui-pagination';
import Notiflix from 'notiflix';
import { spinnerOn, spinnerOff } from './spinner';

const selectGenre = document.querySelector('.genre-select');
const sentinel = document.querySelector('.sentinel');
const options = {
  rootMargin: '1000px',
  threshold: 1,
};
const observer = new IntersectionObserver(onLoad, options);
let page = 1;
let selectionGenre = Number(selectGenre.value);

selectGenre.addEventListener('change', onGenreSelect);

function onGenreSelect() {
  page = 1;
  if (Number(selectGenre.value)) selectionGenre = Number(selectGenre.value);
  else {
    document.querySelector('.movies__list').innerHTML = '';
    pageRender(1);
    addPagination();
    unobserve();
    return;
  }
  document.querySelector('.movies__list').innerHTML = '';
  const pagination = new Pagination(document.getElementById('pagination'));
  pagination.off();

  sessionStorage.setItem('searchGenresData', '[]');
  creatingRenderData(page, selectionGenre);
}

function creatingRenderData(page, selectionGenre) {
  fetchTrending(page)
    .then(data => {
      configMarkupData(data.results);
      filtrData(data, selectionGenre);
      if (JSON.parse(sessionStorage.getItem('searchGenresData')).length <= 18) {
        if (page >= 1000) {
          insertRenderMarkupTrending(
            JSON.parse(sessionStorage.getItem('searchGenresData'))
          );
          Notiflix.Notify.info(
            `The list of ${
              selectGenre.options[selectGenre.selectedIndex].text
            } movies is over`
          );
          return;
        }
        page += 1;
        creatingRenderData(page, selectionGenre);
      } else {
        const storageData = JSON.parse(
          sessionStorage.getItem('searchGenresData')
        );
        const renderingData = storageData.splice(0, 18);
        sessionStorage.setItem('searchGenresData', JSON.stringify(storageData));
        page += 1;
        sessionStorage.setItem('searchGenresPage', JSON.stringify(page));
        insertRenderMarkupTrending(renderingData);
        observer.observe(sentinel);
        return;
      }
    })
    .catch(console.log)
    .finally(() => {
      spinnerOff();
    });
  spinnerOn();
}

function filtrData(data, selectionGenre) {
  data.results.forEach(movie => {
    if (movie.genre_ids.includes(selectionGenre)) {
      const moviesArr = JSON.parse(sessionStorage.getItem('searchGenresData'));
      moviesArr.push(movie);
      sessionStorage.setItem('searchGenresData', JSON.stringify(moviesArr));
    }
  });
}

function onLoad(entries) {
  if (entries[0].isIntersecting) {
    page = JSON.parse(sessionStorage.getItem('searchGenresPage'));
    console.log(page);
    creatingRenderData(page, selectionGenre);
  }
}

export function unobserve() {
  observer.unobserve(sentinel);
}
