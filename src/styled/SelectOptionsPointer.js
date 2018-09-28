import styled from 'styled-components';
import {getThemeAsPlainObjectByKeys, innerMerge} from '../utils';
import defaultTheme from '../theme/defaultTheme';
import React from 'react';


const Elem = styled.div`
  background: ${props => props.background};
  width: 18px;
  height: 18px;
  bottom: calc(100% - 8px);
  position: absolute;
  transform: scaleX(0.7) rotate(-45deg);
  border: ${props => props.border};
  border-bottom: ${props => props.background};
  border-left: ${props => props.background};
  border-top-right-radius: 5px;
  border-bottom-left-radius: 80%;
  left: 7px;
`;

const SelectOptionsPointer = props => {
  const merged = innerMerge(
    {},
    defaultTheme.Select,
    (props.theme && props.theme.Select) || {}
  );

  const theme = getThemeAsPlainObjectByKeys(
    merged,
    props.disabled ? "disabled" : "main"
  );

  const mergedSelectOptionsPointer = innerMerge(
    {},
    defaultTheme.Select.SelectOptionsPointer,
    (props.theme && props.theme.Select && props.theme.Select.SelectOptionsPointer) || {}
  );

  Object.assign(theme, getThemeAsPlainObjectByKeys(mergedSelectOptionsPointer));

  if (props.isOpen) {
    Object.assign(
      theme,
      getThemeAsPlainObjectByKeys(
        mergedSelectOptionsPointer,
        "open"
      )
    );
  }

  return <Elem {...theme} {...props} />;
};

export default SelectOptionsPointer;
