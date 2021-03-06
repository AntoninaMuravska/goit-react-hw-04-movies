import axios from 'axios';

class MovieAPI {
  constructor() {
    this.API_KEY = '16793a08fc468099c942dee45d510578';
    this.BASE_URL = 'https://api.themoviedb.org/3/';
  }

  async getPopular() {
    const response = await axios.get(
      `${this.BASE_URL}trending/movie/day?api_key=${this.API_KEY}`,
    );
    const movies = response.data.results;
    return movies;
  }

  async searchMovies(query) {
    const response = await axios.get(
      `${this.BASE_URL}search/movie?query=${query}&api_key=${this.API_KEY}&language=en-US&page=1&include_adult=false`,
    );
    const movies = response.data.results;
    return movies;
  }

  async movieDetails(id) {
    const response = await axios.get(
      `${this.BASE_URL}movie/${id}?api_key=${this.API_KEY}&language=en-US`,
    );
    const data = response.data;
    return data;
  }

  async movieReviews(id) {
    const response = await axios.get(
      `${this.BASE_URL}movie/${id}/reviews?api_key=${this.API_KEY}&language=en-US`,
    );
    const results = response.data.results;
    return results;
  }

  async movieCast(id) {
    const response = await axios.get(
      `${this.BASE_URL}movie/${id}/credits?api_key=${this.API_KEY}&language=en-US`,
    );
    const data = response.data;
    return data;
  }
}

const MoviesApi = new MovieAPI();

export default MoviesApi;
