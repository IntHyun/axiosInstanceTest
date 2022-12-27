import styled from 'styled-components';

export const UnderModalWrap = styled.ul`
  background-color: white;
  position: fixed;
  bottom: 0;
  margin-bottom: 50px;
  padding: 0 25px;
  width: 390px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 7px 0 var(--gray);
  z-index: 30;
  border-bottom: 10px solid white;
  animation-name: appear;
  animation-duration: 0.5s;
  @keyframes appear {
    0% {
      bottom: calc(-1 * (100vh - (100vh / 1.2)));
    }
    100% {
      bottom: 0px;
    }
  }
`;
export const UnderModalCloseBtn = styled.button`
  width: 340px;
  height: 20px;
  border-radius: 10px 10px 0 0;
  &::after {
    display: flex;
    content: '';
    border-radius: 5px;
    margin: 0 auto;
    background-color: var(--gray);
    width: 50px;
    height: 4px;
  }
`;
export const UnderModalCont = styled.li`
  font-size: 14px;
  line-height: 55px;
  color: black;
  cursor: pointer;
`;

export const CommentModalWrap = styled.ul`
  background-color: white;
  position: fixed;
  bottom: 0;
  padding: 15px 25px;
  width: 390px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 7px 0 var(--gray);
  z-index: 30;
  border-bottom: 10px solid white;
  animation-name: appear;
  animation-duration: 0.5s;
  @keyframes appear {
    0% {
      bottom: calc(-1 * (100vh - (100vh / 1.2)));
    }
    100% {
      bottom: 0px;
    }
  }
`;
