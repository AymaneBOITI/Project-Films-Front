import React, {useCallback, useEffect, useState} from 'react';
import SearchInput from "./SearchInput.tsx";

interface SearchBarProps {
    onSearch: (query: string, page: number) => void;
}

export const SearchBar = ({onSearch}: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const delayedQuery = useCallback(() => {
        onSearch(query, page);
    }, [query, page, onSearch]);

    useEffect(() => {
        const handler = setTimeout(delayedQuery, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [query, delayedQuery]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setPage(1);
    };

    return (
        <>
            <SearchInput
                type="text"
                placeholder="🔎 Search for movie"
                value={query}
                onChange={handleChange}
            />
        </>
    );
};

export default SearchBar;