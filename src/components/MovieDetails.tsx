import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import {constructYoutubeUrl, getMovieDetails} from '../services/apiService'; // Adjust the path as needed
import CreditsCard from './CreditsCard';
import { MovieDetails as MovieDetailsType, CastMember, CrewMember } from '../services/types';
import DetailHeader from "./DetailHeader.tsx";


const DetailsContainer = styled.div`
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  margin: 0;
  color: #666;
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

const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [details, setDetails] = useState<MovieDetailsType | null>(null);

    useEffect(() => {
        if (id) {
            getMovieDetails(parseInt(id)).then(setDetails);
        }
    }, [id]);

    return (
        <DetailsContainer>
            {details ? (
                <>
                     <DetailHeader details={details} />
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