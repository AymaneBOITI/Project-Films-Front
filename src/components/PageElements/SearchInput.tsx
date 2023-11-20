import styled from "@emotion/styled";

const SearchInput = styled.input`
  padding-left: 1rem;
  border-radius: 9999px;
  @media screen and (max-width: 1150px) {
    min-width: 100%;
  }
  height: 35px;
  border: none;
`;

export default SearchInput;