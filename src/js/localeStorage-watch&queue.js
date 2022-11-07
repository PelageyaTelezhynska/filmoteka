const WATCHED = 'Watched';
const QUEUE = 'Queue';

export function addToLocale(data) {
  const filmObject = JSON.stringify(data);

  const refs = {
    watched: document.querySelector('.btn-watched'),
    queue: document.querySelector('.btn-queue'),
  };

  refs.watched.addEventListener('click', addToWatched);
  refs.queue.addEventListener('click', addToQueue);

  try {
    if (localStorage.getItem(WATCHED).includes(filmObject)) {
      refs.watched.classList.add('active-btn');
      refs.watched.textContent = 'REMOVE FROM WATCHED';
    }
  } catch (error) {}

  try {
    if (localStorage.getItem(QUEUE).includes(filmObject)) {
      refs.queue.classList.add('active-btn');
      refs.queue.textContent = 'REMOVE FROM QUEUE';
    }
  } catch (error) {}

  function addToWatched() {
    let watchedList = JSON.parse(localStorage.getItem(WATCHED)) || [];

    if (watchedList.find(el => el.id === data.id)) {
      refs.watched.classList.remove('active-btn');
      refs.watched.textContent = 'ADD TO WATCHED';

      watchedList = watchedList.filter(e => e.id !== data.id);
    } else {
      refs.watched.classList.add('active-btn');
      refs.watched.textContent = 'REMOVE FROM WATCHED';

      watchedList.push(data);
    }
    localStorage.setItem(WATCHED, JSON.stringify(watchedList));

    // refs.watched.removeEventListener('click', addToWatched);
  }

  function addToQueue() {
    let queueList = JSON.parse(localStorage.getItem(QUEUE)) || [];

    if (queueList.find(el => el.id === data.id)) {
      refs.queue.classList.remove('active-btn');
      refs.queue.textContent = 'ADD TO QUEUE';

      queueList = queueList.filter(e => e.id !== data.id);
    } else {
      refs.queue.classList.add('active-btn');
      refs.queue.textContent = 'REMOVE FROM QUEUE';

      queueList.push(data);
    }
    localStorage.setItem(QUEUE, JSON.stringify(queueList));

    // refs.queue.removeEventListener('click', addToQueue);
  }
}
