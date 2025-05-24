
const API_KEY = 'db75be3f6da59e6c54d0b9f568d19d16';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMoviesBySection = async (section: string, page: number = 1) => {
  const response = await fetch(`${BASE_URL}/movie/${section}?api_key=${API_KEY}&page=${page}`);
  return response.json();
};

export const fetchMovieDetails = async (id: string) => {
  // Add append_to_response to get credits and other useful data in one request
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,images,keywords`
  );
  return response.json();
};

export const fetchMovieReviews = async (id: string) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
  return response.json();
};

export const fetchSimilarMovies = async (id: string) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  return response.json();
};

export const searchMovies = async (query: string) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  return response.json();
};
