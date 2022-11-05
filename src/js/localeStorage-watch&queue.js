let watchedList = [];
let queueList = [];

export function addToLocale(data) {
  const refs = {
    watched: document.querySelector('.btn-watched'),
    queue: document.querySelector('.btn-queue'),
  };

  const WATCHED = 'Watched';
  const QUEUE = 'Queue';

  refs.watched.addEventListener('click', addToWatched);
  refs.queue.addEventListener('click', addToQueue);

  function addToWatched() {
    watchedList.push(data);

    localStorage.setItem(WATCHED, JSON.stringify(watchedList));
  }

  function addToQueue() {
    queueList.push(data);

    localStorage.setItem(QUEUE, JSON.stringify(queueList));
  }
}
