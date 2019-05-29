import React, { Component } from 'react';
import { Link } from 'gatsby';

import MainMenu from '../MainMenu';

import styles from './Header.module.scss';
import logo from '../../images/tetchi-burger.gif';
import darkLogo from '../../images/tetchi-burger-dark.gif';

export default function Header({ title, description, displayMode }) {
  const logoSrc = displayMode === 'light' ? logo : darkLogo;

  return (
    <header className={styles.Header}>
      <Link className={styles.HeaderHomeLink} to="/">
        <h1 className={styles.Heading}>{title}</h1>
        <img src={logoSrc} className={styles.Logo} />
      </Link>
      <div className={styles.HeaderNav}>
        <MainMenu />
        <h4 className={styles.HeaderDescription}>{description}</h4>
      </div>
    </header>
  );
}
