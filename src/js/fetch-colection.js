import axios from 'axios';

const API_KEY = 'a4b64e934bd6b381798223a1d6191ff5';
const BASE_URL = 'https://api.themoviedb.org/';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this._page = 1;
  }

  async fetchMovies(pageNum) {
    // if (!this.searchQuery.length)
    //   return Promise.reject('Enter data to search.');
    this._page = pageNum;

    const response = await axios.get(
      `${BASE_URL}3/search/movie?api_key=${API_KEY}&query=${this.searchQuery}&page=${this._page}`
    );
    if (!response.data.results.length)
      return Promise.reject(
        'Search result not successful. Enter the correct movie name .'
      );

    return response.data;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get page() {
    return this._page;
  }
  set page(newPage) {
    this._page = newPage;
  }
}
