import React, { Component } from 'react';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';
import stripHtml from 'string-strip-html';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import CommentsList from '../components/CommentsList';
import CommentForm from '../components/CommentForm';
import PostFooterLinks from '../components/PostFooterLinks';

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
    } = this.props.data.wordpressPost;

    const { newerPostSlug, olderPostSlug } = this.props.pageContext;
    const { edges } = this.props.data.allWordpressWpComments;
    const comments = edges.map(({ node }) => node);

    const featuredImageMarkup = better_featured_image ? (
      <img
        src={better_featured_image.source_url}
        alt={better_featured_image.alt_text}
        className={styles.FeaturedImage}
      />
    ) : null;

    const commentsMarkup = comments.length ? (
      <CommentsList comments={comments} />
    ) : null;

    // Need this check because apparently it's impossible for Wordpress
    // NOT to auto-generate an excerpt if none exists...
    const excerptMarkup = excerpt.includes('<p>&hellip;</p>') ? null : (
      <div>{parse(excerpt)}</div>
    );

    return (
      <Layout>
        <SEO
          title={parse(title)}
          description={stripHtml(excerpt)}
          image={better_featured_image.source_url}
        />
        <h1 className={styles.PostHeading}>{parse(title)}</h1>
        <div className={styles.PostDate}>{date}</div>
        {featuredImageMarkup}
        {excerptMarkup}
        <hr />
        <div className={styles.PostContent}>{parse(content)}</div>
        {commentsMarkup}
        <CommentForm postId={wordpress_id} />
        <PostFooterLinks
          newerPostSlug={newerPostSlug}
          olderPostSlug={olderPostSlug}
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
    allWordpressWpComments(
      filter: { post: { eq: $wordpressId } }
      sort: { fields: [date] }
    ) {
      edges {
        node {
          id
          content
          author_name
          author_url
          date(formatString: "MMMM Do, YYYY")
          author_avatar_urls {
            wordpress_96
          }
        }
      }
    }
  }
`;
