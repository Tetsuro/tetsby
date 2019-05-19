const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allWordpressPost {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
      allWordpressPage {
        edges {
          node {
            title
            content
            slug
            wordpress_id
          }
        }
      }
    }
  `).then(result => {
    const pages = result.data.allWordpressPage.edges;

    pages.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve('./src/templates/Page.jsx'),
        context: {
          slug: node.slug,
        },
      });
    });

    const posts = result.data.allWordpressPost.edges;
    const postsPerPage = 20;
    const numberOfPages = Math.ceil(posts.length / postsPerPage);

    posts.forEach(({ node }, i) => {
      const newerPostSlug = i === 0 ? null : posts[i - 1].node.slug;
      const olderPostSlug =
        i === posts.length - 1 ? null : posts[i + 1].node.slug;

      createPage({
        path: node.slug,
        component: path.resolve('./src/templates/Post.jsx'),
        context: {
          slug: node.slug,
          wordpressId: node.wordpress_id,
          newerPostSlug,
          olderPostSlug,
        },
      });

      createPage({
        path: i === 0 ? '/' : `/page/${i + 1}`,
        component: path.resolve('./src/templates/Listing.jsx'),
        context: {
          currentPage: i + 1,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numberOfPages,
        },
      });
    });
  });
};
