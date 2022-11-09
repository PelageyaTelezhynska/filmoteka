const BASE_URL = 'https://api.themoviedb.org/3/';
const endpoint = 'genre/movie/list';
const API_KEY = 'a4b64e934bd6b381798223a1d6191ff5';
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
