const BASE_URL = 'https://api.themoviedb.org/3/trending/';
const endpoint = 'movie/day';
const API_KEY = 'a4b64e934bd6b381798223a1d6191ff5';

export async function fetchTrending(pageNum) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    page: pageNum,
  });
  try {
    const response = await fetch(`${BASE_URL}${endpoint}?${params}`);
    if (!response.ok) throw new Error(response.status);
    return response.json();
  } catch (err) {
    console.log(err);
  }
}
