import React from 'react';
import {render} from '@testing-library/react';

import PostFooterLinks from './PostFooterLinks';

const mockProps = {
  newerPostSlug: undefined,
  olderPostSlug: undefined,
};

test('Renders link to new post if `newerPostSlug` is defined', () => {
  const mockSlug = 'foo';

  const {container} = render(
    <PostFooterLinks {...mockProps} newerPostSlug={mockSlug} />
  );

  expect(container.querySelector('a')).toHaveAttribute('href', `/${mockSlug}`);
});

test('Renders link to old post if `olderPostSlug` is defined', () => {
  const mockSlug = 'foo';

  const {container} = render(
    <PostFooterLinks {...mockProps} olderPostSlug={mockSlug} />
  );

  expect(container.querySelector('a')).toHaveAttribute('href', `/${mockSlug}`);
});
