import  { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import {constructYoutubeUrl, getBrowserLanguage, getMovieDetails} from '../services/apiService'; // Adjust the path as needed
import CreditsCard from './CreditsCard';
import { MovieDetails as MovieDetailsType, CastMember, CrewMember } from '../services/types';
import MovieCard from "./MovieCard.tsx";


const DetailsContainer = styled.div`
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
`;

const Subtitle = styled.h3`
  margin: 0;
  color: #666;
`;

const Text = styled.p`
  color: #333;
`;

const ScrollContainer = styled.div`
  overflow-x: auto;
  display: flex;
  gap: 10px;
  margin-top: 10px;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
`;

const Image = styled.img`
  max-height: 300px;
  object-fit: cover;
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

const TrailerContainer = styled.div`
  position: relative;
  overflow: hidden;

  padding-top: 56.25%;
`;

const TrailerIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  border: none;
`;
const formatDate = (dateString: string, language: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, options).format(date);
};
const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [details, setDetails] = useState<MovieDetailsType | null>(null);

    useEffect(() => {
        if (id) {
            getMovieDetails(parseInt(id)).then(setDetails);
        }
    }, [id]);

    const language = getBrowserLanguage();
    return (
        <DetailsContainer>
            {details ? (
                <>
                    <Section>
                        <img alt={details.cast[0].name} src={`https://image.tmdb.org/t/p/w500${details.cast[0].profile_path}`} />
                        <Section>
                            <Title>{details.original_title}</Title>
                            <Text>{details.overview}</Text>
                            <Text>Runtime: {details.runtime} minutes</Text>
                            <Text>Release Date: {formatDate(details.release_date, language)}</Text>
                            <Text>Rating: {details.vote_average}</Text>
                            <GenreContainer>
                                {details.genres.map(genre => (
                                    <GenreTag key={genre.id}>{genre.name}</GenreTag>
                                ))}
                            </GenreContainer>
                        </Section>
                    </Section>

                    <Section>
                        <Subtitle>Cast</Subtitle>
                        <ScrollContainer>
                            {details.cast.map((cast : CastMember, index: number) => (
                                <CreditsCard
                                    key={`${cast.name}-${cast.character}-${index}`}
                                    name={cast.name}
                                    role={cast.character}
                                    profilePath={cast.profile_path}
                                />
                            ))}
                        </ScrollContainer>
                    </Section>

                    <Section>
                        <Subtitle>Crew</Subtitle>
                        <ScrollContainer>
                            {details.crew.map((crew:CrewMember, index:number) => (
                                <CreditsCard
                                    key={`${crew.name}-${crew.job}-${index}`}
                                    name={crew.name}
                                    role={crew.job}
                                    profilePath={crew.profile_path}
                                />
                            ))}
                        </ScrollContainer>
                    </Section>

                    <Section>
                        <Subtitle>Gallery</Subtitle>
                        <ScrollContainer>
                            {details.imagePaths.map((imagePath :string, index :number) => (
                                <Image key={index} src={`https://image.tmdb.org/t/p/original/${imagePath}`} alt={`Movie scene ${index}`} />
                            ))}
                        </ScrollContainer>
                    </Section>
                    {details.trailerKey && (
                        <Section>
                            <Subtitle>Trailer</Subtitle>
                            <TrailerContainer>
                                <TrailerIframe
                                    src={constructYoutubeUrl(details.trailerKey)}
                                    title="movie-trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></TrailerIframe>
                            </TrailerContainer>
                        </Section>
                    )}

                </>
            ) : (
                <p>Loading...</p>
            )}
        </DetailsContainer>
    );
};

export default MovieDetails;