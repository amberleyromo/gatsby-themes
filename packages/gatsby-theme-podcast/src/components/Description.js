import React from "react";
import { useStaticQuery, graphql } from "gatsby";
// import { MDXRenderer } from "gatsby-plugin-mdx";

const query = graphql`
  query getDescription {
    # mdx(fileAbsolutePath: { regex: "/content/fragments/description/" }) {
    #   id
    #   body
    # }
    rssFeed {
      description
    }
  }
`;

export default () => {
  const data = useStaticQuery(query);
  return <p>{data.rssFeed.description}</p>;
};
