import React, { Component } from 'react';
import { Link } from 'gatsby';

import styles from './PostFooterLinks.module.scss';

class PostFooterLinks extends Component {
  render() {
    const { newerPostSlug, olderPostSlug } = this.props;

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
}

export default PostFooterLinks;
