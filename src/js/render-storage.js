const divQueue = document.querySelector('.movies__list');
const btnQueue = document.querySelector('.queue');
const btnWatched = document.querySelector('.watched');
btnQueue.addEventListener('click', onbtnQueue);
btnWatched.addEventListener('click', onbtnWatched);

onbtnQueue();

function onbtnQueue(e, page = 1) {
  const data = JSON.parse(localStorage.getItem('Queue')).slice(page*18-18, page*18);
  divQueue.innerHTML = '';
  divQueue.insertAdjacentHTML('beforeend', renderMarkupStorage(data));
}

function onbtnWatched(e, page = 1) {
  const data = JSON.parse(localStorage.getItem('Watched')).slice(page*18-18, page*18);;
  divQueue.innerHTML = '';
  divQueue.insertAdjacentHTML('beforeend', renderMarkupStorage(data));
}

function renderMarkupStorage(data) {
  return data
    .map(({ id, poster_path, title, genres, release_date, vote_average }) => {
      return `<div class='movie-card js-item' data-id='${id}'>
  <img
    class='movie-poster'
    src='https://image.tmdb.org/t/p/w500${poster_path}'
    alt='${title}'
    onerror="this.onerror=null;this.src='https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found.jpg';"
    loading='lazy'
  />
  <div class='info'>
    <h2 class='movie-title'>
    ${title}
    </h2>
    <p class='movie-info'>
    ${
      genres.length > 3
        ? genres
            .slice(0, 2)
            .concat([{ name: 'Other' }])
            .map(genre => genre.name)
            .join(', ')
        : genres.map(genre => genre.name).join(', ')
    }
      | ${release_date.slice(0, 4)}
      <span class='vote'> ${vote_average.toFixed(1)} </span>
    </p>
  </div>
</div>`;
    })
    .join('');
}
