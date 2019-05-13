import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';

class PostListing extends Component {
  render() {
    const { edges } = this.props.data.allWordpressPost;
    const nodes = edges.map(({ node }) => node);
    // const { currentPage, numberOfPages } = this.props.pageContext;
    // const defaultThumbnail = this.props.data.allImageSharp.edges[0].node.fixed;
    const listItems = nodes.map(item => {
      return (
        <li>
          <span
            dangerouslySetInnerHTML={{
              __html: item.title,
            }}
          />
        </li>
      );
    });

    return (
      <Layout>
        <SEO title="Home" />
        {/* <PostList
          nodes={nodes}
          defaultThumbnail={defaultThumbnail}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
        /> */}
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
