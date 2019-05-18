import React, { Component } from 'react';
import { Link } from 'gatsby';

import styles from './Footer.module.scss';

class Footer extends Component {
  render() {
    const { twitter, github } = this.props;

    return (
      <footer className={styles.Footer}>
        <a href={`https://www.twitter.com/${twitter}`} target="_blank">
          Twitter
        </a>
        <a href={`https://www.github.com/${github}`} target="_blank">
          Github
        </a>
      </footer>
    );
  }
}

export default Footer;
