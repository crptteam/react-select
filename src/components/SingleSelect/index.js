import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";

import SingleSelectView from "./SingleSelectView/index";
import { calcDefaultStateFromProps } from "./SingleSelectStaff";
import { ON_BLUR_TIMEOUT_MS, ON_MOUSE_OUT_TIMEOUT_MS } from "./constants";

class SingleSelect extends Component {
  static displayName = "SingleSelect";

  static propTypes = {
    disabled: PropTypes.bool,
    selectedId: PropTypes.number,
    selectedIdOnClear: PropTypes.number,
    withoutIcon: PropTypes.bool,
    filterDisabled: PropTypes.bool,
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
    onRef: PropTypes.func,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    onEnterKey: PropTypes.func,
    onTogglePanel: PropTypes.func
  };

  static defaultProps = {
    disabled: false,
    selectedId: undefined,
    withoutIcon: false,
    filterDisabled: false,
    values: [{ id: 0, title: "" }],
    onRef: () => {},
    onSelect: () => {},
    onChange: () => {},
    onEnterKey: () => {},
    onTogglePanel: () => {}
  };

  static getDerivedStateFromProps(props, state) {
    if (state === undefined) {
      return null;
    }
    if (props.selectedId === undefined && state.defaultSelectedId === null) {
      return null;
    }
    if (props.selectedId !== state.defaultSelectedId) {
      return calcDefaultStateFromProps(props);
    }
    return null;
  }

  open;

  constructor(props) {
    super(props);
    this.defaultState = calcDefaultStateFromProps(props);
    this.state = this.defaultState;
    this.blurTimeout = null;
    this.select = null;
  }

  componentDidMount() {
    const { onRef } = this.props;
    const { selectedId } = this.state;
    if (selectedId !== null && this.select) {
      const option = this.select.querySelector(`[value="${selectedId}"]`);
      option.selected = true;
    }
    if (onRef) {
      onRef(this);
    }
  }

  componentWillUnmount() {
    const { onRef } = this.props;

    if (onRef) {
      onRef(undefined);
    }
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
  }

  onChange = event => {
    const { onChange, onSelect } = this.props;

    if (onChange) {
      onChange(event.target.value);
    }

    this.setState({ value: event.target.value });
    this.setState(newState => ({
      selectedId: newState.value === "" ? null : newState.selectedId,
      editedAfterSelection: newState.value !== ""
    }));

    if (event.target.value === "") {
      onSelect(null);
    }
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
  };

  onSelect = (event, value) => {
    const { onSelect, onTogglePanel } = this.props;
    if (value.disabled) return;

    this.setState(
      {
        selectedId: value.id,
        isOpen: false,
        isFocused: true
      },
      () => {
        if (this.open) {
          this.open = false;
          onTogglePanel(false);
        }

        this.updateValue({ isForce: true });
      }
    );

    if (this.select) {
      try {
        this.select.querySelector(`[value="${value.id}"]`).selected = true;
      } catch (e) {}
    }

    onSelect(value);
    event.preventDefault();
  };

  onBlur = () => {
    this.blurTimeout = setTimeout(this.closeOptionPanel, ON_BLUR_TIMEOUT_MS);
  };

  onFocus = event => {
    const { selectedId } = this.state;

    this.openOptionPanel();

    if (selectedId !== null) {
      event.target.select();
    }
  };

  onKeyPress = () => {
    this.openOptionPanel();
  };

  onClick = event => {
    this.openOptionPanel();
    const { disabled } = this.props;
    if (!disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  };

  onClickRenderWrap = () => {
    const { onTogglePanel } = this.props;
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });

    if (this.open !== !isOpen) {
      this.open = !isOpen;
      onTogglePanel(!isOpen);
    }

    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
  };

  onMouseOut = () => {
    const { onTogglePanel } = this.props;
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }

    this.blurTimeout = setTimeout(() => {
      this.setState({ isOpen: false });

      if (this.open) {
        this.open = false;
        onTogglePanel(false);
      }
      this.updateValue();
    }, ON_MOUSE_OUT_TIMEOUT_MS);
  };

  onMouseMove = () => {
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
  };

  onRef = extRef => {
    this.select = extRef;
  };

  onOptionsRef = extRef => {
    this.optionsPanel = extRef;
  };

  updateValue = props => {
    const { selectedId, editedAfterSelection } = this.state;
    const { values } = this.props;
    const isValidId = values.find(item => item.id === selectedId) !== undefined;

    let isForce = false;
    if (props !== undefined) {
      isForce = props.isForce ? props.isForce : false;
    }

    if (selectedId === null || !isValidId) {
      this.setState({ value: "" });
    } else if (editedAfterSelection || isForce) {
      const value = values.find(item => item.id === selectedId);
      const newValue = value.title || value.value || "";
      this.setState({ value: newValue });
    }
  };

  openOptionPanel = () => {
    const { onTogglePanel } = this.props;
    this.setState({
      isOpen: true,
      isFocused: true
    });

    if (!this.open) {
      this.open = true;
      onTogglePanel(true);
    }

    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
  };

  closeOptionPanel = () => {
    const { onTogglePanel } = this.props;
    this.setState(oldState => ({
      isOpen: false,
      isFocused: oldState.selectedId !== null
    }));

    if (this.open) {
      this.open = false;
      onTogglePanel(false);
    }

    this.updateValue();
  };

  clear = () => {
    const { onSelect, onTogglePanel, selectedIdOnClear } = this.props;

    this.setState({
      value: "",
      selectedId: selectedIdOnClear !== undefined ? selectedIdOnClear : null,
      isOpen: false,
      isFocused: false
    });

    if (this.open) {
      this.open = false;
      onTogglePanel(false);
    }

    if (onSelect) {
      if (selectedIdOnClear !== undefined) {
        try {
          const value = this.props.values[selectedIdOnClear];
          onSelect(value);
        } catch (e) {}
      } else {
        onSelect(null);
      }
    }
  };

  render() {
    return (
      <SingleSelectView
        {...this.props}
        {...this.state}
        isOpen={this.state.isOpen}
        onRef={this.onRef}
        onOptionsRef={this.onOptionsRef}
        renderValues={this.renderValues}
        onChange={this.onChange}
        onSelect={this.onSelect}
        onFocus={this.onFocus}
        onKeyPress={this.onKeyPress}
        onBlur={this.onBlur}
        onClick={this.onClick}
        onClickRenderWrap={this.onClickRenderWrap}
        onMouseOut={this.onMouseOut}
        onMouseMove={this.onMouseMove}
        onClear={this.clear}
      />
    );
  }
}

export default withTheme(SingleSelect);
