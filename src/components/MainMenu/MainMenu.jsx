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

  console.log(links);

  const linksMarkup = links.map((link, index) => (
    <Link
      to={index === 0 ? '/' : `${link.url}/`}
      key={link.wordpress_id}
      className={styles.MainMenuLink}
      activeClassName={styles.MainMenuLinkIsActive}
      // partiallyActive={index === 0}
    >
      {link.title}
    </Link>
  ));

  return <nav className={styles.MainMenu}>{linksMarkup}</nav>;
}
