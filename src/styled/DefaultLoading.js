import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys } from '../utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  padding-top: 8px;
  padding-right: 16px;
  :first-child {
    padding-top: 8px;
  }
  :last-child {
    padding-bottom: 8px;
  }
  :after {
    content: ${props => (props.multi ? null : '')};
    width: 40px;
  }
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 16px;
  padding-right: 16px;
  color: ${props => props.color};
  font-family: ${props => props.fontFamily};
  font-weight: ${props => props.fontWeight};
`;

const DefaultLoading = props => {
  const theme = getThemeAsPlainTextByKeys(
    (props.theme && props.theme) || defaultTheme,
    props.disabled ? 'disabled' : 'main'
  );

  return <Elem {...theme} {...props}  />;
};

export default DefaultLoading;
