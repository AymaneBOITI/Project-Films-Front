import { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled';
import MovieCard from './MovieCard';
import { MovieSummary } from '../services/types'; // Make sure to import your actual type definitions

const TabsContainer = styled.div`
  /*background: #333;*/
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  margin: 2%;

  @media screen and (max-width: 950px) {
    display: grid;
    justify-content: center;
  }
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

  @media screen and (max-width: 950px) {
      display: none;
  }
`;

const Title = styled.h1`
    padding: 0px;
    margin: 0px;
    font-size: 2rem;
    @media (min-width: 640px) {
      font-size: 2rem;
    }
  `;
    const Input = styled.input`
    padding-left: 1rem;
    border-radius: 9999px;
    @media screen and (max-width: 1150px) {
      min-width: 100%;
    } 
    height: 35px;
    border: none;
  `;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 2rem;
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
                <Title>🎬🍿 Movie library</Title>

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
                <Input  type="text" placeholder="🔎 Search for movie" />
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
