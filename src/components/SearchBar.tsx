import React, { useState } from 'react';
import { useDebounce } from 'react-use';
import SearchInput, { ClearButton ,SearchInputContainer } from "./PageElements/SearchInput";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onClear: () => void;
}

const SearchBar = ({ onSearch, onClear }: SearchBarProps) => {
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

    const handleClear = () => {
        setQuery('');
        onClear(); 
    };

    return (
        <SearchInputContainer>
            <SearchInput
                type="text"
                placeholder="🔎 Search for movie"
                value={query}
                onChange={handleChange}
            />
            {query && <ClearButton onClick={handleClear}>X</ClearButton>}
        </SearchInputContainer>
    );
};

export default SearchBar;
