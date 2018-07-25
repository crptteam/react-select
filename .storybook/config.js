import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/SingleSelect.stories.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);