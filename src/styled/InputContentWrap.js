import React from 'react';
import styled from 'styled-components';


const Elem = styled.div`
    js-display: flex; 
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  `;

const InputContentWrap = props => {

  return <Elem {...props} />;
};

export default InputContentWrap;
