import React from "react";
import styled from "styled-components";

import { getThemeAsPlainObjectByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.input`
  display: block;
  position: relative;
  width: ${props => (props.width ? props.width : "100%")};
  height: ${props => props.height};
  line-height: ${props => props.height};
  font-size: ${props => props.fontSize};
  font-family: ${props => props.fontFamily};
  font-weight: ${props => props.fontWeight};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  box-sizing: border-box !important;
  outline: 0;
  border: ${props => props.border};
  overflow: hidden;
  padding: 0;
  top: ${props => (props.centered ? "0" : "10px")};
  background: ${props => props.background};
  cursor: ${props => props.cursor};
  color: ${props => (props.noCaret ? "rgba(0,0,0,0)" : props.color)};
  text-shadow: ${props => (props.noCaret ? "0 0 0 " + props.color : "none")};
  ::-webkit-input-placeholder {
    color: ${props => props.placeholderColor};
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
  }
`;

const InputElem = props => {
  const merged = innerMerge(
    {},
    defaultTheme.Select,
    (props.theme && props.theme.Select) || {}
  );

  const theme = getThemeAsPlainObjectByKeys(
    merged,
    props.disabled ? "disabled" : "main"
  );

  const mergedInputElem = innerMerge(
    {},
    defaultTheme.Select.InputElem,
    (props.theme && props.theme.Select && props.theme.Select.InputElem) || {}
  );

  Object.assign(
    theme,
    getThemeAsPlainObjectByKeys(
      mergedInputElem,
      props.disabled ? "disabled" : props.isError ? "error" : "main"
    )
  );

  return <Elem {...theme} {...props} />;
};

export default InputElem;
