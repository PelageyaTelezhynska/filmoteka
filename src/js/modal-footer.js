import { refs } from './refs';
import { studentsInfo } from './students-info';
// import markup from './templates/student-card.hbs';
// import { markupFooterModal } from './markup-footer-modal';

refs.footerBtn.addEventListener('click', openModalFooter);
refs.closeModalFooterBtn.addEventListener('click', toggleModalFooter);
refs.backdropFooter.addEventListener('click', onBackdropClickFooter);

function openModalFooter(e) {
  // e.preventDefault();
  // markupFooterModal(studentsInfo);
  // const render = markup(studentsInfo);
  // refs.students.innerHTML = render;

  toggleModalFooter();
}

function toggleModalFooter() {
  window.addEventListener('keydown', onEscPressFooter);
  refs.modalFooter.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
  if (refs.modalFooter.classList.contains('is-hidden')) {
    window.removeEventListener('keydown', onEscPressFooter);
  }
}

function onBackdropClickFooter(e) {
  if (e.currentTarget === e.target) {
    toggleModalFooter();
  }
}

function onEscPressFooter(e) {
  if (e.key === 'Escape') {
    toggleModalFooter();
  }
}

// function markupFooterModal(data) {
//   const markup = data.map(item => ``).join('');
//   console.log(markup);
//   refs.students.innerHTML = markup;
// }
