import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import DisplayModeButton from './DisplayModeButton';

const mockProps = {
  displayMode: undefined,
  toggleDisplayMode: undefined,
};

test('Triggers `toggleDisplayMode`', () => {
  const mockToggleDisplayModeChange = jest.fn();

  const {container} = render(
    <DisplayModeButton
      {...mockProps}
      toggleDisplayMode={mockToggleDisplayModeChange}
    />
  );

  fireEvent.click(container.querySelector('button'));

  expect(mockToggleDisplayModeChange).toHaveBeenCalledTimes(1);
});

describe('when `displayMode` is `dark`', () => {
  test('Renders `☀️` emoji and label to light mode', () => {
    const {container} = render(
      <DisplayModeButton {...mockProps} displayMode="dark" />
    );

    expect(container.querySelector('button')).toHaveTextContent(
      '☀️ Switch to light mode'
    );
  });
});

describe('when `displayMode` is `light`', () => {
  test('Renders `🌙️` emoji and label to dark mode', () => {
    const {container} = render(
      <DisplayModeButton {...mockProps} displayMode="light" />
    );

    expect(container.querySelector('button')).toHaveTextContent(
      '🌙️ Switch to dark mode'
    );
  });
});
