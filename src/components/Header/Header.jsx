import React, { Component } from 'react';

import styles from './Header.module.scss';

class Header extends Component {
  render() {
    const { title, description } = this.props;

    return (
      <header className={styles.Header}>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </header>
    );
  }
}

export default Header;
