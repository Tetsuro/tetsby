import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../Header';

import styles from './Layout.module.scss';

class Layout extends Component {
  render() {
    const { children, title } = this.props;

    return (
      <div className={styles.Container}>
        <Header title={title} />
        <p>{children}</p>
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
          }
        }
      }
    `}
    render={data => (
      <Layout title={data.site.siteMetadata.title}>{children}</Layout>
    )}
  />
);
