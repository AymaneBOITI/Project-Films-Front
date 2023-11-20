import styled from "@emotion/styled";

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
export default Card;