import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectText from '../../../styled/SelectText';
import InputContentWrap from '../../../styled/InputContentWrap';
import InputElem from '../../../styled/InputElem';
import RenderWrap from '../../../styled/RenderWrap';
import Placeholder from '../../../styled/Placeholder';

import { BottomArrow, Search, Cross } from '../../../svg';

export default class InputContent extends Component {
  static propTypes = {
    isFocused: PropTypes.bool,
    isOpen: PropTypes.bool,
    isError: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    savePlaceholder: PropTypes.bool,
    withoutIcon: PropTypes.bool,
    theme: PropTypes.object,
    renderValue: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.string,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.string,
    ]),
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
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClickRenderWrap: PropTypes.func.isRequired,
    onEnterKey: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    iconPosition: PropTypes.string,
  };

  static defaultProps = {
    isFocused: false,
    isOpen: false,
    isError: false,
    disabled: false,
    placeholder: '',
    savePlaceholder: false,
    withoutIcon: false,
    renderValue: undefined,
    selectedId: null,
    values: [],
    value: undefined,
    theme: {},
    iconPosition: 'right',
  };

  onSelectBlocker = (event) => {
    event.stopPropagation();
  };

  onKeyPress = (e) => {
    if (e.charCode === 13 || e.keyCode === 13 || e.key == 'Enter') {
      this.props.onEnterKey(this.props.value);
    }
  };

  onBlur = () => this.props.onEnterKey(this.props.value);

  renderItem = ({
    item,
    value,
    centered,
    theme,
    disabled,
    truncate,
    multiline,
    RenderValue,
    onClickRenderWrap,
    onChange,
    onClick,
  }) => {
    if (item !== undefined) {
      if (RenderValue) {
        return (
          <RenderWrap onClick={onClickRenderWrap}>
            <RenderValue
              selected={item}
              value={item}
            />
          </RenderWrap>
        );
      }

      const title = item.titleText ? item.titleText : item.title;
      if ((typeof title) === 'function') {
        const Item = title;
        return (
          <RenderWrap onClick={onClickRenderWrap}>
            <Item />
          </RenderWrap>
        );
      }

      if (typeof (title) === 'object') {
        return (
          <RenderWrap onClick={onClickRenderWrap}>
            <SelectText truncate={truncate} multiline={multiline}>
              {title}
            </SelectText>
          </RenderWrap>
        );
      }
    }

    return (
      <InputElem
        value={value}
        centered={centered}
        theme={theme}
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        onKeyPress={this.onKeyPress}
        onBlur={this.onBlur}
      />
    );
  };

  renderIcon = (marginRight) => {
    const { value, isFocused, withoutIcon, onClear } = this.props;

    if (withoutIcon) return (null);

    if (value) return <Cross style={{marginRight}} onClick={onClear} />;
    if (!value && isFocused) return <Search style={{marginRight}} />;
    return <BottomArrow style={{marginRight}} />;
  };

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
      truncate,
      multiline,
      onChange,
      onClick,
      onClickRenderWrap,
      theme,
      iconPosition,
      ...otherProps
    } = this.props;

    return (
      <InputContentWrap {...otherProps} theme={theme} onSelect={this.onSelectBlocker}>
        {iconPosition == 'left' && this.renderIcon(16)}
        <Placeholder
          focused={isFocused}
          disabled={disabled}
          isError={isError}
          theme={theme}
          isSaved={savePlaceholder}
          left={iconPosition == 'left' ? 26 : 0}
        >
          {placeholder}
        </Placeholder>

        {this.renderItem({
          item: values.find(item => item.id === selectedId),
          value,
          centered: !savePlaceholder,
          theme,
          disabled,
          truncate,
          multiline,
          RenderValue,
          onClickRenderWrap,
          onChange,
          onClick,
        })}

        {iconPosition == 'right' && this.renderIcon()}
      </InputContentWrap>
    );
  }
}
