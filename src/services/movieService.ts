import axios from "axios";
import type {Movie} from "../types/movie";

// Отримуємо токен та базовий URL із системних змінних
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

// Створюємо та конфігуруємо кастомний екземпляр axios
const tmdbInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    accept: "application/json",
  },
  params: {
    language: "en-US", // дефолтні параметри для всіх запитів
  },
});

interface TMDBResponse {
  results: Movie[];
}

// Функція пошуку фільмів за ключовим словом
export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await tmdbInstance.get<TMDBResponse>("/search/movie", {
    params: {
      query: query,
    },
  });
  return response.data.results;
}
