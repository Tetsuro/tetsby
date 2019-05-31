import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { globalHistory } from '@reach/router';
import classNames from 'classnames';

import styles from './MainMenu.module.scss';

export default function MainMenu() {
  const {
    wordpressWpApiMenusMenusItems: { items: links },
  } = useStaticQuery(
    graphql`
      query {
        wordpressWpApiMenusMenusItems {
          items {
            title
            url
            wordpress_id
          }
        }
      }
    `
  );

  //TODO: Override active class when looking at blog post.

  const currentPath = globalHistory.location.pathname;

  const linksMarkup = links.map((link, index) => {
    // Crappy hack to make "Blawg" active for all pages other than home.
    const classes = classNames(
      styles.MainMenuLink,
      index === 0 &&
        currentPath !== '/about-me/' &&
        currentPath !== '/works/' &&
        styles.MainMenuLinkIsActive
    );

    return (
      <Link
        to={index === 0 ? '/' : `${link.url}/`}
        key={link.wordpress_id}
        className={classes}
        activeClassName={styles.MainMenuLinkIsActive}
      >
        {link.title}
      </Link>
    );
  });

  return <nav className={styles.MainMenu}>{linksMarkup}</nav>;
}
