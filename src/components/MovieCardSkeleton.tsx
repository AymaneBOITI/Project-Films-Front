/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const movieCardSkeleton = css`
  width: 100%; 
  height: 24rem;
  border-radius: 0.375rem;
  background-color: rgba(255,255,255,0.1);
  animation: pulse 1.5s infinite;
  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
  }
  &:hover {
    transform: scale(1.1);
    & > svg {
      opacity: 1;
    }
`;

const MovieCardSkeleton = () => {
    return <div css={movieCardSkeleton} />;
};

export default MovieCardSkeleton;
