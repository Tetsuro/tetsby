import React, { Component } from 'react';
import styles from './Header.module.scss';

import logo from '../../images/tetchi-burger.gif';

class Header extends Component {
  render() {
    const { title, description, logoImage } = this.props;

    return (
      <header className={styles.Header}>
        <h1>
          <img src={logo} className={styles.Logo} />
          <span>{title}</span>
        </h1>
        <h4>{description}</h4>
      </header>
    );
  }
}

export default Header;
