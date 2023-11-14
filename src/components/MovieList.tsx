import { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled';
import MovieCard from './MovieCard';
import { MovieSummary } from '../services/types'; // Make sure to import your actual type definitions

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  background: #333;
  padding: 10px 0;
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  background: ${({ isActive }) => (isActive ? '#555' : 'transparent')};
  border: none;
  color: ${({ isActive }) => (isActive ? 'white' : '#aaa')};
  border-bottom: ${({ isActive }) => (isActive ? '2px solid white' : 'none')};

  &:hover {
    color: white;
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

interface MovieListProps {
    fetchMoviesByCategory: (category: string, page: number) => Promise<MovieSummary[]>;
}

const categories = ['popular', 'upcoming', 'top_rated', 'now_playing'];

const MovieList = ({ fetchMoviesByCategory }: MovieListProps) => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [movies, setMovies] = useState<MovieSummary[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadMovies = useCallback(async () => {
        const newMovies = await fetchMoviesByCategory(activeCategory, page);
        setHasMore(newMovies.length > 0);
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    }, [activeCategory, page, fetchMoviesByCategory]);

    useEffect(() => {
        loadMovies();
    }, [activeCategory, loadMovies]);

    const loadMoreMovies = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        loadMovies();
    }, [page]);

    return (
        <>
            <TabsContainer>
                {categories.map((category) => (
                    <Tab
                        key={category}
                        isActive={activeCategory === category}
                        onClick={() => {
                            setPage(1);
                            setMovies([]);
                            setActiveCategory(category);
                        }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Tab>
                ))}
            </TabsContainer>
            <InfiniteScroll
                dataLength={movies.length}
                next={loadMoreMovies}
                hasMore={hasMore}
                loader={<h4>Loading more movies...</h4>}
                endMessage={<p>No more movies to show</p>}
            >
                <MoviesGrid>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </MoviesGrid>
            </InfiniteScroll>
        </>
    );
};

export default MovieList;
