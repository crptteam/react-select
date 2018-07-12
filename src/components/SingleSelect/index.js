import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import SingleSelectView from './SingleSelectView/index';
import {
  ON_BLUR_TIMEOUT_MS,
  ON_MOUSE_OUT_TIMEOUT_MS,
} from './constants';

class SingleSelect extends Component {
  static displayName = 'SingleSelect';

  static propTypes = {
    disabled: PropTypes.bool,
    selectedId: PropTypes.number,
    withoutIcon: PropTypes.bool,
    filterDisabled: PropTypes.bool,
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
    onRef: PropTypes.func,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    selectedId: undefined,
    withoutIcon: false,
    filterDisabled: false,
    values: [{ id: 0, title: '' }],
    onRef: () => {},
    onSelect: () => {},
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    const {
      selectedId,
      values,
    } = this.props;

    const isValidId = values.find(item => item.id === selectedId) !== undefined;

    this.defaultState = {
      isOpen: false,
      isFocused: isValidId,
      selectedId: isValidId ? selectedId : null,
      value: isValidId ? values.find(item => item.id === selectedId).title : '',
      editedAfterSelection: false,
    };

    this.state = this.defaultState;
    this.blurTimeout = null;
    this.select = null;
  }

  componentDidMount() {
    const { onRef } = this.props;
    const { selectedId } = this.state;
    if (selectedId !== null && this.select) {
      const option = this.select.querySelector(
        `[value="${selectedId}"]`,
      );
      option.selected = true;
    }
    if (onRef) { onRef(this); }
  }

  componentWillUnmount() {
    const { onRef } = this.props;

    if (onRef) { onRef(undefined); }
    if (this.blurTimeout) { clearTimeout(this.blurTimeout); }
  }

  onChange = (event) => {
    const { onChange } = this.props;
    const { selectedId } = this.state;

    if (onChange) { onChange(event.target.value); }

    this.setState({
      value: event.target.value,
      editedAfterSelection: selectedId !== null,
    });

    if (this.blurTimeout) { clearTimeout(this.blurTimeout); }
  }

  onSelect = (event, value) => {
    this.setState({
      selectedId: value.id,
      isOpen: false,
      isFocused: true,
    }, () => this.updateValue({ isForce: true }));

    if (this.select) {
      try {
        this.select.querySelector(`[value="${value.id}"]`).selected = true;
      } catch (e) {}
    }

    this.props.onSelect(value);
    event.preventDefault();
  }

  onBlur = () => {
    this.blurTimeout = setTimeout(this.closeOptionPanel, ON_BLUR_TIMEOUT_MS);
  }

  onFocus = (event) => {
    const { selectedId } = this.state;

    this.openOptionPanel();

    if (selectedId !== null) { event.target.select(); }
  }

  onKeyPress = () => {
    this.openOptionPanel();
  }

  onClick = (event) => {
    this.openOptionPanel();
    const { disabled } = this.props;
    if (!disabled) { return; }

    event.preventDefault();
    event.stopPropagation();
  }

  onClickRenderWrap = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });

    if (this.blurTimeout) { clearTimeout(this.blurTimeout); }
  }

  onMouseOut = () => {
    if (this.blurTimeout) { clearTimeout(this.blurTimeout); }

    this.blurTimeout = setTimeout(() => {
      this.setState({ isOpen: false });
      this.updateValue();
    }, ON_MOUSE_OUT_TIMEOUT_MS);
  }

  onMouseMove = () => {
    if (this.blurTimeout) { clearTimeout(this.blurTimeout); }
  }

  onRef = (extRef) => { this.select = extRef; };

  updateValue = (props) => {
    const { selectedId, editedAfterSelection } = this.state;
    const { values } = this.props;
    const isValidId = values.find(item => item.id === selectedId) !== undefined;

    let isForce = false;
    if (props !== undefined) {
      isForce = props.isForce ? props.isForce : false;
    }

    if (this.selectedId === null || !isValidId) {
      this.setState({ value: '' });
    } else if (editedAfterSelection || isForce) {
      const value = values.find(item => item.id === selectedId);
      const newValue = value.title || value.value || '';
      this.setState({ value: newValue });
    }
  }

  openOptionPanel = () => {
    this.setState({
      isOpen: true,
      isFocused: true,
    });

    if (this.blurTimeout) { clearTimeout(this.blurTimeout); }
  }

  closeOptionPanel = () => {
    this.setState(oldState => ({
      isOpen: false,
      isFocused: oldState.selectedId !== null,
    }));

    this.updateValue();
  }

  clear() {
    const { onSelect } = this.props;

    this.setState(this.defaultState);
    if (onSelect) { onSelect(null); }
  }

  render() {
    return (
      <SingleSelectView
        {...this.props}
        {...this.state}
        onRef={this.onRef}
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
      />
    );
  }
}

export default withTheme(SingleSelect);
