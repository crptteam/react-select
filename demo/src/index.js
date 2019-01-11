import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from "styled-components";

import defaultTheme from '../../src/theme/defaultTheme';
import { SingleSelect } from '../../src';
import MultiSelect from '../../src/components/MultiSelect';


class Demo extends React.Component {

  state = {
    values: [
      { id: 1, title: 'Очень длинный пункт меню1, который должен вместиться в инпут' },
      { id: 2, title: 'Очень длинный пункт меню2, который должен вместиться в инпут' },
    ],
  };

  render() {
    return (
      <div style={{ width: '300px' }}>
        <SingleSelect
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          multiline
          savePlaceholder
          values={this.state.values}
        />
        <MultiSelect
          placeholder="Очень длинный плейсхолдер, который должен вместиться в инпут"
          savePlaceholder
          truncate
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
