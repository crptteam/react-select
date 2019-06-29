import React from 'react';
import styled from 'styled-components';

const SelectedIconWrap = styled.div`
  width: ${props => props.renderIcon ? '' : '40px'};
  display: inline-flex;
  justify-content: flex-end;
`;

export default SelectedIconWrap;