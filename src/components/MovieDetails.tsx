import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { getMovieDetails } from '../services/apiService'; // Adjust the import path
import { MovieDetails as MovieDetailsType } from '../services/types'; // Adjust the import path
import CreditsCard from './CreditsCard';

const DetailsContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const Overview = styled.p`
  color: #666;
`;

const CreditsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [details, setDetails] = useState<MovieDetailsType | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            if (id) {
                const movieDetails = await getMovieDetails(parseInt(id));
                setDetails(movieDetails);
            }
        };

        fetchDetails();
    }, [id]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <DetailsContainer>
            <Title>{details.original_title}</Title>
            <Overview>{details.overview}</Overview>
            {/* Other movie details like genres, rating, etc. can be added here */}
            <CreditsContainer>
                {details.cast.map((person) => (
                    <CreditsCard
                        key={person.name}
                        name={person.name}
                        character={person.character}
                        profilePath={person.profile_path}
                    />
                ))}
                {details.crew.map((person) => (
                    <CreditsCard
                        key={person.name}
                        name={person.name}
                        profilePath={person.profile_path}
                        job={person.job}/>
                ))}
            </CreditsContainer>
        </DetailsContainer>
    );
};

export default MovieDetails;
