import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const SearchContainer = styled.div`

`;

const SearchInput = styled.input`
  padding-left: 1rem;
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
    const [page] = useState(1); // Page is not changed here, so we don't need to use setPage

    useEffect(() => {
        const handler = setTimeout(() => {
            if (query.trim()) {
                onSearch(query, page);
            }
        }, 2000);

        return () => {
            clearTimeout(handler);
        };
    }, [query, page, onSearch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
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