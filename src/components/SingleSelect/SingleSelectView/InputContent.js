import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputContentWrap from '../../../styled/InputContentWrap';
import InputElem from '../../../styled/InputElem';
import RenderWrap from '../../../styled/RenderWrap';
import Placeholder from '../../../styled/Placeholder';

import { BottomArrow, Search } from '../../../svg';

export default class InputContent extends Component {
  static propTypes = {
    isFocused: PropTypes.bool,
    isError: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    savePlaceholder: PropTypes.bool,
    theme: PropTypes.object,
    renderValue: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.string,
    ]),
    value: PropTypes.string,
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
    selectedId: PropTypes.number,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onClickRenderWrap: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isFocused: false,
    isError: false,
    disabled: false,
    placeholder: '',
    savePlaceholder: false,
    renderValue: undefined,
    selectedId: null,
    values: [],
    value: undefined,
    theme: {},
  };

  onSelectBlocker = (event) => {
    event.stopPropagation();
  }

  render() {
    const {
      isFocused,
      isError,
      disabled,
      placeholder,
      savePlaceholder,
      renderValue: RenderValue,
      selectedId,
      value,
      values,
      onChange,
      onFocus,
      onClickRenderWrap,
      theme,
      ...otherProps
    } = this.props;

    return (
      <InputContentWrap {...otherProps} theme={theme} onSelect={this.onSelectBlocker}>
        <Placeholder
          focused={isFocused}
          disabled={disabled}
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
    );
  }
}
