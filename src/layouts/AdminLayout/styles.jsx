import styled, { css } from 'styled-components';

export const AdminContainer = styled.div`
  position: relative;
  display: flex;
`;

export const AdminContent = styled.div`
  width: 100%;
  transition: all 0.3s;

  ${(props) => props.show && css`
    margin-left: 300px;
    width: calc(100% - 300px);
  `}
`;

export const MainContainer = styled.div`
  min-height: calc(100vh - 120px);
`;
