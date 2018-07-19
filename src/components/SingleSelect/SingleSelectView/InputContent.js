import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectText from '../../../styled/SelectText';
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
  };

  static defaultProps = {
    isFocused: false,
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
  };

  onSelectBlocker = (event) => {
    event.stopPropagation();
  }

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
      />
    );
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
      withoutIcon,
      value,
      values,
      truncate,
      multiline,
      onChange,
      onClick,
      onClickRenderWrap,
      theme,
      ...otherProps
    } = this.props;

    const DrawIcon = isFocused ? <Search /> : <BottomArrow />;

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

        {withoutIcon ? null : DrawIcon }
      </InputContentWrap>
    );
  }
}
