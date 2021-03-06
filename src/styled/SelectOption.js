import React from "react";
import styled from "styled-components";

import { getThemeAsPlainObjectByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.padding || '8px 16px'};
  margin: ${props => props.margin};

  :after {
    content: ${props => (props.multi ? null : "")};
    width: 40px;
  }
  cursor: ${props => props.cursor};
  font-size: 16px;
  box-sizing: border-box;
  height: ${props => props.custom ? '' : props.height};
  color: ${props => props.color};
  font-family: ${props => props.fontFamily};
  font-weight: ${props => props.fontWeight};
  background: ${props => props.background};
  &:hover {
    background: ${props => props.hoverBackground};
    color: ${props => props.hoverColor};
  }
`;

const SelectOption = props => {
  const merged = innerMerge(
    {},
    defaultTheme.Select,
    (props.theme && props.theme.Select) || {}
  );

  const theme = getThemeAsPlainObjectByKeys(
    merged,
    props.disabled ? "disabled" : "main"
  );

  const mergedSelectOption = innerMerge(
    {},
    defaultTheme.Select.SelectOption,
    (props.theme && props.theme.Select && props.theme.Select.SelectOption) || {}
  );

  Object.assign(
    theme,
    getThemeAsPlainObjectByKeys(
      mergedSelectOption,
      props.disabled ? "disabled" : undefined
    )
  );

  return <Elem {...theme} {...props} />;
};

export default SelectOption;
