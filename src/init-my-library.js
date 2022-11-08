import './js/modal-film';
import './js/day-night-theme';

const btnQueue = document.querySelector('.queue');
const btnWatched = document.querySelector('.watched');

btnQueue.classList.add('btn-is-active');

btnWatched.addEventListener('click', onbtnWatchedClick)
btnQueue.addEventListener('click', onbtnQueueClick)

function onbtnWatchedClick () {
    btnWatched.classList.add('btn-is-active');
    btnQueue.classList.remove('btn-is-active');
  }

function onbtnQueueClick () {
    btnQueue.classList.add('btn-is-active');
    btnWatched.classList.remove('btn-is-active');
  }