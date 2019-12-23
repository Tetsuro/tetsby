import React from 'react';
import {Link} from 'gatsby';

import styles from './PostFooterLinks.module.scss';

export default function PostFooterLinks({newerPostSlug, olderPostSlug}) {
  const newerPostLinkMarkup = newerPostSlug ? (
    <Link to={`/${newerPostSlug}`} className={styles.NextPost}>
      Next post »
    </Link>
  ) : null;

  const olderPostLinkMarkup = olderPostSlug ? (
    <Link to={`/${olderPostSlug}`}>« Previous post</Link>
  ) : null;

  return (
    <div className={styles.PostFooterLinks}>
      {olderPostLinkMarkup}
      {newerPostLinkMarkup}
    </div>
  );
}
