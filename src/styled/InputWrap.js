import React from "react";
import styled from "styled-components";

import defaultTheme from "../theme/defaultTheme";
import { getThemeAsPlainObjectByKeys, innerMerge, toStyled } from '../utils';

const Elem = styled.label`
  js-display: ${props => (props.inline ? "inline-flex" : "flex")};
  display: ${props => (props.inline ? "inline-flex" : "flex")};
  width: ${props => (props.inline ? props.width : "100%")};
  min-width: ${props => (props.inline ? props.minWidth : "100%")};
  height: ${props => props.height};
  min-height: ${props => props.minHeight};
  box-sizing: border-box;
  background: ${props => props.background};
  ${toStyled('border', 'border')}
  ${toStyled('borderLeft', 'border-left')}
  ${toStyled('borderTop', 'border-top')}
  ${toStyled('borderRight', 'border-right')}
  ${toStyled('borderBottom', 'border-bottom')}
  box-sizing: border-box;
  border-radius: ${props => props.borderRadius};
  padding-left: ${props => props.paddingLeft};
  padding-right: ${props => props.paddingRight};
  position: relative;
  cursor: ${props => props.cursor};
  box-shadow: ${props => (props.boxShadow ? props.boxShadow : "")};
`;

const InputWrap = props => {
  const merged = innerMerge(
    {},
    defaultTheme.Select,
    (props.theme && props.theme.Select) || {}
  );

  const theme = getThemeAsPlainObjectByKeys(
    merged,
    props.disabled ? "disabled" : "main",
  );

  const mergedInputWrap = innerMerge(
    {},
    defaultTheme.Select.InputWrap,
    (props.theme && props.theme.Select && props.theme.Select.InputWrap) || {}
  );

  Object.assign(
    theme,
    getThemeAsPlainObjectByKeys(
      mergedInputWrap,
      props.disabled ? "disabled" : props.isError ? "error" : "main",
    )
  );

  if (props.isOpen) {
    Object.assign(
      theme,
      getThemeAsPlainObjectByKeys(
        mergedInputWrap,
        "open"
      )
    );
  }

  return <Elem {...theme} {...props} />;
};

export default InputWrap;
