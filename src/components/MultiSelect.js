import React, { Component } from "react";
import PropTypes from "prop-types";
import {withTheme} from "styled-components";

import InputWrap from "../styled/InputWrap";
import InputContentWrap from "../styled/InputContentWrap";
import InputElem from "../styled/InputElem";
import SelectOptionsPanel from "../styled/SelectOptionsPanel";
import SelectOption from "../styled/SelectOption";
import SelectText from "../styled/SelectText";
import InvisibleSelect from "../styled/InvisibleSelect";
import SelectedIconWrap from "../styled/SelectedIconWrap";
import Placeholder from "../styled/Placeholder";
import defaultTheme from "../theme/defaultTheme";

import { BottomArrow, SelectCheckmark, Search } from "../svg";
import SelectOptionsPointer from '../styled/SelectOptionsPointer';
import Cross from '../svg/cross.svg';

class MultiSelect extends Component {
  blurTimeout;
  select;
  open;

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isFocused: this.props.selectedIds && !!this.props.selectedIds.length || false,
      value:
        this.props.selectedIds && this.props.values
          ? this.getFilteredValues(this.props.selectedIds, this.props.values)
              .map(v => v.title)
              .join("; ")
          : "",
      selectedIds: this.props.selectedIds ? this.props.selectedIds.slice() : []
    };

    this.onSelect = this.onSelect.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  componentDidMount() {
    if (this.select && this.state.selectedIds.length) {
      this.state.selectedIds.forEach(
        id => (this.select.querySelector(`[value="${id}"]`).selected = true)
      );
    }
    this.props.onRef && this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef && this.props.onRef(undefined);
  }

  clear = () => {
    this.setState({
      value: "",
      selectedIds: [],
      isFocused: false,
    });

    this.props.onSelect && this.props.onSelect([]);
  };

  getFilteredValues(selectedIds, values) {
    return values.filter(v => ~selectedIds.indexOf(v.id));
  }

  onSelect(e, v) {
    if (v.disabled) return;

    const newSelectedIds = ~this.state.selectedIds.indexOf(v.id)
      ? [
          ...this.state.selectedIds.slice(
            0,
            this.state.selectedIds.indexOf(v.id)
          ),
          ...this.state.selectedIds.slice(
            this.state.selectedIds.indexOf(v.id) + 1
          )
        ]
      : this.state.selectedIds.slice().concat([v.id]);


    const value = this.getFilteredValues(newSelectedIds, this.props.values)
      .map(v => v.title)
      .join("; ");

    this.setState({
      value,
      selectedIds: newSelectedIds,
      isFocused: !!newSelectedIds.length,
    });

    this.select.querySelector(`option`).selected = false;

    newSelectedIds.forEach(
      id => (this.select.querySelector(`[value="${id}"]`).selected = true)
    );

    this.props.onSelect(this.getFilteredValues(newSelectedIds, this.props.values));

  }

  onBlur(e) {
    this.blurTimeout = setTimeout(() => {
      this.setState(oldState => ({
        isOpen: false,
        isFocused: !!oldState.selectedIds.length,
      }));
      if (this.open) {
        this.open = false;
        this.props.onTogglePanel(false);
      }
    }, 200);
  }

  renderValues() {
    const { values, noValuesText } = this.props;
    return values.length
      ? values.map(v =>
          <SelectOption
            theme={this.props.theme}
            key={v.id}
            disabled={v.disabled}
            onClick={e => this.onSelect(e, v)}
            multi
          >
            <SelectText truncate={this.props.truncate} multiline={this.props.multiline}>{v.title}</SelectText>
            <SelectedIconWrap>
              {~this.state.selectedIds.indexOf(v.id) ? (
                <SelectCheckmark />
              ) : (
                ""
              )}
            </SelectedIconWrap>
          </SelectOption>
        )
      : (
        <SelectOption>
          {noValuesText}
        </SelectOption>
      )
  }

  onFocus(e) {
    this.setState({
      isOpen: true
    });

    if (!this.open) {
      this.open = true;
      this.props.onTogglePanel(true);
    }

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  renderIcon = (marginRight) => {
    const { withoutIcon } = this.props;
    const { isFocused, value, isOpen } = this.state;

    if (withoutIcon) return (null);

    if (value && !isOpen) return <Cross style={{marginRight}} onClick={this.clear} />;
    if (!value && isFocused) return <Search style={{marginRight}} />;
    return <BottomArrow style={{marginRight}} />;
  };

  render() {

    const {
      theme,
      onSelect,
      values,
      name,
      onClick,
      iconPosition = 'right',
      showPointer,
      ...otherProps
    } = this.props;

    const panelMargin = showPointer ? '15px' : undefined;

    return (
      <InputWrap
        inline={this.props.inline === false ? this.props.inline : true}
        {...otherProps}
        onBlur={this.onBlur}
        onClick={this.onClick}
        theme={theme}
        component="Select"
      >
        <InputContentWrap {...otherProps}>
          {iconPosition == 'left' && (this.renderIcon(16))}
          <Placeholder
            focused={this.state.isFocused}
            dispabled={this.props.disabled}
            isError={this.props.isError}
            theme={this.props.theme}
            isSaved={this.props.savePlaceholder}
            left={iconPosition == 'left' ? 26 : 0}
          >
            {this.props.placeholder}
          </Placeholder>
          <InputElem
            noCaret
            value={this.state.value}
            onFocus={this.onFocus}
            onChange={e => null}
            centered={!this.props.savePlaceholder}
            theme={theme}
            component="Select"
          />
          {iconPosition == 'right' && (this.renderIcon())}
        </InputContentWrap>

        <InvisibleSelect
          name={name}
          innerRef={el => (this.select = el)}
          multiple="multiple"
        >
          {values.map((v, i) => (
            <option key={i} value={v.id}>
              {v.title}
            </option>
          ))}
        </InvisibleSelect>

        <SelectOptionsPanel
          theme={theme}
          innerRef={el => { this.optionsPanel = el; }}
          visible={this.state.isOpen}
          truncate={this.props.truncate}
          marginTop={panelMargin}
        >
          {showPointer && <SelectOptionsPointer />}
          {this.renderValues()}
        </SelectOptionsPanel>

      </InputWrap>
    );
  }
}

MultiSelect.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  values: PropTypes.array.isRequired,
  selectedIds: PropTypes.array,
  iconPosition: PropTypes.string,
  showPointer: PropTypes.bool,
  noValuesText: PropTypes.string,
  onTogglePanel: PropTypes.func,
};

MultiSelect.defaultProps = {
  disabled: false,
  theme: defaultTheme,
  onSelect: val => null,
  placeholder: "",
  selectedIds: null,
  values: [
    {
      id: 1,
      title: "",
    }
  ],
  iconPosition: 'right',
  showPointer: false,
  noValuesText: '<пусто>',
  onTogglePanel: () => {},
};

MultiSelect.displayName = "MultiSelect";

export default withTheme(MultiSelect);
