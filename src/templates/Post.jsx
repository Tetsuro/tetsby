import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import stripHtml from 'string-strip-html';
import parse from 'html-react-parser';

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
      slug,
      featured_media,
    } = this.props.data.wordpressPost;

    const { newerPostSlug, olderPostSlug } = this.props.pageContext;
    const { edges } = this.props.data.allWordpressWpComments;
    const comments = edges.map(({ node }) => node);
    const alt_text = featured_media ? featured_media.alt_text : null;
    const source_url = featured_media ? featured_media.source_url : null;
    const localFile = featured_media ? featured_media.localFile : null;
    const fluid = localFile ? localFile.childImageSharp.fluid : null;

    const featuredImageMarkup = fluid ? (
      <Img fluid={fluid} className={styles.FeaturedImage} alt={alt_text} />
    ) : null;

    const commentsMarkup = comments.length ? (
      <CommentsList comments={comments} />
    ) : null;

    // Need this check because apparently it's impossible for Wordpress
    // NOT to auto-generate an excerpt if none exists...
    const excerptMarkup = excerpt.includes('<p>&hellip;</p>') ? null : (
      <div
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
    );

    return (
      <>
        <SEO
          title={parse(title)}
          description={stripHtml(excerpt)}
          image={source_url}
        />
        <h1
          dangerouslySetInnerHTML={{
            __html: title,
          }}
          className={styles.PostHeading}
        />
        <div className={styles.PostDate}>{date}</div>
        {featuredImageMarkup}
        {excerptMarkup}
        <hr />
        <div
          className={styles.PostContent}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        {commentsMarkup}
        <CommentForm postId={wordpress_id} slug={slug} />
        <PostFooterLinks
          newerPostSlug={newerPostSlug}
          olderPostSlug={olderPostSlug}
        />
      </>
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
      slug
      featured_media {
        source_url
        alt_text
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
