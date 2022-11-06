import markup from './templates/film-card.hbs';
import { refs } from './refs';

export default function markupColection(data) {
  refs.containerCard.innerHTML = markup(data);
}
