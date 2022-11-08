import { refs } from './refs';

refs.footerBtn.addEventListener('click', openModalFooter);
refs.closeModalBtn.addEventListener('click', toggleModalFooter);
refs.backdrop.addEventListener('click', onBackdropClickFooter);

function toggleModalFooter() {
  window.addEventListener('keydown', onEscPressFooter);
  refs.modalFooter.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
  if (refs.modalFooter.classList.contains('is-hidden')) {
    window.removeEventListener('keydown', onEscPressFooter);
  }
}

function openModalFooter(evt) {
  //   if (evt.currentTarget === evt.target) {
  //     return;
  //   }

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

function onBackdropClickFooter(evt) {
  if (evt.currentTarget === evt.target) {
    toggleModalFooter();
  }
}

function onEscPressFooter(evt) {
  if (evt.key === 'Escape') {
    toggleModalFooter();
  }
}
