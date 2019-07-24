import React from "react";
import PropTypes from "prop-types";

import InputContent from "./InputContent";
import OptionsPanel from "./OptionsPanel";
import InputWrap from "../../../styled/InputWrap";
import PanelWrap from "../../../styled/PanelWrap";
import OptionsPointer from "../../../styled/OptionsPointer";
import InvisibleSelect from "../../../styled/InvisibleSelect";
import PointerHelper from '../../../styled/PointerHelper';

const propTypes = {
  inline: PropTypes.bool,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.string
      ]),
      title: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.string
      ]).isRequired
    })
  ),
  name: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onRef: PropTypes.func.isRequired,
  onOptionsRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  containerRef: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired
};

const defaultProps = {
  inline: false,
  name: undefined,
  values: []
};

const SingleSelectView = props => {
  const {
    inline,
    values,
    name,
    isOpen,
    onRef,
    onOptionsRef,
    onChange,
    onSelect,
    onFocus,
    onClick,
    onKeyPress,
    onMouseOut,
    onMouseMove,
    showPointer,
    containerRef,
    ...otherProps
  } = props;
  return (
    <InputWrap
      inline={inline === false ? inline : true}
      onFocus={onFocus}
      innerRef={containerRef}
      onKeyPress={onKeyPress}
      onMouseOut={onMouseOut}
      onMouseMove={onMouseMove}
      isOpen={isOpen}
      {...otherProps}
    >
      <InputContent
        values={values}
        onClick={onClick}
        onChange={onChange}
        isOpen={isOpen}
        {...otherProps}
      />

      <InvisibleSelect name={name} innerRef={onRef}>
        {values.map((item, k) => (
          <option key={`Key${k}${item.id}`} value={item.id}>
            {item.value ? item.value : item.title}
          </option>
        ))}
      </InvisibleSelect>

      <PanelWrap
        innerRef={onOptionsRef}
        visible={isOpen}
        truncate={otherProps.truncate}
        theme={otherProps.theme}
      >
        {showPointer && <OptionsPointer theme={otherProps.theme} />}
        <OptionsPanel
          showPointer={showPointer}
          onSelect={onSelect}
          values={values}
          isOpen={isOpen}
          {...otherProps}
        />
        {showPointer && <PointerHelper marginTop={showPointer ? '15px' : undefined} />}
      </PanelWrap>
    </InputWrap>
  );
};

SingleSelectView.propTypes = propTypes;
SingleSelectView.defaultProps = defaultProps;

export default SingleSelectView;
