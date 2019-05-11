import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../Header';

import '../../stylesheets/base.scss';
import styles from './Layout.module.scss';

class Layout extends Component {
  render() {
    const { children, title, description } = this.props;

    return (
      <div className={styles.Container}>
        <Header title={title} description={description} />
        <main>{children}</main>
      </div>
    );
  }
}

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <Layout
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
      >
        {children}
      </Layout>
    )}
  />
);
