import markupGenreSelect from './templates/markup-genre-select.hbs';

export function renderGenreSelect() {
  const genresArr = JSON.parse(localStorage.getItem('genres'));
  // console.log(genresArr);
  document
    .querySelector('.genre-select')
    .insertAdjacentHTML('beforeend', markupGenreSelect(genresArr));
}
