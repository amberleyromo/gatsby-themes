import React, { Fragment } from "react";
import { Link, StaticQuery, graphql } from "gatsby";

const query = graphql`
  query getEpisodes {
    allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: { fileAbsolutePath: { regex: "/episodes/" } }
      limit: 1000
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            time
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

const PostTeasers = () => (
  <StaticQuery
    query={query}
    render={data => {
      const {
        allMdx: { edges: episodes }
      } = data;
      return (
        <Fragment>
          {episodes.map(({ node: episode }) => {
            const {
              frontmatter: { title, date, time, description },
              fields: { slug }
            } = episode;
            return (
              <div
                style={{
                  textAlign: "left"
                }}
                key={episode.id}
              >
                <h3
                  style={{
                    marginTop: "1rem",
                    marginBottom: "0.4375rem",
                    textDecoration: "underline"
                  }}
                >
                  <Link style={{ boxShadow: "none" }} to={`/${slug}`}>
                    {title}
                  </Link>
                </h3>
                <small>
                  {date}
                  {` • ${time} min 🎧`}
                </small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: description
                  }}
                />
              </div>
            );
          })}
        </Fragment>
      );
    }}
  />
);

export default PostTeasers;
