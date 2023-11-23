import axios from 'axios';
import { useQuery, useInfiniteQuery } from 'react-query';
import { MovieSummary, MovieDetails } from './types';

const BASE_URL = 'http://172.20.10.2:8080';

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

export const useSearchMovies = (query: string) => {
    return useInfiniteQuery<MovieSummary[], Error>(
        ['searchMovies', query],
        ({ pageParam = 1 }) => searchMovies(query, pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.length > 0 ? allPages.length + 1 : undefined;
            },
        }
    );
};

export const useMovieDetails = (movieId: number) => {
    return useQuery<MovieDetails, Error>(
        ['movieDetails', movieId],
        () => getMovieDetails(movieId)
    );
};

export const useMoviesByCategory = (category: string) => {
    return useInfiniteQuery<MovieSummary[], Error>(
        ['moviesByCategory', category],
        ({ pageParam = 1 }) => getMoviesByCategory(category, pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.length > 0 ? allPages.length + 1 : undefined;
            },
        }
    );
};