import React from 'react';
import { render } from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';

import defaultTheme from '../../src/theme/loginTheme';
import { SingleSelect } from '../../src';
import MultiSelect from '../../src/components/MultiSelect';
import { Cross, EmptyCheckbox, SelectedCheckbox } from '../../src/svg/';

const Wrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 24px;
  padding-bottom: 10px;
`;

const CheckedWrap = styled.div`
  height: 26px;
  font-size: 16px;
  display: flex;
  margin-right: 20px;
  color: #52535a;
  align-items: center;
  background: white;
`;

const IconWrap = styled.div`
  margin-left: 5px;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  white-space: nowrap;
  border: 0;
  outline: 0;
  resize: none;
  height: 22px;
  font-size: 16px;
  width: ${props => props.width};
  font-family: 'Segoe UI';
  border-top: 4px solid transparent;
`;

const OptionWrap = styled.div`
  display: flex;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  box-sizing: border-box;
  align-items: center;
  cursor: pointer;
`;

const IconOptionWrap = styled.div`
  display: flex;
  margin-right: 18px;
`;

const theme = {
  minWidth: '200px',
  height: '60px',
  borderRadius: '1px',
  fontSize: '16px',
  fontWeight: 200,
  main: {
    background: '#FFFFFF',
    border: '1px solid #ABADB5',
    color: '#212C42',
    placeholderColor: '#ACADB5',
    cursor: 'pointer',
    hoverColor: '#212C42',
    hoverBackground: '#F8EC31'
  },
  disabled: {
    background: '#ACADB5',
    border: '1px solid #ABADB5',
    color: '#212C42',
    placeholderColor: '#7C7D85',
    cursor: 'not-allowed',
    hoverColor: '#212C42',
    hoverBackground: '#e6e6e6'
  },
  error: {
    background: '#FFEBEB',
    border: '1px solid #FF3C21',
    color: '#212C42',
    placeholderColor: '#ACADB5',
    cursor: 'pointer',
    hoverColor: '#212C42',
    hoverBackground: '#e6e6e6'
  },
  SelectOption: {
    height: 'auto'
  },
  SelectOptionsPanel: {
    maxHeight: '300px',
    paddingTop: '0px',
    paddingBottom: '0px',
    top: '58px',
    border: '1px solid rgba(196, 196, 196, 0.25)',
    open: {
      boxShadow: '1px 3px 5px rgba(0, 0, 0, 0.25)'
    }
  },
  Placeholder: {
    fontWeight: 200,
    main: {
      color: 'rgba(82,83,90,0.7)'
    },
    error: {
      color: '#FF3D00'
    },
    disabled: {
      color: '#abadb6'
    },
    normal: {
      fontSize: '16px',
      height: '24px',
      top: '50%'
    },
    focused: {
      top: '15px',
      fontSize: '14px',
      height: '14px'
    }
  },
  InputWrap: {
    main: {
      background: '#FFFFFF',
      border: '1px solid rgba(196, 196, 196, 0.25)',
      cursor: 'normal'
    },
    disabled: {
      background: '#FFFFFF',
      border: '1px solid #ABADB5',
      cursor: 'not-allowed'
    },
    error: {
      background: '#FFFFFF',
      border: '1px solid #FF3D00',
      cursor: 'normal'
    },
    height: 'auto',
    borderRadius: '3px',
    paddingLeft: '16px',
    paddingRight: '16px',
    open: {
      boxShadow: '1px 3px 5px rgba(0, 0, 0, 0.25)'
    }
  },
  InputElem: {
    main: {
      color: '#212C42',
      placeholderColor: '#52535A',
      cursor: 'text'
    },
    disabled: {
      color: '#212C42',
      placeholderColor: '#ACADB5',
      cursor: 'not-allowed'
    },
    error: {
      color: '#212C42',
      placeholderColor: '#ACADB5',
      cursor: 'text'
    },
    height: '24px',
    fontSize: '16px',
    fontWeight: 200,
    background: 'rgba(0,0,0,0)'
  },
  RenderWrap: {
    main: {
      color: '#212C42',
      placeholderColor: '#ACADB5'
    },
    disabled: {
      color: '#212C42',
      placeholderColor: '#ACADB5',
      cursor: 'not-allowed'
    },
    error: {
      color: '#212C42',
      placeholderColor: '#ACADB5'
    },
    background: 'rgba(0,0,0,0)'
  }
};

const RenderOption = ({ value, active, onSelect }) => {
  return (
    <OptionWrap onClick={e => onSelect(e, value)}>
      <IconOptionWrap>
        {active ? <SelectedCheckbox /> : <EmptyCheckbox />}
      </IconOptionWrap>
      {value.title}
    </OptionWrap>
  );
};

class RenderValues extends React.Component {
  div;

  onTextareaKeydown = (e, onFilter) => {
    console.log('onTextareaKeydown', e.keyCode);
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  onChange = e => {
    const { onFilter } = this.props;
    onFilter(e.target.value);
    this.div.innerHTML = e.target.value;
    this.setState({
      width: this.div.clientWidth + 5 + 'px',
      value: e.target.value
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      width: '10px',
      value: ''
    };
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick = e => {
    const { container, onFilter } = this.props;
    if (!container) return;
    if (container.contains(e.target)) return;

    this.setState({
      value: '',
      width: '10px'
    });

    onFilter('');
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  componentDidMount() {
    this.div = document.createElement('div');
    document.body.appendChild(this.div);
    this.div.style.display = 'inline-block';
    this.div.style.pointerEvents = 'none';
    this.div.style.visibility = 'hidden';
    this.div.style.fontSize = '16px';
    this.div.style.fontFamily = 'Segoe UI';
  }

  render() {
    console.log('props', this.props);
    const { onFocus, selectedIds, onFilter, onRemove } = this.props;

    const selected = this.props.values.filter(v => ~selectedIds.indexOf(v.id));

    return (
      <Wrap onClick={onFocus}>
        {selected.map((v, i) => (
          <CheckedWrap key={i}>
            {v.title}
            <IconWrap onClick={e => onRemove(v)}>
              <Cross />
            </IconWrap>
          </CheckedWrap>
        ))}
        <Textarea
          width={this.state.width}
          value={this.state.value}
          onKeyDown={this.onTextareaKeydown}
          onChange={this.onChange}
          onFocus={onFocus}
        />
      </Wrap>
    );
  }
}

class Demo extends React.Component {
  state = {
    values: [
      { id: 0, title: 'Розница', value: 'RETAIL', name: 'Розница' },
      {
        id: 1,
        title: <div>Участник обормота</div>,
        titleOption: 'Участнег Оборота',
        value: 'TRADE_PARTICIPANT',
        name: 'Участник оборота'
      },
      { id: 2, title: 'Опт', value: 'WHOLESALER', name: 'Опт' },
      {
        id: 3,
        title: 'Администратор системы',
        value: 'ROLE_ADMIN',
        name: 'Администратор системы'
      },
      {
        id: 4,
        title: 'Оператор ИС МП',
        value: 'IS_MP_OPERATOR',
        name: 'Оператор ИС МП'
      },
      {
        id: 5,
        title: 'Производитель',
        value: 'PRODUCER',
        name: 'Производитель'
      },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
      { id: 6, title: 'ФОИВ', value: 'FOIV', name: 'ФОИВ' },
    ]
  };

  onChange = () => {
    this.setState({
      values: [
        { id: 1, title: 'Кабак' },
        { id: 2, title: 'Каботьер' },
        { id: 3, title: 'Кабан' },
        { id: 4, title: 'Корма' },
        { id: 5, title: 'Кельт' },
        { id: 6, title: 'Кабинет' },
        { id: 7, title: 'Капитан' }
      ]
    });
  };

  render() {
    return (
      <div style={{ width: '600px' }}>
        <SingleSelect
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          multiline
          savePlaceholder
          values={this.state.values}
          doubleIcon
          // rightIconReplacer={<div>+</div>}
        />
        <MultiSelect
          placeholder="Укажите своих операторов ЭДО"
          savePlaceholder
          truncate
          withoutIcon
          selectedIds={[3, 4, 5]}
          RenderValues={RenderValues}
          RenderOption={RenderOption}
          values={this.state.values}
          theme={{ Select: theme }}
        />
        <form onSubmit={i => i.preventDefault()}>
          <SingleSelect
            placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
            multiline
            savePlaceholder
            values={this.state.values}
            rightIconReplacer={<div>+</div>}
            onSelect={console.log}
            onChange={this.onChange}
          />
          <MultiSelect
            placeholder="Укажите своих операторов ЭДО"
            savePlaceholder
            truncate
            disabled
            withoutIcon
            RenderValues={RenderValues}
            RenderOption={RenderOption}
            values={this.state.values}
          />
        </form>
      </div>
    );
  }
}

render(
  <ThemeProvider theme={defaultTheme}>
    <Demo />
  </ThemeProvider>,
  document.querySelector('#demo')
);
