import React from "react";
import styled from "styled-components";

import { getThemeAsPlainTextByKeys } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: ${props => (props.width ? props.width : "100%")};
  height: 100%;
  font-family: ${props => props.fontFamily};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  box-sizing: border-box !important;
  outline: 0;
  border: 0;
  overflow: hidden;
  padding: 0;
  background: ${props => props.background};
  cursor: ${props => props.cursor};
`;

const RenderWrap = props => {
  const theme = getThemeAsPlainTextByKeys(props.theme || defaultTheme);

  Object.assign(
    theme,
    getThemeAsPlainTextByKeys(
      (props.theme && props.theme.RenderWrap) || defaultTheme.RenderWrap,
      props.disabled ? "disabled" : props.isError ? "error" : "main"
    )
  );

  return <Elem {...theme} {...props} />;
};

export default RenderWrap;
