import { refs } from './refs';

import Splide from '@splidejs/splide';

const splide = new Splide('.splide', {
  type: 'loop',
  padding: '6rem',
  perPage: 6,
  autoplay: true,
  breakpoints: {
    1280: {
      perPage: 3,
    },
    768: {
      perPage: 2,
      padding: '3rem',
    },
    480: {
      perPage: 1,
      padding: '5rem',
    },
    370: {
      padding: '3rem',
    },
  },
});

function renderSlider() {
  const BASE_URL = 'https://api.themoviedb.org/3/trending/';
  const endpoint = 'movie/day';
  const API_KEY = '90a449e7773f96eeaad80a5e660b8095';
  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  const response = fetch(`${BASE_URL}${endpoint}?${params}`);
  response
    .then(resp => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .then(data => {
      const markup = createMarkup(data.results);
      refs.slider.insertAdjacentHTML('beforeend', markup);
      splide.mount();
    })
    .catch(err => console.log(err));
}

renderSlider();

function createMarkup(arr) {
  return arr
    .map(
      item => `<li class="splide__slide js-item" data-id='${item.id}'>
  <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" 
  alt="${item.title}"
  onerror="this.onerror=null;this.src='./images/keep-calm-poster-not-found.webp';" 
  height="228"
  width="152">

</li>`
    )
    .join('');
}
