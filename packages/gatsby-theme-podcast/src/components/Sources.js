import React, { Fragment } from "react";
import { StaticQuery, graphql } from "gatsby";

const query = graphql`
  query getSources {
    site {
      siteMetadata {
        gitOrg
        siteUrl
        sources {
          name
          url
        }
      }
    }
  }
`;

const Sources = () => (
  <StaticQuery
    query={query}
    render={data => {
      const metaData = data.site.siteMetadata;
      const lastSource = metaData.sources.length - 1;
      return (
        <p>
          {metaData.sources.map((source, idx) => {
            return (
              <Fragment key={source.name}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.name}
                </a>
                {idx !== lastSource && <span> &bull; </span>}
              </Fragment>
            );
          })}
        </p>
      );
    }}
  />
);

export default Sources;
