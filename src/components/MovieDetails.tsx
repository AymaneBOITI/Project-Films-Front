import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/apiService'; // Adjust the path as needed
import CreditsCard from './CreditsCard';
import { MovieDetails as MovieDetailsType, CastMember, CrewMember } from '../services/types';

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
`;

const Image = styled.img`
  max-height: 300px;
  object-fit: cover;
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
                    <Section>
                        <Title>{details.original_title}</Title>
                        <Text>{details.overview}</Text>
                        {/* Assuming you have a way to format runtime nicely */}
                        <Text>Runtime: {details.runtime} minutes</Text>
                        <Text>Rating: {details.vote_average}</Text>
                    </Section>

                    <Section>
                        <Subtitle>Cast</Subtitle>
                        <ScrollContainer>
                            {details.cast.map((cast: CastMember) => (
                                <CreditsCard
                                    key={cast.name}
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
                            {details.crew.map((crew: CrewMember) => (
                                <CreditsCard
                                    key={crew.name}
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
                            {details.imagePaths.map((imagePath: string, index: number) => (
                                <Image key={index} src={`https://image.tmdb.org/t/p/original/${imagePath}`} alt={`Movie scene ${index}`} />
                            ))}
                        </ScrollContainer>
                    </Section>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </DetailsContainer>
    );
};

export default MovieDetails;
