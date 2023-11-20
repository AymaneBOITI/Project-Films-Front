import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {constructImageUrl, constructYoutubeUrl, getBrowserLanguage, getMovieDetails} from '../services/apiService';
import CreditsCard from './CreditsCard';
import {CastMember, CrewMember, MovieDetails as MovieDetailsType} from '../services/types';
import DetailHeader from "./DetailHeader.tsx";
import DetailsContainer from "./Containers/DetailsContainer.tsx";
import BackgroundImage from "./PageElements/BackgroundImage.tsx";
import BackButton from "./PageElements/BackButton.tsx";
import BackIcon from "./PageElements/BackIcon.tsx";
import Section from "./Containers/Section.tsx";
import Subtitle from "./PageElements/Subtitle.tsx";
import ScrollContainer from "./Containers/ScrollContainer.tsx";
import TrailerContainer from "./Containers/TrailerContainer.tsx";
import TrailerIframe from "./PageElements/TrailerIframe.tsx";
import MovieImage from "./PageElements/MovieImage.tsx";

const MovieDetails = () => {
    const {id} = useParams<{ id: string }>();
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
                    {details.backdrop_path && (
                        <BackgroundImage url={constructImageUrl(details.backdrop_path)}/>
                    )}
                    <BackButton onClick={goBack}>
                        <BackIcon/> {backButtonLabel}
                    </BackButton>
                    <DetailHeader details={details}/>
                    {(details.cast.length > 0 || details.crew.length > 0) && (
                        <Section>
                            <Subtitle>Credits</Subtitle>
                            <ScrollContainer>
                                {details.cast.slice(0, 10).map((cast: CastMember, index: number) => (
                                    <CreditsCard
                                        key={`cast-${cast.name}-${index}`}
                                        name={cast.name}
                                        role={cast.character}
                                        profilePath={cast.profile_path}
                                    />
                                ))}
                                {details.crew.slice(0, 3).map((crew: CrewMember, index: number) => (
                                    <CreditsCard
                                        key={`crew-${crew.name}-${index}`}
                                        name={crew.name}
                                        role={crew.job}
                                        profilePath={crew.profile_path}
                                    />
                                ))}
                            </ScrollContainer>
                        </Section>
                    )}
                    {details.imagePaths && details.imagePaths.length > 0 && (
                        <Section>
                            <Subtitle>Gallery</Subtitle>
                            <ScrollContainer>
                                {details.imagePaths.map((imagePath: string, index: number) => (
                                    <MovieImage key={index} src={constructImageUrl(imagePath)}
                                                alt={`Movie scene ${index}`}/>
                                ))}
                            </ScrollContainer>
                        </Section>
                    )}
                    {details.trailerKey && (
                        <Section>
                            <Subtitle>Trailer</Subtitle>
                            <TrailerContainer>
                                <TrailerIframe
                                    src={constructYoutubeUrl(details.trailerKey)}
                                    title="movie-trailer"
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