import React from "react";
import styled from "styled-components";

import { getThemeAsPlainObjectByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.div`
  display: ${props => (props.focused && !props.isSaved) ? "none" : "block"};
  position: absolute;
  height: ${props => props.height};
  line-height: ${props => props.height};
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  font-weight: ${props => props.fontWeight};
  top: ${props => props.top};
  left: ${props => props.left ? `${props.left}px` : '0'};
  font-family: ${props => props.fontFamily};
  transition: all 0.3s ease;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
`;

const Placeholder = props => {
  const merged = innerMerge(
    {},
    defaultTheme.Select,
    props.theme && props.theme.Select ? props.theme.Select : {}
  );

  const theme = getThemeAsPlainObjectByKeys(merged);

  const mergedPlaceholder = innerMerge(
    {},
    defaultTheme.Select.Placeholder,
    (props.theme && props.theme.Select && props.theme.Select.Placeholder) || {}
  );

  const key = props.disabled ? "disabled" : props.isError ? "error" : "main";

  Object.assign(
    theme,
    getThemeAsPlainObjectByKeys(
      mergedPlaceholder,
      key,
      props.focused ? "focused" : "normal"
    )
  );

  return <Elem {...theme} {...props} />;
};

export default Placeholder;
