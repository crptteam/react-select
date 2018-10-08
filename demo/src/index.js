import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from "styled-components";

import defaultTheme from '../../src/theme/defaultTheme';
import { SingleSelect } from '../../src';


const testRenderOption = () => (
  <div>
    Normal option text<br/>
    <b>Bold option text</b><br/>
    <i>Italy option text</i>
  </div>
);

const testRenderValue = () => (
  <div>
    Normal value text<br/>
    <b>Bold value text</b><br/>
    <i>Italy value text</i>
  </div>
);

const Demo = () => (
  <div>
    <h1>
      react-select Demo
    </h1>
    <SingleSelect
      width="100%"
      name="category"
      inline
      placeholder="Просто проверка длинного текст в placeholder, это норм? ок? есть перенос на некст строку?"
      isError
      savePlaceholder
      onEnterKey={(e) => console.log(e)}
      onSelect={value => console.log(value)}
      values={[
        {
          id: 1, title: 'Не лекарства' },
        { id: 2, title: 'Лекарства' },
      ]}
    />
    <SingleSelect
      width="100%"
      name="category"
      inline
      placeholder="Категория"
      onSelect={value => console.log(value)}
      renderOption={testRenderOption}
      renderValue={testRenderValue}
      values = {[
        { id: 0, title: 'aaa' },
        { id: 1, title: 'bbb' },
        { id: 2, title: 'ccc' },
      ]}
      selectedId={1}
    />
  </div>
);

render(
  <ThemeProvider theme={defaultTheme}>
    <Demo />
  </ThemeProvider>,
  document.querySelector("#demo")
);

const sss = {
  id: 1,
  value: 'Попков Тимофей Антонович',
  title: (
    <div>
      ФНС России (Qualified)
      <br />
      27.03.2017 – 27.03.2018
      <br />
        Попков Тимофей Антонович
    </div>
  ),
}