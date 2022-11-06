import markup from './templates/film-card.hbs';

export default function markupColection(data) {
  document.querySelector('.movies__list').innerHTML = markup(data);
}
