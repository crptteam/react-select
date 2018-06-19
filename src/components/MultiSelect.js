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
import defaultTheme from "../theme/defaultTheme";

import { BottomArrow, SelectCheckmark } from "../svg";

class MultiSelect extends Component {
  blurTimeout;
  select;

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
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

  clear() {
    this.setState({
      value: "",
      selectedIds: []
    });

    this.props.onSelect && this.props.onSelect([]);
  }

  getFilteredValues(selectedIds, values) {
    return values.filter(v => ~selectedIds.indexOf(v.id));
  }

  onSelect(e, v) {

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
      selectedIds: newSelectedIds
    });

    this.select.querySelector(`option`).selected = false;

    newSelectedIds.forEach(
      id => (this.select.querySelector(`[value="${id}"]`).selected = true)
    );

    this.props.onSelect(this.getFilteredValues(newSelectedIds, this.props.values));

  }

  onBlur(e) {
    this.blurTimeout = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    }, 200);
  }

  renderValues() {
    return this.props.values.map(v => (
      <SelectOption theme={this.props.theme} key={v.id} onClick={e => this.onSelect(e, v)} multi>
        <SelectText truncate={this.props.truncate} multiline={this.props.multiline}>{v.title}</SelectText>
        <SelectedIconWrap>
          {~this.state.selectedIds.indexOf(v.id) ? (
            <SelectCheckmark />
          ) : (
            ""
          )}
        </SelectedIconWrap>
      </SelectOption>
    ));
  }

  onFocus(e) {
    this.setState({
      isOpen: true
    });

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  render() {

    const { theme, onSelect, values, name, onClick, ...otherProps } = this.props;

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
          <InputElem
            noCaret
            value={this.state.value}
            placeholder={this.props.placeholder}
            onFocus={this.onFocus}
            onChange={e => null}
            centered
            theme={theme}
            component="Select"
          />

          <BottomArrow />

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

        <SelectOptionsPanel theme={theme} visible={this.state.isOpen} truncate={this.props.truncate}>
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
  selectedIds: PropTypes.array
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
  ]
};

MultiSelect.displayName = "MultiSelect";

export default withTheme(MultiSelect);
