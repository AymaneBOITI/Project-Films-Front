import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled';

const ScrollContainer = styled.div`
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface InfiniteScrollWrapperProps {
    dataLength: number;
    next: () => void;
    hasMore: boolean;
    loader: JSX.Element;
    endMessage: JSX.Element;
    children: React.ReactNode;
}

export const InfiniteScrollWrapper = ({
                                          dataLength,
                                          next,
                                          hasMore,
                                          loader,
                                          endMessage,
                                          children,
                                      }: InfiniteScrollWrapperProps) => {
    return (
        <InfiniteScroll
            dataLength={dataLength}
            next={next}
            hasMore={hasMore}
            loader={loader}
            endMessage={endMessage}
            style={{ width: '100%' }} //To put endMessage and loader in the center
        >
            <ScrollContainer>{children}</ScrollContainer>
        </InfiniteScroll>
    );
};

export default InfiniteScrollWrapper;
