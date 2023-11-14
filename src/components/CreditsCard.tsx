import styled from '@emotion/styled';

interface CreditsCardProps {
    name: string;
    character?: string;
    job?:string;
    profilePath?: string;
}

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  padding: 16px;
  width: 150px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
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

const defaultProfileImage = '../assets/unknown.png';

export const CreditsCard = ({ name, character, profilePath }: CreditsCardProps) => {
    const imageUrl = profilePath ? `https://image.tmdb.org/t/p/original${profilePath}` : defaultProfileImage;

    return (
        <Card>
            <ProfileImage src={imageUrl} alt={`Profile of ${name}`} />
            <Name>{name}</Name>
            <Role>{character}</Role>
        </Card>
    );
};

export default CreditsCard;
