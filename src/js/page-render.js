import { renderMarkupTrending } from './render-trending';
import { fetchTrending } from './fetch-trending';
import { spinnerOn, spinnerOff } from './spinner';
import { toggleLightTheme } from './day-night-theme';

export function pageRender(pageNum) {
  fetchTrending(pageNum)
    .then(data => {
      configMarkupData(data.results);
      renderMarkupTrending(data.results);

      toggleLightTheme();
    })
    .finally(() => spinnerOff());
  spinnerOn();
}

function configMarkupData(data) {
  const genresArr = JSON.parse(localStorage.getItem('genres'));
  data.map((elem, idx) => {
    const genresName = [];
    elem.genre_ids.map(genreId => {
      const genreEl = genresArr.find(genre => genre.id === genreId);
      genresName.push(genreEl?.name);
    });
    const arrLength = genresName.length;
    if (arrLength > 3) {
      genresName.splice(2, arrLength - 2, 'Other');
    }
    data[idx].genres_name_str = genresName.join(', ');
    if (elem.release_date) elem.release_date = elem.release_date.slice(0, 4);
    if (elem.first_air_date)
      elem.first_air_date = elem.first_air_date.slice(0, 4);
  });
}
