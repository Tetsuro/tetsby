import React, { Component } from 'react';
import DisplayModeButton from '../DisplayModeButton';

import styles from './Footer.module.scss';

class Footer extends Component {
  render() {
    const { twitter, github, toggleDisplayMode, displayMode } = this.props;

    return (
      <footer className={styles.Footer}>
        <div className={styles.SocialLinks}>
          <a href={`https://www.twitter.com/${twitter}`} target="_blank">
            Twitter
          </a>
          <a href={`https://www.github.com/${github}`} target="_blank">
            Github
          </a>
        </div>
        <DisplayModeButton
          toggleDisplayMode={toggleDisplayMode}
          displayMode={displayMode}
        />
      </footer>
    );
  }
}

export default Footer;
