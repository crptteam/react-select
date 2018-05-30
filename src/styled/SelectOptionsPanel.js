import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys } from '../utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  position: absolute;
  top: 62px;
  left: -1px;
  min-width: ${props => (props.width ? props.width : 'calc(100% + 2px)')};
  padding-top: 8px;
  padding-bottom: 8px;
  js-display: flex;
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  white-space: nowrap;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
  z-index: 3;
  background: ${props => props.background};
  border: ${props => props.border};
`;

const SelectOptionsPanel = props => {
  const theme = getThemeAsPlainTextByKeys(
    (props.theme && props.theme) || defaultTheme,
    props.disabled ? 'disabled' : 'main'
  );

  return <Elem {...theme} {...props}  />;
};

export default SelectOptionsPanel;
