import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectOption from '../../../styled/SelectOption';
import SelectText from '../../../styled/SelectText';
import SelectOptionsPanel from '../../../styled/SelectOptionsPanel';
import DefaultLoading from '../../../styled/DefaultLoading';

export default class OptionsPanel extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
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
  }

  static defaultProps = {
    isOpen: false,
    isLoading: false,
    truncate: false,
    multiline: false,
    editedAfterSelection: false,
    filterDisable: false,
    selectedId: null,
    value: null,
    renderOption: undefined,
    theme: {},
  }

  isFiltered = ({ item, value }) => {
    const filteredString = item.filterString
      ? item.filterString
      : item.title
        ? item.title
        : value;

    return (filteredString.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1);
  }

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
      filtered.map(item => (
        <SelectOption
          key={item.id}
          theme={theme}
          custom={!!RenderOption}
          onClick={event => onSelect(event, item)}
        >
          {RenderOption
            ? <RenderOption value={item} />
            : (
              <SelectText truncate={truncate} multiline={multiline}>
                {item.title}
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
    const {
      isLoading,
      theme,
      isOpen,
      truncate,
    } = this.props;

    return (
      <SelectOptionsPanel theme={theme} visible={isOpen} truncate={truncate}>
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
