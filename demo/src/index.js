import React from 'react';
import { render } from 'react-dom';

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
      placeholder="Категория"
      onSelect={value => console.log(value)}
      values={[
        {
          id: 1, title: { testRenderOption } },
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

render(<Demo />, document.querySelector("#demo"));

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