let watchedList = [];
let queueList = [];

const WATCHED = 'Watched';
const QUEUE = 'Queue';

export function addToLocale(data) {
  const refs = {
    watched: document.querySelector('.btn-watched'),
    queue: document.querySelector('.btn-queue'),
  };

  refs.watched.addEventListener('click', addToWatched);
  refs.queue.addEventListener('click', addToQueue);

  function addToWatched() {
    watchedList.push(data);

    localStorage.setItem(WATCHED, JSON.stringify(watchedList));

    refs.watched.removeEventListener('click', addToWatched);
  }

  function addToQueue() {
    queueList.push(data);

    localStorage.setItem(QUEUE, JSON.stringify(queueList));

    refs.queue.removeEventListener('click', addToQueue);
  }
}
