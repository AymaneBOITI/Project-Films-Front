import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { MovieSummary } from '../services/types';
import {constructImageUrl} from "../services/apiService.ts";


interface MovieCardProps {
    movie: MovieSummary;
}

const Card = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  vertical-align: middle;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
    & > svg {
      opacity: 1;
    }
  }
`;

const Poster = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
`;


const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #333;
`;
const RatingCircle = styled.svg`
  position: absolute;
  bottom: 10px;
  right: 10px;
  transform: rotate(-90deg);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &:hover {
  }
`;

const RatingText = styled.text`
  transform: rotate(90deg);
  transform-origin: center;
  fill: white; 
  font-size: 12px;
  font-weight: bold; 
`;
const MovieCard = ({ movie }: MovieCardProps) => {
    const navigate = useNavigate();
    const rating = movie.voteAverage * 10; // Assuming voteAverage is between 0 and 10
    const circumference = 2 * Math.PI * 15.9155; // Assuming radius is 15.9155 for the SVG circle
    const strokeDashoffset = circumference - (rating / 100) * circumference;

    const handleMovieClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <Card onClick={handleMovieClick}>
            <Poster src={constructImageUrl(movie.posterPath)} alt={movie.title} />
            <Title>{movie.title}</Title>
            <RatingCircle width="42" height="42">
                <circle className="background" cx="21" cy="21" r="15.9155" fill="rgb(24, 31, 41)" />
                <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#204529" strokeWidth="3" strokeDasharray={circumference} strokeDashoffset="100" />
                <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#21d07a" strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
                <RatingText x="50%" y="50%" dy=".3em" textAnchor="middle">
                    {`${Math.round(rating)}%`}
                </RatingText>
            </RatingCircle>
        </Card>
    );
};

export default MovieCard;
