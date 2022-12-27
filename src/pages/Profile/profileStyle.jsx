import styled from 'styled-components';

export const BackDrop = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  width: 390px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
`;

export const BackDropWhite = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  width: 390px;
  min-height: 100vh;
  /* height: ${(props) => `${props.height}px`}; */
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(2px);
`;

export const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding-bottom: 60px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
