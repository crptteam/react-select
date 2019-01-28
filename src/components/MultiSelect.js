import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";
import { ResizeObserver } from "resize-observer";

import InputWrap from "../styled/InputWrap";
import InputContentWrap from "../styled/InputContentWrap";
import InputElem from "../styled/InputElem";
import SelectOptionsPanel from "../styled/SelectOptionsPanel";
import SelectOption from "../styled/SelectOption";
import SelectText from "../styled/SelectText";
import InvisibleSelect from "../styled/InvisibleSelect";
import SelectedIconWrap from "../styled/SelectedIconWrap";
import Placeholder from "../styled/Placeholder";

import { BottomArrow, SelectCheckmark, Search } from "../svg";
import SelectOptionsPointer from "../styled/SelectOptionsPointer";
import Cross from "../svg/cross.svg";
import PanelWrap from "../styled/PanelWrap";
import OptionsPointer from "../styled/OptionsPointer";
import PointerHelper from "../styled/PointerHelper";

class MultiSelect extends Component {
  blurTimeout;
  select;
  open;
  container;

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isFocused:
        (this.props.selectedIds && !!this.props.selectedIds.length) || false,
      value:
        this.props.selectedIds && this.props.values
          ? this.getFilteredValues(this.props.selectedIds, this.props.values)
              .map(v => v.title)
              .join("; ")
          : "",
      selectedIds: this.props.selectedIds ? this.props.selectedIds.slice() : [],
      top: null,
      filterValue: null
    };

    this.ro = new ResizeObserver(elems => {
      try {
        const height = elems[0].contentRect.height;
        this.setState({ top: height - 2 + "px" });
      } catch (e) {}
    });

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

  handleClick = e => {
    console.log("this.container", this.container);
    if (this.container.contains(e.target)) return;

    if (this.state.isOpen) {
      this.setState({
        isOpen: false
      });
    }
  };

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentDidMount() {
    if (this.select && this.state.selectedIds.length) {
      this.state.selectedIds.forEach(
        id => (this.select.querySelector(`[value="${id}"]`).selected = true)
      );
    }
    this.props.onRef && this.props.onRef(this);
    this.setState({ top: this.container.clientHeight - 2 + "px" });
    this.ro.observe(this.container);
  }

  componentWillUnmount() {
    this.props.onRef && this.props.onRef(undefined);
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  clear = () => {
    this.setState({
      value: "",
      selectedIds: [],
      isFocused: false
    });

    this.props.onSelect && this.props.onSelect([]);
  };

  getFilteredValues(selectedIds, values) {
    return values.filter(v => ~selectedIds.indexOf(v.id));
  }

  onFilter = value => {
    this.setState({
      filterValue: value ? value : null
    });
  };

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
      isFocused: !!newSelectedIds.length
    });

    this.select.querySelector(`option`).selected = false;

    newSelectedIds.forEach(
      id => (this.select.querySelector(`[value="${id}"]`).selected = true)
    );

    this.props.onSelect(
      this.getFilteredValues(newSelectedIds, this.props.values)
    );
  }

  onBlur(e) {
    console.log("onBlur");
    this.blurTimeout = setTimeout(() => {
      this.setState(oldState => ({
        isOpen: false,
        isFocused: !!oldState.selectedIds.length
      }));
      if (this.open) {
        this.open = false;
        this.props.onTogglePanel(false);
      }
    }, 200);
  }

  renderValues() {
    const { values, noValuesText, RenderOption } = this.props;

    const filtered = values.filter(
      v =>
        this.state.filterValue
          ? ~v.title
              .toLocaleLowerCase()
              .indexOf(this.state.filterValue.toLocaleLowerCase())
          : true
    );

    return filtered.length ? (
      filtered.map(
        v =>
          RenderOption ? (
            <RenderOption
              key={v.id}
              onSelect={this.onSelect}
              value={v}
              active={!!~this.state.selectedIds.indexOf(v.id)}
            />
          ) : (
            <SelectOption
              theme={this.props.theme}
              key={v.id}
              disabled={v.disabled}
              onClick={e => this.onSelect(e, v)}
              multi
            >
              <SelectText
                truncate={this.props.truncate}
                multiline={this.props.multiline}
              >
                {v.title}
              </SelectText>
              <SelectedIconWrap>
                {~this.state.selectedIds.indexOf(v.id) ? (
                  <SelectCheckmark />
                ) : (
                  ""
                )}
              </SelectedIconWrap>
            </SelectOption>
          )
      )
    ) : (
      <SelectOption>{noValuesText}</SelectOption>
    );
  }

  onFocus(e) {
    console.log("onFocus");
    this.setState({
      isOpen: true
    });

    if (!this.open) {
      this.open = true;
      this.props.onTogglePanel(true);
    }

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  onRemoveSelectedValue = id => {
    const selectedIds = this.state.selectedIds.filter(v => v !== id);
    this.setState({
      selectedIds
    });
  };

  renderIcon = marginRight => {
    const { withoutIcon } = this.props;
    const { isFocused, value, isOpen } = this.state;

    if (withoutIcon) return null;

    if (value && !isOpen)
      return <Cross style={{ marginRight }} onClick={this.clear} />;
    if (!value && isFocused) return <Search style={{ marginRight }} />;
    return <BottomArrow style={{ marginRight }} />;
  };

  render() {
    const {
      theme,
      onSelect,
      values,
      name,
      onClick,
      iconPosition = "right",
      showPointer,
      RenderValues,
      ...otherProps
    } = this.props;

    const panelMargin = showPointer ? "15px" : undefined;

    return (
      <InputWrap
        inline={this.props.inline === false ? this.props.inline : true}
        onBlur={this.onBlur}
        onClick={this.onClick}
        theme={theme}
        isOpen={this.state.isOpen}
        innerRef={el => (this.container = el)}
        component="Select"
      >
        <InputContentWrap {...otherProps}>
          {iconPosition == "left" && this.renderIcon(16)}
          <Placeholder
            focused={this.state.isFocused}
            dispabled={this.props.disabled}
            isError={this.props.isError}
            theme={this.props.theme}
            isSaved={this.props.savePlaceholder}
            left={iconPosition == "left" ? 26 : 0}
          >
            {this.props.placeholder}
          </Placeholder>
          {RenderValues ? (
            <RenderValues
              container={this.container}
              onFocus={this.onFocus}
              value={this.state.value}
              selectedIds={this.state.selectedIds}
              values={values}
              onRemove={this.onRemoveSelectedValue}
              onFilter={this.onFilter}
              theme={theme}
            />
          ) : (
            <InputElem
              noCaret
              value={this.state.value}
              onFocus={this.onFocus}
              onChange={e => null}
              centered={!this.props.savePlaceholder}
              theme={theme}
              component="Select"
            />
          )}
          {iconPosition == "right" && this.renderIcon()}
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

        <PanelWrap
          isOpen={this.state.isOpen}
          top={this.state.top}
          truncate={otherProps.truncate}
          innerRef={el => {
            this.optionsPanel = el;
          }}
          visible={this.state.isOpen}
        >
          {showPointer && <OptionsPointer theme={theme} />}

          <SelectOptionsPanel
            theme={theme}
            isOpen={this.state.isOpen}
            visible={this.state.isOpen}
            truncate={this.props.truncate}
            marginTop={panelMargin}
          >
            {this.renderValues()}
          </SelectOptionsPanel>
          {showPointer && (
            <PointerHelper marginTop={showPointer ? "15px" : undefined} />
          )}
        </PanelWrap>
      </InputWrap>
    );
  }
}

MultiSelect.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  values: PropTypes.array.isRequired,
  selectedIds: PropTypes.array,
  iconPosition: PropTypes.string,
  showPointer: PropTypes.bool,
  noValuesText: PropTypes.string,
  onTogglePanel: PropTypes.func,
  inline: PropTypes.bool.isRequired
};

MultiSelect.defaultProps = {
  disabled: false,
  onSelect: val => null,
  placeholder: "",
  selectedIds: null,
  values: [
    {
      id: 1,
      title: ""
    }
  ],
  iconPosition: "right",
  showPointer: false,
  noValuesText: "<пусто>",
  onTogglePanel: () => {},
  inline: false
};

MultiSelect.displayName = "MultiSelect";

export default withTheme(MultiSelect);
