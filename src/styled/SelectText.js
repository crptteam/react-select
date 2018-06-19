import React from "react";
import styled, { css } from "styled-components";

const SelectText = styled.span`
  flex: 1;

  ${props => !props.multiline && css`
    white-space: nowrap;
  `}

  ${props => props.truncate && css`
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export default SelectText;
