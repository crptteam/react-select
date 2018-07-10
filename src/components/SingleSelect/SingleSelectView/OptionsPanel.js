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
    selectedId: null,
    value: null,
    renderOption: undefined,
    theme: {},
  }

  renderValues = () => {
    const {
      isLoading,
      value,
      values,
      selectedId,
      editedAfterSelection,
      renderOption: RenderOption,
      theme,
      truncate,
      multiline,
      onSelect,
    } = this.props;

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
