import styled from "@emotion/styled";

const TabsContainer = styled.div`
  /*background: #333;*/
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  margin: 2%;
  margin-bottom: 0px;

  @media screen and (max-width: 950px) {
    display: grid;
    justify-content: center;
    gap: 0rem;
  }
`;

export default TabsContainer;