import React, { Fragment } from "react";
import { StaticQuery, graphql } from "gatsby";
import { TwitterTweetEmbed } from "react-twitter-embed";

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

      console.log("praise", praise);
      return (
        <Fragment>
          {praise.map(tweetId => (
            <TwitterTweetEmbed
              key={tweetId}
              tweetId={tweetId}
              options={{ conversation: "none" }}
            />
          ))}
        </Fragment>
      );
    }}
  />
);

export default PodcastDescription;
