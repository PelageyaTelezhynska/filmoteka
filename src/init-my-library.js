import { myLibPagination } from './js/my-library-render-storage';
import { myLibRender } from './js/my-library-render-storage';
import './js/modal-film';
import './js/day-night-theme';

const btnQueue = document.querySelector('.queue');
const btnWatched = document.querySelector('.watched');

btnQueue.classList.add('btn-is-active');
myLibPagination('Queue');
myLibRender(1, 'Queue');

btnWatched.addEventListener('click', onbtnWatchedClick)
btnQueue.addEventListener('click', onbtnQueueClick)

function onbtnWatchedClick () {
    btnWatched.classList.add('btn-is-active');
    btnQueue.classList.remove('btn-is-active');
    myLibPagination('Watched');
    myLibRender(1, 'Watched');
  }

function onbtnQueueClick () {
    btnQueue.classList.add('btn-is-active');
    btnWatched.classList.remove('btn-is-active');
    myLibPagination('Queue');
    myLibRender(1, 'Queue');
  }