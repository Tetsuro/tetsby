import React from 'react';
import { render } from '@testing-library/react';
import { StaticQuery } from 'gatsby';

import Header from './Header';

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: 'Default Starter',
        },
      },
    })
  );
});

test('Renders `<MainMenu />`', () => {
  const { getByTestId } = render(<Header />);

  expect(getByTestId('hero-title')).toHaveTextContent('Gatsby is awesome!');
});
