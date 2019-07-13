import React, { Component } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import styles from './ListingItem.module.scss';
import defaultImage from '../../images/tetchi-profile.jpg';

export default class ListingItem extends Component {
  render() {
    const { id, title, slug, fluid, date, alt_text } = this.props;

    const thumbnail = fluid ? (
      <Img
        className={styles.ListingItemThumbnail}
        fluid={fluid}
        alt={alt_text ? alt_text : null}
      />
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
