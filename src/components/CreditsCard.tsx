import styled from '@emotion/styled';
import unknown from '../assets/unknown.png';

interface CreditsCardProps {
    name: string;
    role: string;
    profilePath?: string;
}

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;

  width: 150px;
  margin-bottom: 16px;
  min-width: 200px;
  
`;

const ProfileImage = styled.img`
  width: 100%;
  min-width: 200px;
  min-height: 300px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #333;
`;

const Role = styled.p`
  font-size: 0.875rem;
  color: #666;
`;

const defaultProfileImage = unknown;

export const CreditsCard = ({ name, role, profilePath }: CreditsCardProps) => {
    const imageUrl = profilePath
        ? `https://image.tmdb.org/t/p/original${profilePath}`
        : defaultProfileImage;

    return (
        <Card>
            <ProfileImage src={imageUrl} alt={`Profile of ${name}`} />
            <Name>{name}</Name>
            <Role>{role}</Role>
        </Card>
    );
};

export default CreditsCard;
