export interface MovieSummary {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
}

export interface MovieDetails {
    id: number;
    genres: { id: number; name: string }[];
    overview: string;
    runtime: number;
    cast: { name: string; character: string; profile_path: string }[];
    crew: { name: string; job: string; profile_path: string }[];
    trailerKey?: string;
    imagePaths: string[];
    original_title: string;
    backdrop_path?: string;
    original_language: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}
