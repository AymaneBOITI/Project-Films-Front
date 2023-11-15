import React from 'react';
import styled from '@emotion/styled';
import { getBrowserLanguage } from '../services/apiService';
import { MovieDetails as MovieDetailsType } from '../services/types';

const Section = styled.section`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
`;

const Text = styled.p`
  color: #333;
`;

const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const GenreTag = styled.span`
  background-color: #efefef;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  color: #333;
`;

const formatDate = (dateString: string, language: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, options).format(date);
};

const DetailHeader: React.FC<{ details: MovieDetailsType }> = ({ details }) => {
    const language = getBrowserLanguage();

    // Destructure details for cleaner code
    const { crew, poster_path, original_title, overview, runtime, release_date, vote_average, genres } = details;

    // Use optional chaining to simplify conditional access
    const crewName = crew?.[0]?.name || 'Unknown Crew';
    const posterSrc = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '';

    return (
        <>
            <img alt={crewName} src={posterSrc} />
            <Section>
                <Title>{original_title}</Title>
                <Text>{overview}</Text>
                <Text>Runtime: {runtime} minutes</Text>
                <Text>Release Date: {formatDate(release_date, language)}</Text>
                <Text>Rating: {vote_average}</Text>
                <GenreContainer>
                    {genres.map(genre => (
                        <GenreTag key={genre.id}>{genre.name}</GenreTag>
                    ))}
                </GenreContainer>
            </Section>
        </>
    );
};

export default DetailHeader;