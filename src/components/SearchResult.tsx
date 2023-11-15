import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import {MovieDetails} from '../services/types';

interface MovieCardProps {
    movie: MovieDetails;
}

const Card = styled.div`
  display: grid;
  width: 20%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  };
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
`;

const Info = styled.div`
  padding: 16px;
  background-color: #f4f4f4;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #333;
`;

const Rating = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-top: 8px;
`;

const SearchResult = ({ movie }: MovieCardProps) => {
    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <Card onClick={handleMovieClick}>
            <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
            <Info>
                <Title>{movie.original_title}</Title>
                <Rating>{`Rating: ${movie.vote_average}/10`}</Rating>
            </Info>
        </Card>
    );
};

export default SearchResult;
