import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import parse from 'html-react-parser';

import favicon16 from '../images/favicon-16x16.png';
import favicon32 from '../images/favicon-32x32.png';
import appleIcon from '../images/apple-touch-icon.png';
import defaultImage from '../images/tetchi-profile.jpg';

function SEO({ description, lang, meta, keywords, title, image }) {
  const { site } = useStaticQuery(
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

  console.log(title);
  const metaDescription = description || site.siteMetadata.description;
  const parsedTitle = title ? parse(title) : site.siteMetadata.title;
  console.log(parsedTitle);
  const titleTemplate = title ? `${site.siteMetadata.title} » %s` : null;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={parsedTitle || site.siteMetadata.title}
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
        {
          rel: 'icon',
          type: 'apple-touch-icon',
          sizes: '180x180',
          href: `${appleIcon}`,
        },
      ]}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:site_name',
          content: title,
        },
        {
          property: 'og:type',
          content: 'blog',
        },
        {
          property: 'og:title',
          content: title,
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
          property: 'og:image',
          content: image ? image : defaultImage,
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
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'robots',
          content: 'noindex',
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
