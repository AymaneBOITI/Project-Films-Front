import styled from "@emotion/styled";

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(-10px);
  }
`;

export default BackButton;