import styled from '@emotion/styled';
import unknown from '../assets/unknown.png';
import {constructImageUrl} from "../services/apiService.ts";

interface CreditsCardProps {
    name: string;
    role: string;
    profilePath?: string;
}

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: left;

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
  color: rgba(255,255,255,0.9);
`;

const Role = styled.p`
  margin: 0px;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.7);
  
`;

const defaultProfileImage = unknown;

export const CreditsCard = ({ name, role, profilePath }: CreditsCardProps) => {
    const imageUrl = profilePath
        ? constructImageUrl(profilePath)
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
