import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {useNavigate, useParams} from 'react-router-dom';
import {constructImageUrl, constructYoutubeUrl, getBrowserLanguage, getMovieDetails} from '../services/apiService';
import CreditsCard from './CreditsCard';
import { MovieDetails as MovieDetailsType, CastMember, CrewMember } from '../services/types';
import DetailHeader from "./DetailHeader.tsx";


const DetailsContainer = styled.div`
  padding: 20px;
  backdrop-filter: blur(40px);
`;

interface BackgroundImageProps {
    url: string;
}
const BackgroundImage = styled.div<BackgroundImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  filter: blur(40px);
  z-index: -1;
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
const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: transform 0.3s ease; 
  &:hover {
    transform: translateX(-10px); 
  }
  `;

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [details, setDetails] = useState<MovieDetailsType | null>(null);
    const navigate = useNavigate();
    const language = getBrowserLanguage();

    useEffect(() => {
        if (id) {
            getMovieDetails(parseInt(id)).then(setDetails);
        }
    }, [id]);

    const goBack = () => navigate(-1);
    const backButtonLabel = language.startsWith('fr') ? 'Retour' : 'Back';

    return (
        <DetailsContainer>
            {details && (
                <>
                    <BackgroundImage url={constructImageUrl(details.backdrop_path)} />
                    <BackButton onClick={goBack}>
                        <BackIcon /> {backButtonLabel}
                    </BackButton>
                    <DetailHeader details={details} />
                    <Section>
                        <Subtitle>Credits</Subtitle>
                        <ScrollContainer>
                            {details.cast.map((cast: CastMember, index: number) => (
                                <CreditsCard
                                    key={`cast-${cast.name}-${index}`}
                                    name={cast.name}
                                    role={cast.character}
                                    profilePath={cast.profile_path}
                                />
                            ))}
                            {details.crew.map((crew: CrewMember, index: number) => (
                                <CreditsCard
                                    key={`crew-${crew.name}-${index}`}
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
            )}
        </DetailsContainer>
    );
};

export default MovieDetails;