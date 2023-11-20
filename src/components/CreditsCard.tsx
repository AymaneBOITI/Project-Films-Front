import unknown from '../assets/unknown.png';
import {constructImageUrl} from "../services/apiService.ts";
import CreditsCardContainer from "./Containers/CreditsCardContainer.tsx";
import Profile from "./PageElements/Profile.tsx";
import Name from "./PageElements/Name.tsx";
import Role from "./PageElements/Role.tsx";

interface CreditsCardProps {
    name: string;
    role: string;
    profilePath?: string;
}

const defaultProfileImage = unknown;

export const CreditsCard = ({name, role, profilePath}: CreditsCardProps) => {
    const imageUrl = profilePath
        ? constructImageUrl(profilePath)
        : defaultProfileImage;

    return (
        <CreditsCardContainer>
            <Profile src={imageUrl} alt={`Profile of ${name}`}/>
            <Name>{name}</Name>
            <Role>{role}</Role>
        </CreditsCardContainer>
    );
};

export default CreditsCard;
