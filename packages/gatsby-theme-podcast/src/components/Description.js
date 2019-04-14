import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-mdx";

const query = graphql`
  query getDescription {
    mdx(fileAbsolutePath: { regex: "/content/fragments/description/" }) {
      id
      code {
        body
      }
    }
  }
`;

const PodcastDescription = () => (
  <StaticQuery
    query={query}
    render={data => {
      return <MDXRenderer>{data.mdx.code.body}</MDXRenderer>;
    }}
  />
);

export default PodcastDescription;
