import { addToLocale } from './localeStorage-watch&queue';
import defaultImg from '../images/keep-calm-poster-not-found.webp';

export function renderMarkupModal(data) {
  const markup = ` <img class='modal-poster'
   src="${
     data.poster_path
       ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
       : defaultImg
   }"
    alt=${data.title}
   
    width='240'/>
  <div>
    <div>
      <h2 class='modal-movie-title'>${data.title}</h2>

      <div class='wrap-flex'>
           <p class='movie-label'>Vote / Votes</p>
           <p class='movie-disc disc-wrap'>
            <span class='accent-detail'>
             ${data.vote_average.toFixed(1)}</span>
             <span class='disc-space'> / </span>${data.vote_count}
          </p>
      </div>
      <div class='wrap-flex'>
          <p class='movie-label'>Popularity</p>
           <p class='movie-disc'>${data.popularity.toFixed(1)}</p>
      </div>
      <div class='wrap-flex'>
          <p class='movie-label'>Original Title</p>
          <p class='movie-disc movie-disc-title'>${data.original_title}</p>
      </div>
      <div class='wrap-flex'>
         <p class='movie-label'>Genre</p>
         <p class='movie-disc movie-disc-genres'>${data.genres
           .map(genre => genre.name)
           .join(', ')}</p>
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
    </div>
  </div>`;
  document.querySelector('.wrap-disc').innerHTML = markup;
  document
    .querySelector('.backdrop')
    .setAttribute(
      'style',
      `background-image: url("https://image.tmdb.org/t/p/original/${data.backdrop_path}"); background-position: center; background-size: cover;`
    );

  addToLocale(data);
}
