import React from 'react';
import PropTypes from 'prop-types';

import InputWrap from '../../styled/InputWrap';
import InputContentWrap from '../../styled/InputContentWrap';
import InputElem from '../../styled/InputElem';
import RenderWrap from '../../styled/RenderWrap';
import SelectOptionsPanel from '../../styled/SelectOptionsPanel';
import DefaultLoading from '../../styled/DefaultLoading';
import InvisibleSelect from '../../styled/InvisibleSelect';
import Placeholder from '../../styled/Placeholder';

import { BottomArrow, Search } from '../../svg';

const propTypes = {
  inline: PropTypes.bool,
  isFocused: PropTypes.bool,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  savePlaceholder: PropTypes.bool,
  theme: PropTypes.object,
  renderValue: PropTypes.object,
  value: PropTypes.string.isRequired,
  values: PropTypes.array,
  selectedId: PropTypes.number,
  select: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  truncate: PropTypes.bool,
  name: PropTypes.string.isRequired,
  renderValues: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func,
  onMouseMove: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onClickRenderWrap: PropTypes.func.isRequired,
};

const defaultProps = {
  inline: false,
  isFocused: false,
  isError: false,
  disabled: false,
  placeholder: '',
  savePlaceholder: false,
  selectedId: undefined,
  truncate: false,
};

const SigngleSelectView = ({
  inline,
  isFocused,
  isError,
  isOpen,
  isLoading,
  disabled,
  truncate,
  theme,
  placeholder,
  savePlaceholder,
  renderValue: RenderValue,
  selectedId,
  select,
  renderValues,
  value,
  values,
  name,
  onMouseOut,
  onMouseMove,
  onChange,
  onFocus,
  onBlur,
  onClickRenderWrap,
  ...otherProps
}) => (
  <InputWrap
    inline={inline === false ? inline : true}
    {...otherProps}
    onBlur={onBlur}
    theme={theme}
    onMouseOut={onMouseOut}
    onMouseMove={onMouseMove}
  >
    <InputContentWrap {...otherProps} theme={theme}>
      <Placeholder
        focused={isFocused}
        dispabled={disabled}
        isError={isError}
        theme={theme}
        isSaved={savePlaceholder}
      >
        {placeholder}
      </Placeholder>

      {RenderValue && selectedId !== null ? (
        <RenderWrap onClick={onClickRenderWrap}>
          <RenderValue
            selected={values.find(item => item.id === selectedId)}
          />
        </RenderWrap>
      ) : (
        <InputElem
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          centered={!savePlaceholder}
          theme={theme}
          disabled={disabled}
        />
      )}

      {isFocused ? <Search /> : <BottomArrow />}
    </InputContentWrap>

    <InvisibleSelect name={name} innerRef={el => (select = el)}>
      {values.map((v, i) => (
        <option key={i} value={v.id}>
          {v.value ? v.value : v.title}
        </option>
      ))}
    </InvisibleSelect>

    <SelectOptionsPanel theme={theme} visible={isOpen} truncate={truncate}>
      {isLoading ? (
        <DefaultLoading>
          Загрузка...
        </DefaultLoading>
      ) : (
        renderValues()
      )}
    </SelectOptionsPanel>
  </InputWrap>
);

SigngleSelectView.propTypes = propTypes;
SigngleSelectView.defaultProps = defaultProps;

export default SigngleSelectView;
