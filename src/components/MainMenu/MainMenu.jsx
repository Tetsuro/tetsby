import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

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

  const linksMarkup = links.map((link, index) => {
    return (
      <Link
        to={index === 0 ? '/' : `${link.url}`}
        key={link.wordpress_id}
        className={styles.MainMenuLink}
        activeClassName={styles.MainMenuLinkIsActive}
      >
        {link.title}
      </Link>
    );
  });

  return <nav className={styles.MainMenu}>{linksMarkup}</nav>;
}
