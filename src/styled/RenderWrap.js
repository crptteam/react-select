import React from "react";
import styled from "styled-components";

import { getThemeAsPlainObjectByKeys, innerMerge } from "../utils";
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
  const merged = innerMerge(
    {},
    defaultTheme.Select,
    (props.theme && props.theme.Select) || {}
  );

  const theme = getThemeAsPlainObjectByKeys(
    merged,
    props.disabled ? "disabled" : "main"
  );

  const mergedRenderWrap = innerMerge(
    {},
    defaultTheme.Select.RenderWrap,
    (props.theme && props.theme.Select && props.theme.Select.RenderWrap) || {}
  );

  Object.assign(
    theme,
    getThemeAsPlainObjectByKeys(
      mergedRenderWrap,
      props.disabled ? "disabled" : props.isError ? "error" : "main"
    )
  );
  return <Elem {...theme} {...props} />;
};

export default RenderWrap;
