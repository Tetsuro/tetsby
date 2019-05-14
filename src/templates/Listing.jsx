import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
// import Image from '../components/image';
import Seo from '../components/seo';

class PostListing extends Component {
  render() {
    const { edges } = this.props.data.allWordpressPost;
    const nodes = edges.map(({ node }) => node);
    // const { currentPage, numberOfPages } = this.props.pageContext;
    // const defaultThumbnail = this.props.data.allImageSharp.edges[0].node.fixed;
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
        <Seo />
        <ul>{listItems}</ul>
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

export default PostListing;
