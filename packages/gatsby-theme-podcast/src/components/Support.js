import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const query = graphql`
  query getSupport {
    mdx(fileAbsolutePath: { regex: "/content/fragments/support/" }) {
      id
      body
    }
  }
`;

const Support = () => (
  <StaticQuery
    query={query}
    render={data => {
      return (
        <div
          style={{
            maxWidth: 620,
            backgroundColor: '#4F5B66',
            textAlign: 'center'
          }}
        >
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </div>
      );
    }}
  />
);

export default Support;
