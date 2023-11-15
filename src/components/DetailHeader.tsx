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
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RatingCircle = styled.svg`
  margin-left: 10px; 
`;

const RatingText = styled.text`
  fill: white;
  font-size: 12px;
  font-weight: bold;
`;

const DetailHeader: React.FC<{ details: MovieDetailsType }> = ({ details }) => {
    const language = getBrowserLanguage();
    const { poster_path, original_title, overview, runtime, release_date, vote_average, genres } = details;
    const posterSrc = poster_path ? constructImageUrl(poster_path) : '';
    const formattedGenres = genres.map(genre => genre.name).join(', ');
    const rating = vote_average * 10;
    const circumference = 2 * Math.PI * 15.9155;
    const strokeDashoffset = circumference - (rating / 100) * circumference;

    return (
        <DetailHeaderContainer>
            <Image src={posterSrc} alt="Movie Poster" />
            <Section>
                <TitleContainer>
                    <Title>{original_title}</Title>
                    <RatingCircle width="42" height="42">
                        <circle cx="21" cy="21" r="15.9155" fill="rgb(24, 31, 41)" />
                        <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#21d07a" strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
                        <RatingText x="50%" y="50%" dy=".3em" textAnchor="middle">
                            {`${Math.round(rating)}%`}
                        </RatingText>
                    </RatingCircle>
                </TitleContainer>
                <Text>{overview}</Text>
                <Text>{formattedGenres}</Text>
                <Text>{runtime} minutes, {formatDate(release_date, language)}</Text>

            </Section>
        </DetailHeaderContainer>
    );
};

export default DetailHeader;