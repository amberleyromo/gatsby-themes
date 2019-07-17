import React, { Fragment } from "react";
import { useStaticQuery, graphql } from "gatsby";

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

const Sources = () => {
  const data = useStaticQuery(query);
  const metaData = data.site.siteMetadata;
  console.log(`metaData.sources`, metaData.sources);
  const lastSource = metaData.sources.length - 1;
  return (
    <p style={{ textAlign: "center" }}>
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
};

export default Sources;
