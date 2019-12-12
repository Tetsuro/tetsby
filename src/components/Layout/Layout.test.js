import React from 'react';
import { render } from '@testing-library/react';

import { PureLayout as Layout } from './Layout';

const mockData = {
  site: {
    siteMetadata: {
      twitter: 'mock twitter',
      github: 'mockGithubHandle',
      title: 'mock title',
      description: 'mock description',
    },
  },
};

jest.mock('../MainMenu', () => 'div');

test('Renders `description`', () => {
  const { container, getByText } = render(<Layout data={mockData} />);

  expect(container.querySelector('header')).toBeInTheDocument();
  expect(getByText(mockData.site.siteMetadata.description)).toBeInTheDocument();
});

test('Renders `github` handle in URL', () => {
  const { getByText } = render(<Layout data={mockData} />);

  expect(getByText('Github').closest('a')).toHaveAttribute(
    'href',
    `https://www.github.com/${mockData.site.siteMetadata.github}`
  );
});
