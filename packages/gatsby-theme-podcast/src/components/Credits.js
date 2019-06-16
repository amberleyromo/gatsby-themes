import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const query = graphql`
  query getCredits {
    mdx(fileAbsolutePath: { regex: "/content/fragments/credits/" }) {
      id
      body
    }
  }
`;

const PodcastCredits = () => (
  <StaticQuery
    query={query}
    render={data => {
      return <MDXRenderer>{data.mdx.body}</MDXRenderer>;
    }}
  />
);

export default PodcastCredits;
