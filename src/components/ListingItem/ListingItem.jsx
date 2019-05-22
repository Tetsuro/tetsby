import React, { Component } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import styles from './ListingItem.module.scss';
import defaultImage from '../../images/tetchi-profile.jpg';

export default class ListingItem extends Component {
  render() {
    const {
      key,
      title,
      slug,
      featuredImageSrc,
      featuredImageAltText,
      date,
    } = this.props;

    return (
      <li className={styles.ListingItem}>
        <Link to={`/${slug}`} className={styles.ListingItemThumbnailWrapper}>
          <img
            src={featuredImageSrc ? featuredImageSrc : defaultImage}
            alt={featuredImageAltText ? featuredImageAltText : ''}
            className={styles.ListingItemThumbnail}
          />
        </Link>
        <div className={styles.ListingItemMeta}>
          <Link to={`/${slug}`} className={styles.ListingItemLink}>
            <h2 className={styles.ListingItemTitle}>
              <span
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            </h2>
          </Link>
          <span className={styles.ListingItemInfo}>{date}</span>
        </div>
      </li>
    );
  }
}
