import React, { Component } from 'react';
import { Link } from 'gatsby';

import styles from './Header.module.scss';

import logo from '../../images/tetchi-burger.gif';

class Header extends Component {
  render() {
    const { title, description, logoImage } = this.props;

    return (
      <header className={styles.Header}>
        <Link to="/">
          <img src={logo} className={styles.Logo} />
        </Link>
        <h1 className={styles.Heading}>{title}</h1>
        <h4>{description}</h4>
      </header>
    );
  }
}

export default Header;
