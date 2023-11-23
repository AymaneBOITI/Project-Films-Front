import React from 'react';
import {constructImageUrl, getBrowserLanguage} from '../services/apiService';
import {MovieDetails as MovieDetailsType} from '../services/types';
import DEFAULT_IMAGE from "../assets/NoFilm.png";
import DetailHeaderContainer from "./Containers/DetailHeaderContainer.tsx";
import Image from "./PageElements/Image.tsx";
import Section from "./Containers/Section.tsx";
import Title from "./PageElements/Title.tsx";
import Text from "./PageElements/Text.tsx";
import {RatingCircle , TitleContainer, RatingText} from "./Containers/RatingHeaderDetailMovie.tsx";


const formatDate = (dateString: string, language: string): string => {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, options).format(date);

};

const DetailHeader: React.FC<{ details: MovieDetailsType }> = ({details}) => {
    const language = getBrowserLanguage();
    const {poster_path, original_title, overview, runtime, release_date, vote_average, genres} = details;
    const posterSrc = poster_path ? constructImageUrl(poster_path) : DEFAULT_IMAGE;
    const formattedGenres = genres.map(genre => genre.name).join(', ');
    const rating = vote_average * 10;
    const circumference = 2 * Math.PI * 15.9155;
    const strokeDashoffset = circumference - (rating / 100) * circumference;

    return (
        <DetailHeaderContainer>
            <Image src={posterSrc} alt="Movie Poster"/>
            <Section>
                <TitleContainer>
                    <Title>{original_title}</Title>
                    <RatingCircle width="42" height="42">
                        <circle cx="21" cy="21" r="15.9155" fill="rgb(24, 31, 41)"/>
                        <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#21d07a" strokeWidth="3"
                                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}/>
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