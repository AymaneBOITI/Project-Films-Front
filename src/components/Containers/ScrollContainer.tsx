import styled from "@emotion/styled";

const ScrollContainer = styled.div`
  overflow-x: auto;
  display: flex;
  gap: 10px;
  margin-top: 10px;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
    width: 20%;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }
`;

export default ScrollContainer;