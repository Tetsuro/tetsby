import React, { Component } from 'react';

import styles from './Header.module.scss';

class Header extends Component {
  render() {
    const { title } = this.props;

    return (
      <header className={styles.Header}>
        <h1>{title}</h1>
      </header>
    );
  }
}

export default Header;
