import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import {constructImageUrl, constructYoutubeUrl, getMovieDetails} from '../services/apiService';
import CreditsCard from './CreditsCard';
import { MovieDetails as MovieDetailsType, CastMember, CrewMember } from '../services/types';
import DetailHeader from "./DetailHeader.tsx";


const DetailsContainer = styled.div`
  padding: 20px;
  /*background-image: constructImageUrl(details.backdrop_path);
  background-size: cover ;
  background-position: center;
  filter: blur(8px);
  position: fixed;
  z-index: -1;*/
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  margin: 0;
  color: white;
  font-size: 32px;
  font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";

`;

const ScrollContainer = styled.div`
  overflow-x: auto;
  display: flex;
  gap: 10px;
  margin-top: 10px;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
    width: 20%;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }
`;

const Image = styled.img`
  max-height: 300px;
  object-fit: cover;
`;

const TrailerContainer = styled.div`
  display: grid;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  background: none;
  
`;

const TrailerIframe = styled.iframe`
  border: none;
  width: 80vw;
  height: 80vh;
  border-radius: 10px;
  
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
        <DetailsContainer >
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