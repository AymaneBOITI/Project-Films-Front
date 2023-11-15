import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';

const SearchContainer = styled.div`
  @media screen and (max-width: 1150px) {
    min-width: 100%;
  }
`;

const SearchInput = styled.input`
  padding-left: 20px;
  adding-left: 1rem;
  border-radius: 9999px;
  @media screen and (max-width: 1150px) {
    min-width: 100%;
  }
  height: 35px;
  border: none;
`;

interface SearchBarProps {
    onSearch: (query: string, page: number) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const delayedQuery = useCallback(() => {
        onSearch(query, page);
    }, [query, page, onSearch]);

    useEffect(() => {
        const handler = setTimeout(delayedQuery, 2000);
        return () => {
            clearTimeout(handler);
        };
    }, [query, delayedQuery]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setPage(1); // Reset page number on new search
        console.log("test");
    };

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                placeholder="🔎 Search for movie"
                value={query}
                onChange={handleChange}
            />
        </SearchContainer>
    );
};

export default SearchBar;