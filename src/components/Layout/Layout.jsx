import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Header from '../Header';
import Footer from '../Footer';

import styles from './Layout.module.scss';

class Layout extends Component {
  constructor() {
    super();

    this.state = {
      displayMode: 'light',
    };
  }

  componentDidMount() {
    const initialDisplayMode =
      window.localStorage.getItem('displayMode') || 'light';

    this.setState({
      displayMode: initialDisplayMode,
    });
  }

  render() {
    const { children, title, description, twitter, github, isPost } = this.props;
    const { displayMode } = this.state;

    console.log(isPost);

    return (
      <div className={styles.Container}>
        <Helmet htmlAttributes={{ displayMode }} />
        <Header
          title={title}
          description={description}
          displayMode={displayMode}
        />
        <main className={styles.Content}>{children}</main>
        <Footer
          twitter={twitter}
          github={github}
          toggleDisplayMode={this.toggleDisplayMode.bind(this)}
          displayMode={displayMode}
        />
      </div>
    );
  }

  toggleDisplayMode() {
    const { displayMode } = this.state;
    const modeToSwitchTo = displayMode === 'dark' ? 'light' : 'dark';

    window.localStorage.setItem('displayMode', modeToSwitchTo);

    this.setState({
      displayMode: modeToSwitchTo,
    });
  }
}

export default ({ children }) => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => (
      <Layout
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        twitter={data.site.siteMetadata.twitter}
        github={data.site.siteMetadata.github}
      >
        {children}
      </Layout>
    )}
  />
);
