import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';

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
      const alt_text = item.featured_media
        ? item.featured_media.alt_text
        : null;

      const localFile = item.featured_media
        ? item.featured_media.localFile
        : null;

      const fluid = localFile ? localFile.childImageSharp.fluid : null;

      return (
        <ListingItem
          key={item.id}
          id={item.id}
          title={item.title}
          slug={item.slug}
          date={item.date}
          alt_text={alt_text}
          fluid={fluid}
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
      }
    }
  }
`;

export default Listing;
