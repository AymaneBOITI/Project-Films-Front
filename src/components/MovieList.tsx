import { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled';
import MovieCard from './MovieCard';
import {MovieDetails, MovieSummary} from '../services/types';
import SearchResult from "./SearchResult.tsx"; // Make sure to import your actual type definitions

const SearchResultContainer = styled.div `
  display: flex;
  justify-content: center;
  width: 100%;
`;
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

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 2rem;
`;

const SearchInput = styled.input`
  padding-left: 20px;
  border-radius: 9999px;
  @media screen and (max-width: 1150px) {
    min-width: 100%;
  }
  height: 35px;
  border: none;
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
    const [id, setId] = useState('');
    const [data, setData] = useState<MovieDetails>();

    const loadMovies = useCallback(async () => {
        const newMovies = await fetchMoviesByCategory(activeCategory, page);
        setHasMore(newMovies.length > 0);
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    }, [activeCategory, page, fetchMoviesByCategory]);

    useEffect(() => {
        loadMovies().then(() => {});
    }, [activeCategory, loadMovies]);

    const loadMoreMovies = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        loadMovies().then(() => {});
    }, [page]);

   useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/movies/details/${id}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                /*setData(null);*/
            }
        };
        fetchData().then(() => {});
    }, [id]); // Le useEffect s'exécute chaque fois que l'ID change

    const handleIdChange = (event: any) => {
        setId(event.target.value);
    };

    return (
        <>
            <TabsContainer>
                <Title>🎬🍿 Movie library</Title>

                {categories.map((category) => (
                    <Tab
                        key={category}
                        isActive={activeCategory === category}
                        onClick={() => {
                            setId("");
                            setPage(1);
                            setMovies([]);
                            setActiveCategory(category);
                        }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Tab>
                ))}
                <SearchInput type="text"
                       placeholder="🔎 Search for movie"
                       value={id}
                       onChange={handleIdChange}/>
            </TabsContainer>

            {id == "" ? (
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
                ) : (
                    <>
                {data && data.status != 500 ? (
                    <SearchResultContainer>
                        <SearchResult key={id} movie={data} />
                    </SearchResultContainer>

                ) : (
                    <SearchResultContainer>
                        <p>No Movie with this id !</p>
                    </SearchResultContainer>
                )}

                    </>
            )}
        </>
    );
};

export default MovieList;
