const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'a4b64e934bd6b381798223a1d6191ff5';

export async function fetchModal(movie_id) {
  try {
    const response = await fetch(`${BASE_URL}${movie_id}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error(response.status);
    return response.json();
  } catch (err) {
    console.log(err);
  }
}
