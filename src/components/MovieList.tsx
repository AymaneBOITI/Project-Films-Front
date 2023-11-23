import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from './MovieCard';
import { MovieSummary } from '../services/types';
import {getBrowserLanguage, useMoviesByCategory, useSearchMovies} from "../services/apiService";
import SearchBar from "./SearchBar.tsx";
import MovieListSkeletons from "./MovieListSkeletons";
import TabsContainer from "./Containers/TabsContainer";
import Title from "./PageElements/Title";
import Tab from "./PageElements/Tab";
import MoviesGrid from "./Containers/MoviesGrid";

const categories = ['popular', 'upcoming', 'top_rated', 'now_playing'];

const MovieList = () => {
    const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const moviesQuery = useMoviesByCategory(activeCategory);
    const searchQueryResults = useSearchMovies(searchQuery);

    const isSearchActive = activeCategory === 'search' && searchQuery;
    const queryResults = isSearchActive ? searchQueryResults : moviesQuery;
    const movies = queryResults.data?.pages.flat();

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setActiveCategory(query ? 'search' : 'popular');
    };

    const handleClearSearch = () => {
        setActiveCategory('popular');
    };

    const language = getBrowserLanguage();
    const noMoviesMessage = language.startsWith('fr') ? 'Film non trouvé !' : 'Film not found!';
    const showNoMoviesMessage = isSearchActive && movies?.length === 0;

    return (
        <>
            <TabsContainer>
                <Title>🎬🍿 Movie library</Title>
                {categories.map((category) => (
                    <Tab
                        key={category}
                        isActive={activeCategory === category}
                        onClick={() => {
                            setActiveCategory(category);
                            if (category !== 'search') {
                                setSearchQuery('');
                            }
                        }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ')}
                    </Tab>
                ))}
                <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
            </TabsContainer>
            <InfiniteScroll
                dataLength={movies?.length || 0}
                next={() => queryResults.fetchNextPage()}
                hasMore={!!queryResults.hasNextPage}
                loader={<MovieListSkeletons/>}
            >
                <MoviesGrid>
                    {movies?.length ? (
                        movies.map((movie: MovieSummary) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))
                    ) : null}
                    {showNoMoviesMessage && (
                        <p style={{ textAlign: 'center' }}>{noMoviesMessage}</p>
                    )}
                </MoviesGrid>
            </InfiniteScroll>
        </>
    );
};

export default MovieList;