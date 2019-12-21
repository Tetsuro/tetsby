import React, {useState, useEffect} from 'react';
import {graphql, useStaticQuery} from 'gatsby';
import Helmet from 'react-helmet';

import Header from '../Header';
import Footer from '../Footer';

import styles from './Layout.module.scss';

export default function Layout({children}) {
  const [displayMode, setDisplayMode] = useState('light');

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            twitter
            github
          }
        }
      }
    `
  );

  useEffect(() => {
    const initialDisplayMode =
      window.localStorage.getItem('displayMode') || 'light';

    setDisplayMode(initialDisplayMode);
  }, []);

  function toggleDisplayMode() {
    const modeToSwitchTo = displayMode === 'dark' ? 'light' : 'dark';

    window.localStorage.setItem('displayMode', modeToSwitchTo);
    setDisplayMode(modeToSwitchTo);
  }

  return (
    <PureLayout
      data={data}
      displayMode={displayMode}
      onDisplayModeToggle={toggleDisplayMode}
    >
      {children}
    </PureLayout>
  );
}

export const PureLayout = ({
  data,
  displayMode,
  children,
  onDisplayModeToggle,
}) => {
  const {
    site: {
      siteMetadata: {twitter, github, title, description},
    },
  } = data;

  return (
    <div className={styles.Container}>
      <Helmet htmlAttributes={{displayMode}} />
      <Header
        title={title}
        description={description}
        displayMode={displayMode}
      />
      <main className={styles.Content}>{children}</main>
      <Footer
        twitter={twitter}
        github={github}
        displayMode={displayMode}
        toggleDisplayMode={onDisplayModeToggle}
      />
    </div>
  );
};
