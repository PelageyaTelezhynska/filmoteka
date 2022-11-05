const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'fa9433e46ed4abfaeb75bcf31f473feb';

export async function fetchModal(movie_id) {
  try {
    const response = await fetch(`${BASE_URL}${movie_id}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error(response.status);
    return response.json();
  } catch (err) {
    console.log(err);
  }
}
