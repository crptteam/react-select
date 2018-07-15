import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

import { MultiSelect } from '../index';

const multiSelectElements = storiesOf('MultiSelect', module);

multiSelectElements.addDecorator(withKnobs);

multiSelectElements.add('simple', () => (
  <MultiSelect
    name="category"
    inline
    placeholder="Категория"
    onSelect={val => console.log(val)}
    values={[
      { id: 1, title: 'Табачная продукция' },
      { id: 2, title: 'Лекарства' },
    ]}
    selectedId={1}
  />
));
