import { addToLocale } from './localeStorage-watch&queue';

export function renderMarkupModal(data) {
  const markup = ` <img class='modal-poster'
   src='https://image.tmdb.org/t/p/w500${data.poster_path}' alt=${
    data.title
  } width='240'/>
  <div>
    <div>
      <h2 class='modal-movie-title'>${data.title}</h2>

      <div class='wrap-flex'>
        <div class="labels-wrap">
          <p class='movie-label'>Vote / Votes</p>
          <p class='movie-label'>Popularity</p>
          <p class='movie-label'>Original Title</p>
          <p class='movie-label'>Genre</p>
        </div>
        <div class='wrap-movie-disc'>
          <p class='movie-disc disc-wrap'>
            <span class='accent-detail'>
             ${data.vote_average.toFixed(1)}</span>
             <span class='movie-label disc-space'> / </span>${data.vote_count}
          </p>
          <p class='movie-disc'>${data.popularity.toFixed(1)}</p>
          <p class='movie-disc movie-disc-title'>${data.original_title}</p>
          <p class='movie-disc movie-disc-genres'>${data.genres
            .map(genre => genre.name)
            .join(', ')}</p>
        </div>
      </div>

      <h3 class='disc-title'>About</h3>
      <p class='disc-text'>${data.overview}</p>
    </div>
    <div class='button-container'>
      <button type='button' class='modal-btn btn-watched'>add to watched</button>
      <button type='button' class='modal-btn btn-queue'>
        add to queue
      </button>
    </div>
    <button type='button' class="modal__button-play trailer-button trailer-btn">
    <img class="modal__img-play" src="https://www.freepnglogos.com/uploads/play-button-png/play-button-file-youtube-play-buttom-icon-svg-wikimedia-commons-27.png" alt="play trailer" width="50px" height="50px" />
    </button>
  </div>`;
  document.querySelector('.wrap-disc').innerHTML = markup;

  addToLocale(data);
}
