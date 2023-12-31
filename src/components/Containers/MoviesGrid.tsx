import styled from "@emotion/styled";

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 2rem;
  padding-top: 1.5rem;
`;

export default MoviesGrid;