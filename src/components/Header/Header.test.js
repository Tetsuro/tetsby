import React from 'react';
import {render} from '@testing-library/react';

import Header from './Header';

// Need to mock MainMenu so that it doesn't call graphQl queries.
jest.mock('../MainMenu', () => 'div');

const mockProps = {
  title: 'My title',
  description: 'My description',
  displayMode: 'light',
};

test('Renders `<h1>` with `title` prop', () => {
  const {container} = render(<Header {...mockProps} />);

  expect(container.querySelector('h1').textContent).toBe(mockProps.title);
});

test('Renders `<h4>` with `description` prop', () => {
  const {container} = render(<Header {...mockProps} />);

  expect(container.querySelector('h4').textContent).toBe(mockProps.description);
});

// TODO: Figure out how to check for img url.
test.skip('Renders dark logo when `displayMode` is `dark', () => {
  const {container} = render(<Header {...mockProps} displayMode="dark" />);
  expect(container.querySelector('img')).toHaveAttribute('dataSrc', 'logo');
});
