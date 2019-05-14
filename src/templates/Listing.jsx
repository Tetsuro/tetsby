import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';

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
      <Link to={newerPostsLinkUrl} rel="prev">
        Newer posts →
      </Link>
    );

    const olderPostsLinkUrl = `/page/${currentPage + 1}`;
    const olderPostsLinkMarkup = isLast ? null : (
      <Link to={olderPostsLinkUrl} rel="next">
        ← Older posts
      </Link>
    );

    const listItems = nodes.map(item => {
      return (
        <li key={item.id}>
          <Link to={`/${item.slug}`}>
            <span
              dangerouslySetInnerHTML={{
                __html: item.title,
              }}
            />
          </Link>
        </li>
      );
    });

    return (
      <Layout>
        <SEO />
        <ul>{listItems}</ul>
        <div>
          {olderPostsLinkMarkup}
          {newerPostsLinkMarkup}
        </div>
      </Layout>
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
        }
      }
    }
  }
`;

export default Listing;
