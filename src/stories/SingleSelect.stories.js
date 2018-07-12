import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { ThemeProvider } from "styled-components";

import { SingleSelect, THEMES } from '../index';

const singleSelectElements = storiesOf('SingleSelect', module);

const withTheme = story => (
  <ThemeProvider theme={THEMES.defaultTheme}>
    {story()}
  </ThemeProvider>
);

singleSelectElements.addDecorator(withKnobs);
singleSelectElements.addDecorator(withTheme);

singleSelectElements.add('simple and selectesId = 0', () => (
  <SingleSelect
    width="100%"
    name="category"
    inline
    theme={THEMES.loginTheme}
    placeholder="Категория"
    onSelect={value => console.log(value)}
    values={[
      { id: 0, title: 'Не лекарства' },
      { id: 1, title: 'Лекарства' },
      { id: 2, title: 'Лекарь' },
    ]}
    selectedId={0}
  />
));

singleSelectElements.add('with placeholder', () => (
  <SingleSelect
    width="100%"
    name="category"
    inline
    theme={THEMES.loginTheme}
    placeholder="Категория"
    savePlaceholder
    onSelect={value => console.log(value)}
    values={[
      { id: 0, title: 'Не лекарства' },
      { id: 1, title: 'Лекарства' },
    ]}
  />
));

singleSelectElements.add('with HTML tags', () => (
  <SingleSelect
    width="100%"
    name="category"
    inline
    theme={THEMES.loginTheme}
    placeholder="Категория"
    onSelect={value => console.log(value)}
    values={[
      {
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
      },
      { id: 2, title: 'Лекарства' },
    ]}
    selectedId={1}
  />
));


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

singleSelectElements.add('with renderOptions and renderValue', () => (
  <SingleSelect
    width="100%"
    name="category"
    inline
    theme={THEMES.loginTheme}
    placeholder="Категория"
    onSelect={value => console.log(value)}
    renderOption={testRenderOption}
    renderValue={testRenderValue}
    values = {[
      { id: 0, title: 'aaa' },
      { id: 1, title: 'bbb' },
      { id: 2, title: 'ccc' },
    ]}
  />
));

singleSelectElements.add('with error', () => (
  <SingleSelect
    isError
    width="100%"
    name="category"
    inline
    theme={THEMES.loginTheme}
    placeholder="Категория"
    onSelect={value => console.log(value)}
    values = {[
      { id: 0, title: 'aaa' },
      { id: 1, title: 'bbb' },
      { id: 2, title: 'ccc' },
    ]}
  />
));

singleSelectElements.add('with isLoading', () => (
  <SingleSelect
    isLoading
    width="100%"
    name="category"
    inline
    theme={THEMES.loginTheme}
    placeholder="Категория"
    onSelect={value => console.log(value)}
    values = {[
      { id: 0, title: 'aaa' },
      { id: 1, title: 'bbb' },
      { id: 2, title: 'ccc' },
    ]}
    selectedId={1}
  />
));


singleSelectElements.add('with withoutIcons', () => (
  <SingleSelect
    width="100%"
    name="category"
    inline
    theme={THEMES.loginTheme}
    placeholder="Категория"
    savePlaceholder
    onSelect={value => console.log(value)}
    values = {[
      { id: 0, title: 'aaa' },
      { id: 1, title: 'bbb' },
      { id: 2, title: 'ccc' },
    ]}
    selectedId={0}
    withoutIcon
  />
));