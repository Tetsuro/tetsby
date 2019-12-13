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

// Need to mock MainMenu so that it doesn't call graphQl queries.
jest.mock('../MainMenu', () => 'div');

test('Renders `children`', () => {
  const mockChildren = 'Mock content';
  const { container, getByText } = render(
    <Layout data={mockData}>{mockChildren}</Layout>
  );

  expect(container.querySelector('main').textContent).toBe(mockChildren);
});

describe('header', () => {
  test('Renders `title`', () => {
    const { container, getByText } = render(<Layout data={mockData} />);

    expect(container.querySelector('h1').textContent).toBe(
      mockData.site.siteMetadata.title
    );
  });

  test('Renders `description`', () => {
    const { container, getByText } = render(<Layout data={mockData} />);

    expect(container.querySelector('header')).toBeInTheDocument();
    expect(
      getByText(mockData.site.siteMetadata.description)
    ).toBeInTheDocument();
  });
});

describe('footer', () => {
  test('Renders `github` handle in URL', () => {
    const { getByText } = render(<Layout data={mockData} />);

    expect(getByText('Github').closest('a')).toHaveAttribute(
      'href',
      `https://www.github.com/${mockData.site.siteMetadata.github}`
    );
  });
});
