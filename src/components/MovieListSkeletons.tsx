import MovieCardSkeleton from './PageElements/MovieCardSkeleton.tsx';
import MovieSkeletonsContainer from "./Containers/MovieSkeletonsContainer.tsx";

const MovieListSkeletons = () => {
    return (
        <MovieSkeletonsContainer>
            {Array.from(Array(20).keys()).map((value) => (
                <MovieCardSkeleton key={value}/>
            ))}
        </MovieSkeletonsContainer>
    );
};

export default MovieListSkeletons;
