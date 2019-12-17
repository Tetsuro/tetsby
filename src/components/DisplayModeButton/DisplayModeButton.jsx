import React, {Component} from 'react';

import styles from './DisplayModeButton.module.scss';

export default class DisplayModeButton extends Component {
  render() {
    const {toggleDisplayMode, displayMode} = this.props;
    const oppositeMode = displayMode === 'light' ? 'dark' : 'light';
    const modeEmoji = displayMode === 'light' ? '🌙️' : '☀️';

    return (
      <button
        type="button"
        onClick={toggleDisplayMode}
        className={styles.DisplayModeButton}
      >
        {modeEmoji} Switch to {oppositeMode} mode
      </button>
    );
  }
}
