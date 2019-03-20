import React, { Fragment } from "react";
import { StaticQuery, graphql } from "gatsby";
import { TwitterTweetEmbed } from "react-twitter-embed";
import colors from "../tokens/colors";

const query = graphql`
  query getTestimonials {
    site {
      siteMetadata {
        praise
      }
    }
  }
`;

const PodcastDescription = () => (
  <StaticQuery
    query={query}
    render={data => {
      const {
        site: {
          siteMetadata: { praise }
        }
      } = data;
      console.log("colors.green", colors.textLink);

      return (
        <div
          style={{
            position: `static`,
            visibility: `visible`,
            display: `block`,
            transform: `rotate(0deg)`,
            width: `500px`,
            margin: `3rem auto`,
            maxWidth: `100%`,
            minWidth: `220px`
          }}
        >
          <h3 style={{ textAlign: "center", color: colors.textLink }}>
            Praise
          </h3>
          {praise.map(tweetId => (
            <TwitterTweetEmbed
              key={tweetId}
              tweetId={tweetId}
              options={{ conversation: "none" }}
            />
          ))}
        </div>
      );
    }}
  />
);

export default PodcastDescription;
