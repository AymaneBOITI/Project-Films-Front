import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #2c2c2c;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  padding: 10px;
  color: white;
  font-size: 16px;
  outline: none;
  &::placeholder {
    color: #ccc;
  }
`;

const Icon = styled.i`
  color: white;
  padding: 0 10px;
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
    };

    return (
        <SearchContainer>
            <Icon className="material-icons">search</Icon>
            <SearchInput
                type="text"
                placeholder="Search for movie"
                value={query}
                onChange={handleChange}
            />
        </SearchContainer>
    );
};

export default SearchBar;