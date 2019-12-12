import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';

import Header from '../Header';
import Footer from '../Footer';

import styles from './Layout.module.scss';

export default function Layout({ children }) {
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

  return <PureLayout data={data}>{children}</PureLayout>;
}

export const PureLayout = ({ data, children }) => {
  const {
    site: {
      siteMetadata: { twitter, github, title, description },
    },
  } = data;

  console.log(data);

  return (
    <div className={styles.Container}>
      {/* <Helmet htmlAttributes={{ displayMode }} /> */}
      <Helmet />
      <Header
        title={title}
        description={description}
        // displayMode={displayMode}
      />
      <main className={styles.Content}>{children}</main>
      <Footer
        twitter={twitter}
        github={github}
        // toggleDisplayMode={toggleDisplayMode}
        // displayMode={displayMode}
      />
    </div>
  );
};
