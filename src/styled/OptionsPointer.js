import styled from 'styled-components';
import { getThemeAsPlainObjectByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';
import React from 'react';


const Elem = styled.div`
  position: absolute;
  left: 19px;
  width: 20px;
  height: 20px;
  transform: rotate(58deg) skew(30deg);
  border-top-left-radius: 25%;
  background: ${props => props.background};
  top: 9px;
  box-shadow: ${props => props.boxShadow};
  border: ${props => props.border};
`;

const SelectOptionsPointer = props => {
  const merged = innerMerge(
    {},
    defaultTheme.Select,
    props.theme && props.theme.Select ? props.theme.Select : {}
  );

  innerMerge(merged, defaultTheme.Select.SelectOptionsPanel, (props.theme && props.theme.Select && props.theme.Select.SelectOptionsPanel) || {});

  const theme = getThemeAsPlainObjectByKeys(
    merged,
    props.disabled ? "disabled" : props.isError ? "error" : "main"
  );

  return <Elem {...theme} {...props} />;
};

export default SelectOptionsPointer;
