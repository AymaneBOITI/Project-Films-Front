import styled from "@emotion/styled";

const SearchInput = styled.input`
  padding-left: 1rem;
  border-radius: 9999px;
  @media screen and (max-width: 1150px) {
    min-width: 100%;
    margin-top: 10px;
  }
  height: 35px;
  border: none;
`;

export const SearchInputContainer = styled.div`
  position: relative;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: -5px;
  top: 45%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
`;

export default SearchInput;