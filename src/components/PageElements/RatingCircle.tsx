import styled from "@emotion/styled";

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

export default RatingCircle;