import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';

import styles from './Post.module.scss';

class Post extends Component {
  render() {
    const {
      title,
      content,
      excerpt,
      wordpress_id,
      date,
      better_featured_image,
      type,
    } = this.props.data.wordpressPost;

    const featuredImageMarkup = better_featured_image ? (
      <img
        src={better_featured_image.source_url}
        alt={better_featured_image.alt_text}
        className={styles.FeaturedImage}
      />
    ) : null;

    return (
      <Layout>
        <SEO title={title} description={excerpt} />
        <h1
          dangerouslySetInnerHTML={{
            __html: title,
          }}
          className={styles.PostHeading}
        />
        <div className={styles.PostDate}>{date}</div>
        {featuredImageMarkup}
        <div
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
        />
        <hr />
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </Layout>
    );
  }
}

export default Post;

export const query = graphql`
  query($slug: String!, $wordpressId: Int!) {
    wordpressPost(slug: { eq: $slug }) {
      title
      content
      wordpress_id
      excerpt
      date(formatString: "MMMM Do, YYYY")
      type
      better_featured_image {
        alt_text
        source_url
      }
    }
    allWordpressWpComments(filter: { post: { eq: $wordpressId } }) {
      edges {
        node {
          content
          author_name
          date(formatString: "MMMM Do, YYYY")
        }
      }
    }
  }
`;
