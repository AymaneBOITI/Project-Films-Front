export interface MovieSummary {
    id: number;
    title: string;
    posterPath?: string;
    releaseDate: string;
    voteAverage: number;
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
    backdrop_path: string;
    cast: CastMember[];
    crew: CrewMember[];
    genres: Genre[];
    id: number;
    imagePaths?: string[];
    original_language: string;
    original_title: string;
    overview: string;
    poster_path?: string;
    release_date: string;
    runtime: number;
    trailerKey?: string;
    vote_average: number;
}
