import React from 'react';
import { render } from '@testing-library/react';

import { PureLayout as Layout } from './Layout';

const mockData = {
  site: {
    siteMetadata: {
      twitter: 'mock twitter',
      github: 'mock github',
      title: 'mock title',
      description: 'mock description',
    },
  },
};

jest.mock('../MainMenu', () => 'MockMainMenu');

test('Renders `description`', () => {
  const { container, getByText } = render(<Layout data={mockData} />);
  expect(container.querySelector('hello')).toBeInTheDocument();

  // expect(getByText('mock description')).toBeInTheDocument();
});
