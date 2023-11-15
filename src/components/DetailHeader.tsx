import React from 'react';
import styled from '@emotion/styled';
import {constructImageUrl, getBrowserLanguage} from '../services/apiService';
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

const Image = styled.img`
  width: 20%;
  padding: 1%;
  border-radius: 30px;
  
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

    const { poster_path, original_title, overview, runtime, release_date, vote_average, genres } = details;

    const posterSrc = poster_path ? constructImageUrl(poster_path) : '';
    const formattedGenres = genres.map(genre => genre.name).join(', ');


    return (
        <DetailHeaderContainer>
            <Image  src={posterSrc} />
            <Section>
                <Title>{original_title}</Title>
                <Text>{overview}</Text>
                <Text>Runtime: {runtime} minutes</Text>
                <Text>Release Date: {formatDate(release_date, language)}</Text>
                <Text>Rating: {vote_average}</Text>
                <Text>Genres: {formattedGenres}</Text>
            </Section>
        </DetailHeaderContainer>
    );
};

export default DetailHeader;