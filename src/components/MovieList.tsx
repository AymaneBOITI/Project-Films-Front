import {useCallback, useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from './MovieCard';
import {MovieSummary} from '../services/types';
import {searchMovies} from "../services/apiService.ts";
import SearchBar from "./PageElements/SearchBar.tsx";
import MovieListSkeletons from "./MovieListSkeletons.tsx";
import TabsContainer from "./Containers/TabsContainer.tsx";
import Title from "./PageElements/Title.tsx";
import Tab from "./PageElements/Tab.tsx";
import MoviesGrid from "./Containers/MoviesGrid.tsx";

interface MovieListProps {
    fetchMoviesByCategory: (category: string, page: number) => Promise<MovieSummary[]>;
}

const categories = ['popular', 'upcoming', 'top_rated', 'now_playing'];

const MovieList = ({fetchMoviesByCategory}: MovieListProps) => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [movies, setMovies] = useState<MovieSummary[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const loadMovies = useCallback(async () => {
        const newMovies = await fetchMoviesByCategory(activeCategory, page);
        setHasMore(newMovies.length > 0);
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    }, [activeCategory, page, fetchMoviesByCategory]);
    useEffect(() => {
        const load = async () => {
            let newMovies: any[] = [];
            if (activeCategory === 'search') {
                newMovies = await searchMovies(searchQuery, page);
            } else {
                newMovies = await fetchMoviesByCategory(activeCategory, page);
            }
            setHasMore(newMovies.length > 0);
            setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        };

        load();
    }, [activeCategory, page, searchQuery]);

    useEffect(() => {
        loadMovies();
    }, [activeCategory, loadMovies]);

    const loadMoreMovies = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        loadMovies();
    }, [page]);

    const handleSearch = (query: string) => {
        if (query !== searchQuery) {
            setSearchQuery(query);
            setMovies([]);
            setPage(1);
            setActiveCategory('search');
        }
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
                            setPage(1);
                            setMovies([]);
                            setActiveCategory(category);
                        }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ')}
                    </Tab>
                ))}
                <SearchBar onSearch={handleSearch}/>
            </TabsContainer>
            <InfiniteScroll
                dataLength={movies.length}
                next={loadMoreMovies}
                hasMore={hasMore}
                loader={<MovieListSkeletons/>}
                endMessage={<p>No more movies to show</p>}
            >
                <MoviesGrid>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </MoviesGrid>
            </InfiniteScroll>
        </>
    );
};

export default MovieList;
