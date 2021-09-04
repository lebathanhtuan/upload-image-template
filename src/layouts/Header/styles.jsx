import styled from 'styled-components';
import { Select } from 'antd';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  background-color: ${(props) => props.theme.header};
  color: white;
`;

export const Logo = styled.h1`
  margin: 0;
  font-size: 24px;
  color: white;
`;

export const CustomSelect = styled(Select)`
  margin-right: 16px;
  width: 100px;
`;
