import axios from 'axios';
import { MovieSummary, MovieDetails } from './types'; // Replace with the actual path to your types

const BASE_URL = 'http://localhost:8080';

export const constructImageUrl = (path?: string): string => {
    return `https://image.tmdb.org/t/p/original/${path}`;
};

export const constructYoutubeUrl = (key: string): string => {
    return `https://www.youtube.com/embed/${key}`;
};

export const getBrowserLanguage = (): string => {
    const language = navigator.language;
    return language.startsWith('fr') ? 'fr-FR' : 'en-US';
};

export const searchMovies = async (query: string, page: number): Promise<MovieSummary[]> => {
    const language = getBrowserLanguage();
    const response = await axios.get(`${BASE_URL}/movies/search`, {
        params: { query, language, page },
    });
    return response.data;
};

export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
    const language = getBrowserLanguage();
    const response = await axios.get(`${BASE_URL}/movies/details/${movieId}`, {
        params: { language },
    });
    return response.data;
};

export const getMoviesByCategory = async (category: string, page: number): Promise<MovieSummary[]> => {
    const language = getBrowserLanguage();
    const response = await axios.get(`${BASE_URL}/movies/category/${category}`, {
        params: { language, page },
    });
    return response.data;
};
