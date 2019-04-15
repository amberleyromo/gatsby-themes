import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

const query = graphql`
  query getSEOData {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
        social {
          twitter
        }
        sources {
          name
          url
        }
        appleAppId
      }
    }
    allFile(
      filter: {
        relativePath: { regex: "assets/feature-image.(jpe?g|png|gif|bmp)/" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fixed(width: 700, height: 700) {
              src
            }
          }
        }
      }
    }
  }
`;

function SEO({ meta, image, title, description, slug, embedUrl }) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { siteMetadata } = data.site;
        const { edges: files } = data.allFile;
        const {
          node: {
            childImageSharp: {
              fixed: { src: defaultImage }
            }
          }
        } = files[0];
        const metaDescription = description || siteMetadata.description;
        const metaImage =
          image || defaultImage
            ? `${siteMetadata.siteUrl}${image || defaultImage}`
            : null;
        const url = `${siteMetadata.siteUrl}${slug}`;
        const rss =
          siteMetadata.sources.filter(source => source.name === "RSS") || {};
        const rssFeedUrl = rss.url;
        return (
          <Helmet
            htmlAttributes={{ lang: "en" }}
            {...(title
              ? {
                  titleTemplate: `%s - ${siteMetadata.title}`,
                  title
                }
              : {
                  title: siteMetadata.title
                })}
            meta={[
              {
                name: "description",
                content: metaDescription
              },
              {
                property: "og:url",
                content: url
              },
              {
                property: "og:title",
                content: title || siteMetadata.title
              },
              {
                name: "og:description",
                content: metaDescription
              },
              {
                name: "twitter:card",
                content: embedUrl ? "player" : "summary"
              },
              {
                name: "twitter:creator",
                content: siteMetadata.social.twitter
              }
            ]
              .concat(
                metaImage
                  ? [
                      {
                        property: "og:image",
                        content: metaImage
                      }
                    ]
                  : []
              )
              .concat(
                embedUrl
                  ? [
                      {
                        name: "twitter:player",
                        content: `${embedUrl}`
                      },
                      {
                        name: "twitter:player:width",
                        content: "438"
                      },
                      {
                        name: "twitter:player:height",
                        content: "52"
                      }
                    ]
                  : []
              )
              .concat(
                appleAppId
                  ? [
                      {
                        name: "apple-itunes-app",
                        content: `app-id=${appId}`
                      }
                    ]
                  : []
              )
              .concat(meta)}
          >
            {rssFeedUrl && (
              <link
                rel="alternate"
                type="application/rss+xml"
                title={siteMetadata.title}
                href={rssFeedUrl}
              />
            )}
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  meta: [],
  title: "",
  slug: ""
};

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.array,
  slug: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default SEO;
