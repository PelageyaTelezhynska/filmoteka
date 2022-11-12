import { refs } from './refs';

refs.openModalAuthBtn.addEventListener('click', toggleModal);
refs.closeModalAuthBtn.addEventListener('click', toggleModal);

function toggleModal() {
  window.addEventListener('keydown', onEscPress);
  refs.modal.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
  if (refs.modal.classList.contains('is-hidden')) {
    window.removeEventListener('keydown', onEscPress);
  }
}
function onEscPress(evt) {
  if (evt.key === 'Escape') {
    toggleModal();
  }
}
// toggle auth modals
refs.authSwitchLinks.forEach(link => {
  link.addEventListener('click', () => {
    refs.authModals.forEach(modal => modal.classList.toggle('is-hidden'));
  });
});
