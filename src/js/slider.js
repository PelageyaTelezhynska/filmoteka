import { refs } from './refs';

import Splide from '@splidejs/splide';

const splide = new Splide('.splide', {
  type: 'loop',
  padding: '5rem',
  perPage: 6,
  autoplay: true,
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
      items => `<li class="splide__slide js-item" data-id='${items.id}>
    <img src="https://image.tmdb.org/t/p/w500${items.poster_path}"
    alt="${items.title}"
    height="228" 
    width="152"
    >
    </img>
    </li>`
    )
    .join('');
}
