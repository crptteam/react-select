import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import SelectOption from '../../styled/SelectOption';
import SelectText from '../../styled/SelectText';
import SingleSelectView from './SingleSelectView';
import {
  ON_BLUR_TIMEOUT_MS,
  ON_MOUSE_OUT_TIMEOUT_MS,
} from './constants';

class SingleSelect extends Component {
  select;

  static displayName = 'SingleSelect';

  static propTypes = {
    isLoading: PropTypes.bool,
    truncate: PropTypes.bool,
    multiline: PropTypes.bool,
    disabled: PropTypes.bool,
    theme: PropTypes.object,
    values: PropTypes.array,
    selectedId: PropTypes.number,
    renderValue: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    renderOption: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    onRef: PropTypes.func,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    isLoading: false,
    truncate: false,
    multiline: false,
    disabled: false,
    placeholder: '',
    values: [{ id: 0, title: '' }],
  };

  constructor(props) {
    super(props);

    const {
      selectedId,
      values,
    } = this.props;

    this.defaultState = {
      isOpen: false,
      isFocused: selectedId !== undefined,
      selectedId: selectedId !== undefined ? selectedId : null,
      value: selectedId ? values.find(v => v.id === selectedId).title : '',
      editedAfterSelection: false,
    };

    this.state = this.defaultState;
    this.blurTimeout = undefined;
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

  clear() {
    const { onSelect } = this.props;

    this.setState(this.defaultState);

    if (onSelect) {
      onSelect(null);
    }
  }

  onChange = (event) => {
    const { onChange } = this.props;
    const { selectedId } = this.state;

    if (onChange) {
      onChange(event.target.value);
    }

    this.setState({
      value: event.target.value,
      editedAfterSelection: selectedId !== null,
    });

    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
  }

  onSelect = (event, value) => {
    this.setState({
      selectedId: value.id,
      value: value.value ? value.value : value.title,
      isOpen: false,
      isFocused: true,
    });

    if (this.select) {
      try {
        this.select.querySelector(`[value="${value.id}"]`).selected = true;
      } catch (e) {}
    }

    this.props.onSelect(value);

    event.preventDefault();
  }

  onBlur = () => {
    this.blurTimeout = setTimeout(() => {
      const { selectedId, editedAfterSelection } = this.state;
      const { values } = this.props;

      this.setState(oldState => ({
        isOpen: false,
        isFocused: oldState.selectedId !== null,
      }));

      if (selectedId !== null && editedAfterSelection) {
        this.setState({
          value: values.find(item => item.id === selectedId).title,
        });
      }

      if (selectedId === null) {
        this.setState({
          value: '',
        });
      }
    }, ON_BLUR_TIMEOUT_MS);
  }

  onFocus = (event) => {
    const { selectedId } = this.state;

    this.setState({
      isOpen: true,
      isFocused: true,
    });

    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }

    if (selectedId !== null) {
      event.target.select();
    }
  }

  onClick = (event) => {
    const { disabled } = this.props;
    if (!disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }

  onClickRenderWrap = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });

    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
  }

  onMouseOut = () => {
    const { selectedId, editedAfterSelection } = this.state;
    const { values } = this.props;
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }

    this.blurTimeout = setTimeout(() => {
      this.setState({ isOpen: false });

      if (selectedId !== null && editedAfterSelection) {
        this.setState({ value: values.find(item => item.id === selectedId).title });
      }

      if (selectedId === null) {
        this.setState({ value: '' });
      }
    }, ON_MOUSE_OUT_TIMEOUT_MS);
  }

  onMouseMove = () => {
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
  }

  renderValues = () => {
    const {
      isLoading,
      values,
      renderOption: RenderOption,
      theme,
      truncate,
      multiline,
    } = this.props;
    const { value, selectedId, editedAfterSelection } = this.state;

    if (isLoading) {
      return null;
    }

    const filtered = values.filter(
      item => (
        selectedId !== null && !editedAfterSelection
          ? true
          : item.filterString
            ? ~item.filterString
                .toLocaleLowerCase()
                .indexOf(value.toLocaleLowerCase())
            : ~item.title
                .toLocaleLowerCase()
                .indexOf(value.toLocaleLowerCase())
      )
    );

    return filtered.length ? (
      filtered.map((v, i) => (
        <SelectOption
          key={i}
          theme={theme}
          custom={!!RenderOption}
          onClick={e => this.onSelect(e, v)}
        >
          {RenderOption
            ? <RenderOption value={v} />
            : (
              <SelectText truncate={truncate} multiline={multiline}>
                {v.title}
              </SelectText>
            )
          }
        </SelectOption>
      ))
    ) : (
      <SelectOption>
        &lt;пусто&gt;
      </SelectOption>
    );
  }

  render() {
    return (
      <SingleSelectView
        select={this.select}
        renderValues={this.renderValues}
        onChange={this.onChange}
        onSelect={this.onSelect}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClick={this.onClick}
        onClickRenderWrap={this.onClickRenderWrap}
        onMouseOut={this.onMouseOut}
        onMouseMove={this.onMouseMove}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default withTheme(SingleSelect);
