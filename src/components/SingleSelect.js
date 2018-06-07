import React, { Component } from "react";
import PropTypes from "prop-types";

import InputWrap from "../styled/InputWrap";
import InputContentWrap from "../styled/InputContentWrap";
import InputElem from "../styled/InputElem";
import RenderWrap from "../styled/RenderWrap";
import SelectOptionsPanel from "../styled/SelectOptionsPanel";
import SelectOption from "../styled/SelectOption";
import InvisibleSelect from "../styled/InvisibleSelect";
import defaultTheme from "../theme/defaultTheme";

import { BottomArrow } from "../svg";
import MultiSelect from "./MultiSelect";

class SingleSelect extends Component {
  blurTimeout;

  select;

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedId: this.props.selectedId !== undefined ? this.props.selectedId : null,
      value: this.props.selectedId
        ? this.props.values.find(v => v.id === this.props.selectedId).title
        : "",
      editedAfterSelection: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickRenderWrap = this.onClickRenderWrap.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    if (this.state.selectedId !== null && this.select) {
      const option = this.select.querySelector(
        `[value="${this.state.selectedId}"]`
      );
      option.selected = true;
    }
    this.props.onRef && this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef && this.props.onRef(undefined);
  }

  clear() {
    this.setState({
      value: "",
      selectedId: null
    });

    this.props.onSelect && this.props.onSelect(null);
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
      editedAfterSelection: this.state.selectedId !== null ? true : false
    });

    console.log("wtf?", e.target.value);

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  onSelect(e, v) {
    this.setState({
      selectedId: v.id,
      value: v.value ? v.value : v.title,
      isOpen: false
    });

    if (this.select) {
      this.select.querySelector(`[value="${v.id}"]`).selected = true;
    }

    this.props.onSelect(v);

    e.preventDefault();
  }

  onBlur(e) {
    this.blurTimeout = setTimeout(() => {
      this.setState({
        isOpen: false
      });

      if (this.state.selectedId !== null && this.state.editedAfterSelection) {
        this.setState({
          value: this.props.values.find(v => v.id === this.state.selectedId)
            .title
        });
      }

      if (this.state.selectedId === null) {
        this.setState({
          value: ""
        });
      }
    }, 200);
  }

  renderValues() {
    const filtered = this.props.values.filter(
      v =>
        this.state.selectedId !== null && !this.state.editedAfterSelection
          ? true
          : v.filterString
            ? ~v.filterString
                .toLocaleLowerCase()
                .indexOf(this.state.value.toLocaleLowerCase())
            : ~v.title
                .toLocaleLowerCase()
                .indexOf(this.state.value.toLocaleLowerCase())
    );

    const RenderOption = this.props.renderOption;

    return filtered.length ? (
      filtered.map(v => (
        <SelectOption
          key={v.id}
          theme={this.props.theme}
          onClick={e => this.onSelect(e, v)}
        >
          {RenderOption ? <RenderOption value={v} /> : v.title}
        </SelectOption>
      ))
    ) : (
      <SelectOption>&lt;пусто&gt;</SelectOption>
    );
  }

  onFocus(e) {
    this.setState({
      isOpen: true
    });

    if (this.blurTimeout) clearTimeout(this.blurTimeout);

    if (this.state.selectedId !== null) {
      e.target.select();
    }
  }

  onClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  onClickRenderWrap(e) {
    this.setState({
      isOpen: !this.state.isOpen
    });

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  onMouseOut(e) {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);

    this.blurTimeout = setTimeout(() => {
      this.setState({
        isOpen: false
      });

      if (this.state.selectedId !== null && this.state.editedAfterSelection) {
        this.setState({
          value: this.props.values.find(v => v.id === this.state.selectedId)
            .title
        });
      }

      if (this.state.selectedId === null) {
        this.setState({
          value: ""
        });
      }
    }, 1000);
  }

  onMouseMove(e) {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);

  }

  render() {
    const theme = this.props.theme;

    const { onSelect, name, values, renderValue, renderOption, ...otherProps } = this.props;

    const Value = renderValue;

    return (
      <InputWrap
        inline={this.props.inline === false ? this.props.inline : true}
        {...otherProps}
        onBlur={this.onBlur}
        theme={theme}
        onMouseOut={this.onMouseOut}
        onMouseMove={this.onMouseMove}
      >
        <InputContentWrap {...otherProps} theme={theme}>
          {Value && this.state.selectedId !== null ? (
            <RenderWrap onClick={this.onClickRenderWrap}>
              <Value
                selected={this.props.values.find(
                  v => v.id == this.state.selectedId
                )}
              />
            </RenderWrap>
          ) : (
            <InputElem
              value={this.state.value}
              onChange={this.onChange}
              placeholder={this.props.placeholder}
              onFocus={this.onFocus}
              centered
              theme={theme}
              disabled={this.props.disabled}
            />
          )}

          <BottomArrow />
        </InputContentWrap>

        <InvisibleSelect name={name} innerRef={el => (this.select = el)}>
          {values.map((v, i) => (
            <option key={i} value={v.id}>
              {v.value ? v.value : v.title}
            </option>
          ))}
        </InvisibleSelect>

        <SelectOptionsPanel theme={theme} visible={this.state.isOpen}>
          {this.renderValues()}
        </SelectOptionsPanel>
      </InputWrap>
    );
  }
}

SingleSelect.propTypes = {
  theme: PropTypes.object,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  values: PropTypes.array.isRequired,
  selectedId: PropTypes.number,
  renderValue: PropTypes.oneOfType([ PropTypes.element, PropTypes.func ]),
  renderOption: PropTypes.oneOfType([ PropTypes.element, PropTypes.func ])
};

SingleSelect.defaultProps = {
  disabled: false,
  onSelect: val => null,
  placeholder: "",
  values: [
    {
      id: 1,
      title: "default"
    }
  ]
};

SingleSelect.displayName = "SingleSelect";

export default SingleSelect;
