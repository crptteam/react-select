import React from "react";
import styled from "styled-components";

import { getThemeAsPlainObjectByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";

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
    content: ${props => (props.multi ? null : "")};
    width: 40px;
  }
  cursor: ${props => props.cursor};
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 16px;
  padding-right: 16px;
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

  Object.assign(theme, getThemeAsPlainObjectByKeys(mergedSelectOption));

  return <Elem {...theme} {...props} />;
};

export default SelectOption;
