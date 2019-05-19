import React, { Component } from 'react';
import { Link } from 'gatsby';

import MainMenu from '../MainMenu';

import styles from './Header.module.scss';
import logo from '../../images/tetchi-burger.gif';

class Header extends Component {
  render() {
    const { title, description, logoImage } = this.props;

    return (
      <header className={styles.Header}>
        <Link className={styles.HeaderHomeLink} to="/">
          <h1 className={styles.Heading}>{title}</h1>
          <img src={logo} className={styles.Logo} />
        </Link>
        <div className={styles.HeaderNav}>
          <MainMenu />
          <h4 className={styles.HeaderDescription}>{description}</h4>
        </div>
      </header>
    );
  }
}

export default Header;
