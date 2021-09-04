import styled, { css } from 'styled-components';

export const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => props.show ? '0' : '-300px'};
  width: 300px;
  height: calc(100vh - 56px);
  background-color: ${(props) => props.theme.sidebar};
  transition: all 0.3s;
`;

export const SidebarItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 50px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.hover};
  }

  ${(props) => props.active && css`
    background-color: ${(props) => props.theme.active} !important;
    border-right: 5px solid #b5f5ec;
  `}
`;
