import React, { useState, useEffect } from 'react';
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

  const [onPostPage, setOnPostPage] = useState(false);

  useEffect(() => {
    console.log('useEffect');
    setOnPostPage(isPostPage());
  });
  console.log(onPostPage);
  //TODO: Override active class when looking at blog post.

  const linksMarkup = links.map((link, index) => {
    const classes = classNames(
      styles.MainMenuLink,
      index === 0 && onPostPage && styles.MainMenuLinkIsActive
    );
    return (
      <Link
        to={index === 0 ? '/' : `${link.url}`}
        key={link.wordpress_id}
        className={classes}
        activeClassName={styles.MainMenuLinkIsActive}
      >
        {link.title}
      </Link>
    );
  });

  function isPostPage() {
    const currentPath = globalHistory.location.pathname;

    console.log(currentPath);
    if (
      currentPath === '/' ||
      currentPath.includes('about-me') ||
      currentPath.includes('works')
    ) {
      console.log('on a main-menu page!');
      // setOnPostPage(false);
      return false;
    } else {
      console.log('on a post page!');
      // setOnPostPage(true);
      return true;
    }
  }

  return <nav className={styles.MainMenu}>{linksMarkup}</nav>;
}
