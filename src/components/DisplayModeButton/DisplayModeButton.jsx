import React, { Component } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import styles from './DisplayModeButton.module.scss';

export default class DisplayModeButton extends Component {
  render() {
    const { toggleDisplayMode } = this.props;

    return (
      <button
        type="button"
        onClick={toggleDisplayMode}
        className={styles.DisplayModeButton}
      >
        Switch to mode
      </button>
    );
  }
}
