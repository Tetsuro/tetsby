import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../Header';
import Footer from '../Footer';

import styles from './Layout.module.scss';

class Layout extends Component {
  constructor() {
    super();

    this.state = {
      displayMode: undefined,
    };
  }

  componentDidMount() {
    const initialDisplayMode = window.localStorage.getItem('displayMode');
    console.log(initialDisplayMode);
    this.setState({
      displayMode: initialDisplayMode,
    });
  }

  render() {
    const { children, title, description, twitter, github } = this.props;

    return (
      <div className={styles.Container}>
        <Header title={title} description={description} />
        <main className={styles.Content}>{children}</main>
        <Footer
          twitter={twitter}
          github={github}
          toggleDisplayMode={this.toggleDisplayMode.bind(this)}
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
