import React from 'react';

import styles from './DisplayModeButton.module.scss';

export default function DisplayModeButton({toggleDisplayMode, displayMode}) {
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
