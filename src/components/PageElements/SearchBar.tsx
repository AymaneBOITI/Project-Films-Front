import React, { useState } from 'react';
import { useDebounce } from 'react-use';
import SearchInput from "./SearchInput";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState<string>('');

    useDebounce(
        () => {
            if (query) {
                onSearch(query);
            }
        },
        1000,
        [query]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleClick = () => {
        if (query) {
            onSearch(query);
        }
    };

    return (
        <SearchInput
            type="text"
            placeholder="🔎 Search for movie"
            value={query}
            onChange={handleChange}
            onClick={handleClick}
        />
    );
};

export default SearchBar;
