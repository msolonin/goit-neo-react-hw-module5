import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const HEADERS = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjdkZWZlYTIxN2QyODFiMTEwMjQ0YjdiMWNjNjRkNSIsIm5iZiI6MTcyODIxMzQwMC4xODQ2MzksInN1YiI6IjY3MDI2Zjc0ZTQ4MDE0OTE0Njg1OTMzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WpFDZIJ5pCmwVsAJZqG9d1IYTJayWOBg1XphMdeBB10'
};

const DEFAULT_PARAMS = {
  language: 'en-US'
};
export const BASE_IMG_PATH = 'https://image.tmdb.org/t/p/w500';


export const getTrendingMovies  = async () => {
    const { data } = await axios.get('/trending/movie/day', {
      params: {
        language: 'en-US'
      },
      headers: HEADERS
    });
    return data;
};

export const searchMovie = async (query) => {
    const { data } = await axios.get('/search/movie', {
      params: {
        language: 'en-US',
        query,
        include_adult: false,
        page: 1,
      },
      headers: HEADERS
    });
    return data;
}

// /movie/10

export const getMovieDetails = async (id) => {
    const { data } = await axios.get(`/movie/${id}`, {
      params: DEFAULT_PARAMS,
      headers: HEADERS
    });
    return data;
}

export const getMovieCredits = async (id) => {
    const { data } = await axios.get(`/movie/${id}/credits`, {
      params: DEFAULT_PARAMS,
      headers: HEADERS
    });
    return data;
}

export const getMovieReviews = async (id) => {
    const { data } = await axios.get(`/movie/${id}/reviews`, {
      params: DEFAULT_PARAMS,
      headers: HEADERS
    });
    return data;
}
