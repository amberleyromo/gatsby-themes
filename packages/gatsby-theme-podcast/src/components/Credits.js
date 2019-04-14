import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-mdx";

const query = graphql`
  query getCredits {
    mdx(fileAbsolutePath: { regex: "/content/fragments/credits/" }) {
      id
      code {
        body
      }
    }
  }
`;

const PodcastCredits = () => (
  <StaticQuery
    query={query}
    render={data => {
      return <MDXRenderer>{data.mdx.code.body}</MDXRenderer>;
    }}
  />
);

export default PodcastCredits;
