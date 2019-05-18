import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../Header';
import Footer from '../Footer';

import '../../stylesheets/base.scss';
import styles from './Layout.module.scss';

class Layout extends Component {
  render() {
    const { children, title, description, twitter, github } = this.props;

    return (
      <div className={styles.Container}>
        <Header title={title} description={description} />
        <main className={styles.Content}>{children}</main>
        <Footer twitter={twitter} github={github} />
      </div>
    );
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
