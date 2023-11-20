import {useNavigate} from 'react-router-dom';
import {MovieSummary} from '../services/types';
import {constructImageUrl} from "../services/apiService.ts";
import DEFAULT_IMAGE from '../assets/NoFilm.png';
import Card from "./PageElements/Card.tsx";
import Title from "./PageElements/Title.tsx";
import Poster from "./PageElements/Poster.tsx";
import RatingCircle from "./PageElements/RatingCircle.tsx";
import RatingText from "./PageElements/RatingText.tsx";

interface MovieCardProps {
    movie: MovieSummary;
}

const MovieCard = ({movie}: MovieCardProps) => {
    const navigate = useNavigate();
    const rating = movie.voteAverage * 10;
    const circumference = 2 * Math.PI * 15.9155;
    const strokeDashoffset = circumference - (rating / 100) * circumference;

    const handleMovieClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <Card onClick={handleMovieClick}>
            <Poster src={movie.posterPath ? constructImageUrl(movie.posterPath) : DEFAULT_IMAGE}/>
            <Title>{movie.title}</Title>
            <RatingCircle width="42" height="42">
                <circle className="background" cx="21" cy="21" r="15.9155" fill="rgb(24, 31, 41)"/>
                <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#204529" strokeWidth="3"
                        strokeDasharray={circumference} strokeDashoffset="100"/>
                <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#21d07a" strokeWidth="3"
                        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}/>
                <RatingText x="50%" y="50%" dy=".3em" textAnchor="middle">
                    {`${Math.round(rating)}%`}
                </RatingText>
            </RatingCircle>
        </Card>
    );
};

export default MovieCard;
