import React from "react";
import styled from "styled-components";

import { getThemeAsPlainObjectByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.div`
  position: absolute;
  top: 62px;
  left: -1px;
  min-width: ${props => (props.width ? props.width : "calc(100% + 2px)")};
  padding-top: ${props => props.paddingTop};
  padding-bottom: ${props => props.paddingBottom};
  js-display: flex;
  display: ${props => (props.visible ? "flex" : "none")};
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
  const merged = innerMerge(
    {},
    defaultTheme.Select,
    (props.theme && props.theme.Select) || {}
  );

  const theme = getThemeAsPlainObjectByKeys(
    merged,
    props.disabled ? "disabled" : "main"
  );

  const mergedSelectOptionsPanel = innerMerge(
    {},
    defaultTheme.Select.SelectOptionsPanel,
    (props.theme && props.theme.Select && props.theme.Select.SelectOptionsPanel) || {}
  );

  Object.assign(theme, getThemeAsPlainObjectByKeys(mergedSelectOptionsPanel));

  return <Elem {...theme} {...props} />;
};

export default SelectOptionsPanel;
