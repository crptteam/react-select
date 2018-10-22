import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from "styled-components";

import defaultTheme from '../../src/theme/defaultTheme';
import { SingleSelect } from '../../src';
import MultiSelect from '../../src/components/MultiSelect';


class Demo extends React.Component {

  state = {
    values: [],
  };

  onChange = () => {
    this.setState({values: [], isLoading: true}, () => {
      setTimeout(() => this.setState({values: [{id:1, title: 'One', disabled: true}, {id:2, title: 'Two'}], isLoading: false}), 1000)
    });
  };

  render() {
    return (
      <div>
        <SingleSelect
          onChange={this.onChange}
          isLoading={this.state.isLoading}
          placeholder="Enter Text"
          savePlaceholder
          onSelect={console.log}
          values={this.state.values}
        />
        <MultiSelect
          onChange={this.onChange}
          isLoading={this.state.isLoading}
          onSelect={console.log}
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
