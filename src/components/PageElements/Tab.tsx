import styled from "@emotion/styled";

const Tab = styled.button<{ isActive: boolean }>`
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  background: ${({isActive}) => (isActive ? '#555' : 'transparent')};
  border: none;
  color: ${({isActive}) => (isActive ? 'white' : '#aaa')};
  border-bottom: ${({isActive}) => (isActive ? '2px solid white' : 'none')};

  &:hover {
    color: white;
  }

  @media screen and (max-width: 950px) {
      /*display: none;*/
      margin-top: 1rem;
    
  }
`;

export default Tab;