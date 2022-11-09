import { refs } from './refs';

export function markupFooterModal(data) {
  const markup = data.map(item => ``).join('');
  console.log(markup);
  refs.students.innerHTML = markup;
}
