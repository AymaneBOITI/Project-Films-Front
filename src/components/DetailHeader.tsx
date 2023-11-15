import React from 'react';
import styled from '@emotion/styled';
import { getBrowserLanguage } from '../services/apiService';
import { MovieDetails as MovieDetailsType } from '../services/types';

const Section = styled.section`
  padding: 1%;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  
`;

const Title = styled.h2`
  margin: 0px;
`;

const Text = styled.p`
  margin: 0px;
`;

const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  margin-top: 2%;
`;

const GenreTag = styled.span`
  background-color: #323744!important;;
  padding: 1% 2%;
  
  border-radius: 10px;
  
  color: White;
`;

const Image = styled.img`
  width: 20%;
 padding: 1%;
  border-radius: 50px;
  
`;
const formatDate = (dateString: string, language: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, options).format(date);
};

const DetailHeaderContainer = styled.div`
    display: flex;
`;
const DetailHeader: React.FC<{ details: MovieDetailsType }> = ({ details }) => {
    const language = getBrowserLanguage();

    // Destructure details for cleaner code
    const { crew, poster_path, original_title, overview, runtime, release_date, vote_average, genres } = details;

    // Use optional chaining to simplify conditional access
    const crewName = crew?.[0]?.name || 'Unknown Crew';
    const posterSrc = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '';

    return (
        <DetailHeaderContainer>
            <Image alt={crewName} src={posterSrc} />
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
        </DetailHeaderContainer>
    );
};

export default DetailHeader;