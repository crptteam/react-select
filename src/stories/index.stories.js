import React from 'react';

import { storiesOf } from '@storybook/react';

import { withKnobs } from '@storybook/addon-knobs/react';

import { SingleSelect, MultiSelect, THEMES } from '../index';

const elements = storiesOf('Select', module);

elements.addDecorator(withKnobs);

elements.add('SingleSelect', () => {
  return (
    <SingleSelect
      width={'100%'}
      name="category"
      inline
      theme={THEMES.loginTheme}
      placeholder="Категория"
      onSelect={val => console.log(val)}
      values={[
        {
          id: 1,
          value: 'Попков Тимофей Антонович',
          title: (
            <div>
              ФНС России (Qualified)<br />
              27.03.2017 – 27.03.2018<br />Попков Тимофей Антонович
            </div>
          )
        },
        { id: 2, title: 'Лекарства' }
      ]}
      selectedId={1}
    />
  );
});

elements.add('MultiSelect', () => {
  return (
    <MultiSelect
      name="category"
      inline
      placeholder="Категория"
      onSelect={val => console.log(val)}
      values={[
        { id: 1, title: 'Табачная продукция' },
        { id: 2, title: 'Лекарства' }
      ]}
      selectedId={1}
    />
  );
});
