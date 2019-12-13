import React from 'react';
import { render } from '@testing-library/react';

import { PureLayout as Layout } from './Layout';

const mockData = {
  site: {
    siteMetadata: {
      twitter: 'mockTwitter',
      github: 'mockGit',
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
    const { container } = render(<Layout data={mockData} />);

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

  test('Renders `twitter` handle in URL', () => {
    const { getByText } = render(<Layout data={mockData} />);

    expect(getByText('Twitter').closest('a')).toHaveAttribute(
      'href',
      `https://www.twitter.com/${mockData.site.siteMetadata.twitter}`
    );
  });
});

// TODO: Figure out how to query for 'html' element.
// Maybe apply it to <body> or <div class="Container">
describe('displayMode', () => {
  test.skip('Applies `displaymode="dark" to `html` when passed `dark`', () => {
    const html = document.createElement('html');

    const { container, baseElement } = render(
      <Layout data={mockData} displayMode="dark" />
    );

    expect(container.querySelector('div')).toHaveAttribute(
      'displaymode',
      'dark'
    );
  });
});
