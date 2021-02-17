import React from 'react';
import Helmet from 'react-helmet';
import {useStaticQuery, graphql} from 'gatsby';

import favicon16 from '../images/favicon-16x16.png';
import favicon32 from '../images/favicon-32x32.png';

function SEO({description, lang, meta, keywords, title, image}) {
  const {site} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const DEFAULT_IMAGE_URL = `${process.env.GATSBY_WP_PROTOCOL}://${process.env.GATSBY_WP_BASE_URL}/wp-content/uploads/2009/07/IMG_4095-e1457208256153.jpg`;
  const metaDescription = description || site.siteMetadata.description;
  const titleTemplate = title ? `${site.siteMetadata.title} » %s` : null;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title ? title : site.siteMetadata.title}
      titleTemplate={titleTemplate}
      link={[
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: `${favicon16}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: `${favicon32}`,
        },
      ]}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title ? title : site.siteMetadata.title,
        },
        {
          property: 'og:image',
          content: image ? image : DEFAULT_IMAGE_URL,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title ? title : site.siteMetadata.title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: 'keywords',
                content: keywords.join(', '),
              }
            : []
        )
        .concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
  description: '',
  title: '',
};

export default SEO;
