import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails } from '../services/apiService';
import { CastMember, CrewMember } from '../services/types';
import CreditsCard from './CreditsCard';
import DetailHeader from "./DetailHeader";
import DetailsContainer from "./Containers/DetailsContainer";
import BackgroundImage from "./PageElements/BackgroundImage";
import BackButton from "./PageElements/BackButton";
import BackIcon from "./PageElements/BackIcon";
import Section from "./Containers/Section";
import Subtitle from "./PageElements/Subtitle";
import ScrollContainer from "./Containers/ScrollContainer";
import TrailerContainer from "./Containers/TrailerContainer";
import TrailerIframe from "./PageElements/TrailerIframe";
import MovieImage from "./PageElements/MovieImage";
import { constructImageUrl, constructYoutubeUrl, getBrowserLanguage } from '../services/apiService';

const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: details, isError, isLoading } = useMovieDetails(parseInt(id || '0'));
    const language = getBrowserLanguage();

    const goBack = () => navigate(-1);
    const backButtonLabel = language.startsWith('fr') ? 'Retour' : 'Back';

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !details) {
        return <div>Erreur lors du chargement des détails du film.</div>;
    }

    return (
        <DetailsContainer>
            {details.backdrop_path && (
                <BackgroundImage url={constructImageUrl(details.backdrop_path)} />
            )}
            <BackButton onClick={goBack}>
                <BackIcon /> {backButtonLabel}
            </BackButton>
            <DetailHeader details={details} />
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
                                        alt={`Movie scene ${index}`} />
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
        </DetailsContainer>
    );
};

export default MovieDetails;
