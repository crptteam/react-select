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
  onRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
};

const defaultProps = {
  inline: false,
  name: undefined,
  values: [],
};

const SingleSelectView = (props) => {
  const {
    inline,
    values,
    name,
    onRef,
    onChange,
    onSelect,
    onFocus,
    onBlur,
    onClick,
    onKeyPress,
    onMouseOut,
    onMouseMove,
    ...otherProps
  } = props;
  return (
    <InputWrap
      inline={inline === false ? inline : true}
      onFocus={onFocus}
      onKeyPress={onKeyPress}
      onMouseOut={onMouseOut}
      onMouseMove={onMouseMove}
      onBlur={onBlur}
      {...otherProps}
    >
      <InputContent
        values={values}
        onClick={onClick}
        onChange={onChange}
        {...otherProps}
      />

      <InvisibleSelect name={name} innerRef={onRef}>
        {values.map((item, k) => (
          <option key={`Key${k}${item.id}`} value={item.id}>
            {item.value ? item.value : item.title}
          </option>
        ))}
      </InvisibleSelect>

      <OptionsPanel onSelect={onSelect} values={values} {...otherProps} />
    </InputWrap>
  );
};

SingleSelectView.propTypes = propTypes;
SingleSelectView.defaultProps = defaultProps;

export default SingleSelectView;
