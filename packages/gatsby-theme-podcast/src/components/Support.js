import React, { Fragment } from "react";
import { StaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-mdx";

const query = graphql`
  query getSupport {
    mdx(fileAbsolutePath: { regex: "/content/fragments/support/" }) {
      id
      code {
        body
      }
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
            backgroundColor: "#4F5B66",
            textAlign: "center"
          }}
        >
          <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
        </div>
      );
    }}
  />
);

export default Support;
