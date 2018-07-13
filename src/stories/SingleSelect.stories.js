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


singleSelectElements.add('with HTML tags and titleText and TitleOption', () => (
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
        title: 'empty',
        titleText: (
          <div>
            Title <b>text1</b> here
          </div>
        ),
        titleOption: (
          <div>
            Title<br />
            text1
          </div>
        ),
      },
      { id: 2, title: 'Просто текст' },
      {
        id: 3,
        value: 'Попков Тимофей Антонович',
        title: 'empty',
        titleText: (
          <div>
            Title <b>text3</b> here
          </div>
        ),
        titleOption: (
          <div>
            Title<br />
            text3
          </div>
        ),
      },
    ]}
    selectedId={1}
  />
));

const testRenderOption = (props) => (
  <div>
    To option field:<br/>
    <b>{props.value.prop1}</b><br/>
    <i>{props.value.prop3}</i>
  </div>
);

const testRenderValue = (props) => (
  <div>
    To value field:<br/>
    <b>{props.selected.prop1}</b><br/>
    <i>{props.selected.prop2}</i>
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
      { id: 0, title: 'aaa', prop1: 'Id0. prop to', prop2: 'value', prop3: 'option' },
      { id: 1, title: 'bbb', prop1: 'Id1. prop to', prop2: 'value', prop3: 'option' },
      { id: 2, title: 'ccc', prop1: 'Id2. prop to', prop2: 'value', prop3: 'option' },
    ]}
  />
));


const valueFunction1 = () => (
  <div>
    Rendered:<br/>
    <b>Function</b><br/>
    <i>valueFunction1</i>
  </div>
);

const valueFunction2 = () => (
  <div>
    Rendered:<br/>
    <b>Function</b><br/>
    <i>valueFunction2</i>
  </div>
);

const titleFunction1 = () => (
  <div>
    Rendered:<br/>
    <b>Function</b><br/>
    <i>titleFunction1</i>
  </div>
);

const titleFunction2 = () => (
  <div>
    Rendered:<br/>
    <b>Function</b><br/>
    <i>titleFunction2</i>
  </div>
);

singleSelectElements.add('with title and value functions', () => (
  <SingleSelect
    width="100%"
    name="category"
    inline
    theme={THEMES.loginTheme}
    placeholder="Категория"
    onSelect={value => console.log(value)}
    values={[
      { id: 0, title: titleFunction1, value: valueFunction1 },
      { id: 1, title: titleFunction2, value: valueFunction2 },
    ]}
    filterDisable
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
    values={[
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
    values={[
      { id: 0, title: 'aaa' },
      { id: 1, title: 'bbb' },
      { id: 2, title: 'ccc' },
    ]}
    selectedId={0}
    withoutIcon
  />
));

singleSelectElements.add('with filterDisable', () => (
  <SingleSelect
    width="100%"
    name="category"
    inline
    theme={THEMES.loginTheme}
    placeholder="Категория"
    savePlaceholder
    onSelect={value => console.log(value)}
    values={[
      { id: 0, title: 'aaa' },
      { id: 1, title: 'bbb' },
      { id: 2, title: 'ccc' },
    ]}
    selectedId={0}
    filterDisable
  />
));
