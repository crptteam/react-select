import React from 'react';
import PropTypes from 'prop-types';

import InputContent from './InputContent';
import OptionsPanel from './OptionsPanel';
import InputWrap from '../../../styled/InputWrap';
import InvisibleSelect from '../../../styled/InvisibleSelect';

const propTypes = {
  inline: PropTypes.bool,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.string,
      ]),
      title: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.string,
      ]).isRequired,
    }),
  ),
  name: PropTypes.string,
  onRef: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseMove: PropTypes.func,
  onBlur: PropTypes.func,
};

const defaultProps = {
  inline: false,
  name: undefined,
  values: [],
  onRef: () => {},
  onMouseOut: () => {},
  onMouseMove: () => {},
  onBlur: () => {},
};

const SingleSelectView = (props) => {
  const {
    inline,
    values,
    name,
    onRef,
    onMouseOut,
    onMouseMove,
    onBlur,
    ...otherProps
  } = props;
  return (
    <InputWrap
      inline={inline === false ? inline : true}
      onMouseOut={onMouseOut}
      onMouseMove={onMouseMove}
      onBlur={onBlur}
      {...otherProps}
    >
      <InputContent {...props} />

      <InvisibleSelect name={name} innerRef={onRef}>
        {values.map(item => (
          <option key={item.id} value={item.id}>
            {item.value ? item.value : item.title}
          </option>
        ))}
      </InvisibleSelect>

      <OptionsPanel {...props} />
    </InputWrap>
  );
};

SingleSelectView.propTypes = propTypes;
SingleSelectView.defaultProps = defaultProps;

export default SingleSelectView;
