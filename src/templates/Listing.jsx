import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/seo';
import ListingItem from '../components/ListingItem';

import styles from './Listing.module.scss';

class Listing extends Component {
  render() {
    const { edges } = this.props.data.allWordpressPost;
    const nodes = edges.map(({ node }) => node);
    const { currentPage, numberOfPages } = this.props.pageContext;

    const isFirst = currentPage === 1;
    const isLast = currentPage === numberOfPages;

    const newerPostsLinkUrl =
      currentPage - 1 === 1 ? '/' : `/page/${currentPage - 1}`;
    const newerPostsLinkMarkup = isFirst ? null : (
      <Link to={newerPostsLinkUrl} rel="prev" className={styles.NextPostsLink}>
        Newer posts »
      </Link>
    );

    const olderPostsLinkUrl = `/page/${currentPage + 1}`;
    const olderPostsLinkMarkup = isLast ? null : (
      <Link to={olderPostsLinkUrl} rel="next">
        « Older posts
      </Link>
    );

    const listItems = nodes.map(item => {
      const betterFeaturedImageSrc = item.better_featured_image
        ? item.better_featured_image.media_details.sizes.medium.source_url
        : null;

      const localFile = item.featured_media
        ? item.featured_media.localFile
        : null;

      const fixed = localFile ? localFile.childImageSharp.fixed : null;

      const featuredImageMarkup = fixed ? <Img fixed={fixed} /> : null;

      return (
        // <>{featuredImageMarkup}</>
        <ListingItem
          key={item.id}
          id={item.id}
          title={item.title}
          slug={item.slug}
          date={item.date}
          featuredImageSrc={
            item.better_featured_image
              ? item.better_featured_image.media_details.sizes.medium.source_url
              : null
          }
          featuredImageAltText={
            item.better_featured_image
              ? item.better_featured_image.alt_text
              : null
          }
          featuredImageMarkup={featuredImageMarkup}
        ></ListingItem>
      );
    });

    return (
      <>
        <SEO />
        <ul className={styles.Listing}>{listItems}</ul>
        <div className={styles.ListingPagination}>
          {olderPostsLinkMarkup}
          {newerPostsLinkMarkup}
        </div>
      </>
    );
  }
}

export const query = graphql`
  query PostsQuery($limit: Int!, $skip: Int!) {
    allWordpressPost(limit: $limit, skip: $skip) {
      edges {
        node {
          id
          title
          slug
          date(formatString: "MMMM Do, YYYY")
          featured_media {
            localFile {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          better_featured_image {
            alt_text
            source_url
            media_details {
              sizes {
                medium {
                  source_url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Listing;
