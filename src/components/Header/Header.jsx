import React, { Component } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

import MainMenu from '../MainMenu';

import styles from './Header.module.scss';
import logo from '../../images/tetchi-burger.gif';
import darkLogo from '../../images/tetchi-burger-dark.gif';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      logoLoaded: false,
    };
  }

  componentDidMount() {
    this.setState({ logoLoaded: true });
  }

  render() {
    const { title, description, displayMode } = this.props;
    const { logoLoaded } = this.state;
    const classes = classNames(styles.Logo, logoLoaded && styles.LogoIsLoaded);

    const logoSrc = displayMode === 'light' ? logo : darkLogo;

    return (
      <header className={styles.Header}>
        <Link className={styles.HeaderHomeLink} to="/">
          <h1 className={styles.Heading}>{title}</h1>
          <img src={logoSrc} className={classes} />
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
