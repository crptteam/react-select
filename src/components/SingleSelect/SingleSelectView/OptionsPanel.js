import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectOption from '../../../styled/SelectOption';
import SelectText from '../../../styled/SelectText';
import SelectOptionsPanel from '../../../styled/SelectOptionsPanel';
import DefaultLoading from '../../../styled/DefaultLoading';

export default class OptionsPanel extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    hideOptionsPanel: PropTypes.bool,
    isLoading: PropTypes.bool,
    truncate: PropTypes.bool,
    multiline: PropTypes.bool,
    editedAfterSelection: PropTypes.bool,
    filterDisable: PropTypes.bool,
    selectedId: PropTypes.number,
    renderOption: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
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
    ).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.string,
    ]),
    theme: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
    showPointer: PropTypes.bool,
    noValuesText: PropTypes.string,
  };

  static defaultProps = {
    isOpen: false,
    hideOptionsPanel: false,
    isLoading: false,
    truncate: false,
    multiline: false,
    editedAfterSelection: false,
    filterDisable: false,
    selectedId: null,
    value: null,
    renderOption: undefined,
    theme: {},
    showPointer: false,
    noValuesText: '<пусто>'
  };

  isFiltered = ({ item, value }) => {
    const filteredString = item.filterString
      ? item.filterString
      : (item.title && typeof item.title === 'string')
        ? item.title
        : value;
    if (typeof(filteredString) === 'string') {
      return (filteredString.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1);
    }

    return false;
  };

  renderItem = ({
    item,
    RenderOption,
    truncate,
    multiline,
  }) => {
    if (RenderOption) {
      return (<RenderOption value={item} />);
    }

    const title = item.titleOption ? item.titleOption : item.title;
    if ((typeof title) === 'function') {
      const Item = title;
      return <Item />;
    }

    return (
      <SelectText truncate={truncate} multiline={multiline}>
        {title}
      </SelectText>
    );
  };

  renderValues = () => {
    const {
      isLoading,
      value,
      values,
      selectedId,
      editedAfterSelection,
      filterDisable,
      renderOption: RenderOption,
      theme,
      truncate,
      multiline,
      onSelect,
      noValuesText,
    } = this.props;

    if (isLoading) {
      return null;
    }

    let filtered = [...values];
    if (!filterDisable
      && !(selectedId !== null && !editedAfterSelection)) {
      filtered = values.filter(item => this.isFiltered({ item, value }));
    }

    return filtered.length ? (
      filtered.map((item, k) => (
        <SelectOption
          key={`Key${k}${item.id}`}
          theme={theme}
          disabled={item.disabled}
          custom
          onClick={event => onSelect(event, item)}
        >
          {this.renderItem({
            truncate,
            multiline,
            item,
            RenderOption,
          })}
        </SelectOption>
      ))
    ) : (
      <SelectOption>
        {noValuesText}
      </SelectOption>
    );
  };

  render() {
    const {
      isLoading,
      theme,
      isOpen,
      hideOptionsPanel,
      truncate,
      showPointer,
    } = this.props;

    const panelMargin = showPointer ? '15px' : undefined;

    return (
      <SelectOptionsPanel
        isOpen={isOpen}
        theme={theme}
        visible={!hideOptionsPanel}
        truncate={truncate}
        marginTop={panelMargin}
      >
        {isLoading ? (
          <DefaultLoading>
            Загрузка...
          </DefaultLoading>
        ) : (
          this.renderValues()
        )}
      </SelectOptionsPanel>
    );
  }
}
