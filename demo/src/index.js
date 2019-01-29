import React from "react";
import { render } from "react-dom";
import styled, { ThemeProvider } from "styled-components";

import defaultTheme from "../../src/theme/loginTheme";
import { SingleSelect } from "../../src";
import MultiSelect from "../../src/components/MultiSelect";
import { Cross, EmptyCheckbox, SelectedCheckbox } from "../../src/svg/";

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
  font-family: "Segoe UI";
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
    console.log("onTextareaKeydown", e.keyCode);
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  onChange = (e) => {
    const {onFilter} = this.props;
    onFilter(e.target.value);
    this.div.innerHTML = e.target.value;
    this.setState({
      width: (this.div.clientWidth + 5) + 'px',
      value: e.target.value
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      width: '10px',
      value: ''
    }
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    const {container, onFilter} = this.props;
    if (!container) return;
    if (container.contains(e.target)) return;

    this.setState({
      value: '',
      width: '10px',
    })

    onFilter('');
  };

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
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
    console.log("props", this.props);
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
        />
      </Wrap>
    );
  }
}

class Demo extends React.Component {
  state = {
    values: [
      { id: 1, title: "Кабак" },
      { id: 2, title: "Каботьер" },
      { id: 3, title: "Кабан" },
      { id: 4, title: "Корма" },
      { id: 5, title: "Кельт" },
      { id: 6, title: "Кабинет" },
      { id: 7, title: "Капитан" }
    ]
  };

  render() {
    return (
      <div style={{ width: "300px" }}>
        <SingleSelect
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          multiline
          savePlaceholder
          values={this.state.values}
          rightIconReplacer={<div>+</div>}
        />
        <MultiSelect
          placeholder="Укажите своих операторов ЭДО"
          savePlaceholder
          truncate
          withoutIcon
          RenderValues={RenderValues}
          RenderOption={RenderOption}
          values={this.state.values}
        />
      </div>
    );
  }
}

render(
  <ThemeProvider theme={defaultTheme}>
    <Demo />
  </ThemeProvider>,
  document.querySelector("#demo")
);
