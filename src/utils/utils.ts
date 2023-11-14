export const constructImageUrl = (path: string): string => {
    return `https://image.tmdb.org/t/p/original/${path}`;
};

export const constructYoutubeUrl = (key: string): string => {
    return `https://www.youtube.com/watch?v=${key}`;
};

export const getBrowserLanguage = (): string => {
    const language = navigator.language;
    return language.startsWith('fr') ? 'fr-FR' : 'en-US';
};

export const prefersDarkMode = (): boolean => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const toggleBodyClass = (className: string, force: boolean): void => {
    document.body.classList.toggle(className, force);
};

export interface Member {
    name: string;
    character?: string; // Optional for crew members
    job?: string; // Optional for cast members
    profile_path?: string;
}
export interface Genre {
    id: number;
    name: string;
}

export interface CastMember {
    name: string;
    character: string;
    profile_path?: string;
}

export interface CrewMember {
    name: string;
    job: string;
    profile_path?: string;
}

export interface MovieDetails {
    id: number;
    genres: Genre[];
    overview: string;
    runtime: number;
    cast: CastMember[];
    crew: CrewMember[];
    trailerKey?: string;
    imagePaths: string[];
    original_title: string;
    backdrop_path?: string;
    original_language: string;
    poster_path?: string;
    release_date: string;
    vote_average: number;
}
