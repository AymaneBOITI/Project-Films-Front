import styled from "@emotion/styled";

interface BackgroundImageProps {
    url: string;
}

const BackgroundImage = styled.div<BackgroundImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  filter: blur(40px);
  z-index: -1;
`;

export default BackgroundImage;