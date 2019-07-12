import React, { Component } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import styles from './ListingItem.module.scss';
import defaultImage from '../../images/tetchi-profile.jpg';

export default class ListingItem extends Component {
  render() {
    const { id, title, slug, featuredImageMarkup, date } = this.props;

    const thumbnail = featuredImageMarkup ? (
      featuredImageMarkup
    ) : (
      <img className={styles.ListingItemThumbnail} src={defaultImage} alt="" />
    );

    return (
      <li key={id} className={styles.ListingItem}>
        <Link to={`/${slug}`} className={styles.ListingItemThumbnailWrapper}>
          {thumbnail}
        </Link>
        <div className={styles.ListingItemMeta}>
          <h2 className={styles.ListingItemTitle}>
            <Link to={`/${slug}`} className={styles.ListingItemLink}>
              <span
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            </Link>
          </h2>
          <span className={styles.ListingItemInfo}>{date}</span>
        </div>
      </li>
    );
  }
}
