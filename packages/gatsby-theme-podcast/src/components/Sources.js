import React from "react";
import { StaticQuery, graphql } from "gatsby";

const query = graphql`
  query getFeeds {
    site {
      siteMetadata {
        gitOrg
        siteUrl
        feed {
          rss
          google
          apple
          spotify
        }
      }
    }
  }
`;

// @TODO make this iterable instead of static
const FeedSources = () => (
  <StaticQuery
    query={query}
    render={data => {
      return (
        <StaticQuery
          query={query}
          render={data => {
            const metaData = data.site.siteMetadata;
            return (
              <p>
                <a
                  href={metaData.feed.google}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google
                </a>{" "}
                &bull;{" "}
                <a
                  href={metaData.feed.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apple
                </a>{" "}
                &bull;{" "}
                <a
                  href={metaData.feed.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spotify
                </a>{" "}
                &bull;{" "}
                <a
                  href={metaData.feed.rss}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RSS
                </a>{" "}
                &bull;{" "}
                <a
                  href={`https://github.com/${metaData.gitOrg}/${
                    metaData.siteUrl
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </p>
            );
          }}
        />
      );
    }}
  />
);

export default FeedSources;
