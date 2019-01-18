import styled, { css } from 'styled-components';
import React from "react";
import { getThemeAsPlainObjectByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";



const Elem = styled.div`
  display: ${props => (props.visible ? "block" : "none")};
  top: ${props => (props.top ? props.top : "62px")};
  left: -1px;
  position: absolute;
  z-index: 9999;
  min-width: ${props => (props.width ? props.width : "calc(100% + 2px)")};
  ${props => props.truncate ? css`
    width: ${props.width ? props.width : "calc(100% + 2px)"};
  ` : ""}
`;

const PanelWrap = props => {

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

export default PanelWrap;
