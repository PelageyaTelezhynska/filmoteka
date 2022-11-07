const BASE_URL = 'https://api.themoviedb.org/3/';
const endpoint = 'genre/movie/list';
const API_KEY = '90a449e7773f96eeaad80a5e660b8095';
const options = '&language=en-US';

export async function fetchGenres() {
  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}?api_key=${API_KEY}${options}`
    );
    if (!response.ok) throw new Error(response.status);
    return response.json();
  } catch (err) {
    console.log(err);
  }
}
