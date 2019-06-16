import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

const query = graphql`
  query getDescription {
    mdx(fileAbsolutePath: { regex: "/content/fragments/description/" }) {
      id
      body
    }
  }
`;

const PodcastDescription = () => (
  <StaticQuery
    query={query}
    render={data => {
      return <MDXRenderer>{data.mdx.body}</MDXRenderer>;
    }}
  />
);

export default PodcastDescription;
