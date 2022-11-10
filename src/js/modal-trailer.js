import { refs } from "./refs";
import { fetchModal } from "./api-servise";
import { renderMarkupModal } from "./modal-film";
import { spinnerOn, spinnerOff } from "./spinner";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
const BASE_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "fa9433e46ed4abfaeb75bcf31f473feb";
const trailerBtn = document.querySelector('.trailer-btn');

trailerBtn.addEventListener('click', onTrailerClick);

// async function fetchTrailer(currentId) {
//     const response = await fetch(
//       `${BASE_URL}${currentId}/videos?api_key=${API_KEY}&language=en-US`,
//     );
//     const data = await response.json();
//     return data.results;
//   }
  
//   async function onTrailerClick(evt) {
//     const currentFilm = document.querySelector('.js-item');
//     const currentId = Number(currentFilm.dataset.id);
//     console.log(currentId);
//     const data = await fetchTrailer(currentId);
//     renderMarkupTrailer(data);
//     toggleModal();
//   }
  
//   async function renderMarkupTrailer(data) {
//     const markup = data
//       .map(({ key }) => {
//         return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
//       })
//       .join('');
//     const instance = basicLightbox.create(markup);
//     instance.show();
//   }


async function fetchTrailer() {
    const currentFilm = document.querySelector('.js-item');
    const currentId = Number(currentFilm.dataset.id);
    const response = await fetch(`${BASE_URL}${currentId}/videos?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data.results;
    
    }

async function onTrailerClick(evt) {
    const data = await fetchTrailer();
    renderMarkupTrailer(data);
    toggleModal();
}

async function renderMarkupTrailer(data) {
    const markup = data.map(({ key }) => {
        return `<iframe class="trailer__iframe" width="700" height="500" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }).join('');
    const instance = basicLightbox.create(markup);
    instance.show();
}

function toggleModal() {
    refs.modalFilm.classList.toggle("is-hidden");
    refs.backdrop.classList.toggle("is-hidden");
}

export { onTrailerClick };