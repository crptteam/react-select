import React from "react";
import styled, { css } from "styled-components";

import { getThemeAsPlainObjectByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.div`
  position: absolute;
  left: 23px;
  background: ${props => props.background};
  width: 16px;
  height: 2px;
  z-index: 4;
  top: ${props => props.marginTop};
`;

const PointerHelper = props => {
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

  if (props.isOpen) {
    Object.assign(
      theme,
      getThemeAsPlainObjectByKeys(
        mergedSelectOptionsPanel,
        "open"
      )
    );
  }

  return <Elem {...theme} {...props} />;
};

export default PointerHelper;
