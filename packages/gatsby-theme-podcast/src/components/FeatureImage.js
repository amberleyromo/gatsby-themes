import React from "react";
import { StaticQuery, graphql } from "gatsby";
// import PropTypes from 'prop-types';
import Img from "gatsby-image";

const query = graphql`
  # done so can pass any image type
  query getFeatureImage {
    allFile(
      filter: {
        relativePath: { regex: "assets/feature-image.(jpe?g|png|gif|bmp)/" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

const FeatureImage = () => (
  <StaticQuery
    query={query}
    render={data => {
      const {
        allFile: {
          edges: [
            {
              node: {
                childImageSharp: { fluid }
              }
            }
          ]
        }
      } = data;
      return (
        <Img
          style={{ width: "100%", marginBottom: "1.75rem" }}
          fluid={fluid}
          alt="Hope in Source Cover Art"
        />
      );
    }}
  />
);

export default FeatureImage;
