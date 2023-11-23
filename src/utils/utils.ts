export interface Member {
    name: string;
    character?: string;
    job?: string; 
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
