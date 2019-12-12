import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Header from '../Header';
// import { useStaticQuery } from 'gatsby'; // mocked

import { PureLayout as Layout } from './Layout';

const mockData = {
  site: {
    siteMetadata: {
      twitter: 'mock twitter',
    },
  },
};

jest.mock('../Header', () => 'headerf');

test('Renders `<Header />`', () => {
  const { container } = render(<Layout data={mockData} />);

  console.log(Header);
  expect(container.querySelector('header')).toBeInTheDocument();
});
