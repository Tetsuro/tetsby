import React, {Component} from 'react';
import {Link, graphql} from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';

import styles from './Page.module.scss';

class Page extends Component {
  render() {
    const {title, content} = this.props.data.wordpressPage;

    return (
      <>
        <SEO title={title} />
        <h1
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        <div
          className={styles.Page}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </>
    );
  }
}

export default Page;

export const query = graphql`
  query($slug: String!) {
    wordpressPage(slug: {eq: $slug}) {
      title
      content
    }
  }
`;
