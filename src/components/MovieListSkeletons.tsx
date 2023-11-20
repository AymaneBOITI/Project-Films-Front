/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MovieCardSkeleton from './MovieCardSkeleton';

const movieSkeletonsContainer = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 2rem;
`;

const MovieListSkeletons = () => {
    return (
        <div id="1" css={movieSkeletonsContainer}>
            {Array.from(Array(20).keys()).map((value) => (
                <MovieCardSkeleton key={value} />
            ))}
        </div>
    );
};

export default MovieListSkeletons;
