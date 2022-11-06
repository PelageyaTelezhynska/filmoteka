import { renderMarkupTrending } from './render-trending';
import { fetchTrending } from './fetch-trending';
import NewsApiService from './fetch-colection';
import { refs } from './refs';
import Notiflix from 'notiflix';
import { spinnerOn, spinnerOff } from './spinner';
export function pageRender(pageNum) {

    fetchTrending(pageNum).then(data => {
        data.results.map(elem => {
            if (elem.release_date) elem.release_date = elem.release_date.slice(0, 4);
            if (elem.first_air_date) elem.first_air_date = elem.first_air_date.slice(0, 4);
        })
        const genresArr = JSON.parse(localStorage.getItem('genres'));
        data.results.map((elem, idx) => {
            const genresName = [];
            elem.genre_ids.map((genreId) => {
                const genreEl = genresArr.find(genre => genre.id === genreId);                
                genresName.push(genreEl?.name);
            });
            const arrLength = genresName.length;
            if (arrLength > 3){
                genresName.splice(2, arrLength - 2, "Other")
            }
            data.results[idx].genres_name_str = genresName.join(', ');
        })
        console.log(data.results);
        renderMarkupTrending(data.results);

    })
    .finally(() => spinnerOff());
  spinnerOn();
}

const newsApiService = new NewsApiService();
refs.inputRef.addEventListener('input', searchMovie);

export function searchMovie(e) {
  e.preventDefault();

  newsApiService.query = refs.inputRef.value.trim();

  newsApiService
    .fetchMovies()
    .then(data => {
      renderMarkupTrending(data.results);
    })
    .catch(error => {
      clearCard();
      Notiflix.Notify.failure(error);
    });
}

function clearCard() {
 document.querySelector('.movies__list') = '';
}
