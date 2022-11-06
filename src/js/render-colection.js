import markup from './templates/markup-trending.hbs';

export default function markupColection(data) {
  document.querySelector('.movies__list').innerHTML = markup(data);
}
