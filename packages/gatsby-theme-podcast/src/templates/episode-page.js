import React from "react";
import { Link, graphql } from "gatsby";
import get from "lodash/get";
import PodcastPlayer from "syntax-podcast-player";

import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";
import Support from "../components/Support";
import SEO from "../components/SEO";
// import { formatReadingTime } from "../utils/helpers";
import { rhythm } from "../utils/typography";

import "./player-styles.css";
class RssItemPageTemplate extends React.Component {
  render() {
    const rssItem = this.props.data.rssFeedItem;
    const siteMetadata = get(this.props, "data.site.siteMetadata");
    const { previous, next, slug } = this.props.pageContext;
    const editUrl = `https://github.com/${siteMetadata.gitOrg}/${
      siteMetadata.siteUrl
    }/edit/master/src/pages/${slug.replace(/\//g, "")}.md`;
    let discussUrl = `https://twitter.com/search?q=${encodeURIComponent(
      `${siteMetadata.siteUrl}${slug}`
    )}`;
    // "trailer" has a "null" value
    let itemNumber = rssItem.itunes.episode || "0";
    return (
      <Layout location={this.props.location} title={siteMetadata.title}>
        <SEO
          title={rssItem.title}
          description={rssItem.excerpt}
          slug={rssItem.slug}
          embedUrl={rssItem.audio.url}
        />

        <Support />

        <PodcastPlayer
          show={{
            number: itemNumber,
            displayNumber: itemNumber,
            title: rssItem.title,
            url: rssItem.audio.url
          }}
        />

        <article
          style={{
            maxWidth: "42rem",
            margin: "2.6rem auto 0 auto"
          }}
        >
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              marginTop: rhythm(0.25)
            }}
          >
            {rssItem.title}
          </h2>

          <blockquote>{rssItem.excerpt}</blockquote>

          <p>
            @TODO: Need to create a way to add additional episode/show content,
            like transcripts and show notes
          </p>

          <p>
            <a href={discussUrl} target="_blank" rel="noopener noreferrer">
              Discuss on Twitter
            </a>
            {` • `}
            <a href={editUrl} target="_blank" rel="noopener noreferrer">
              Edit on GitHub
            </a>
          </p>
          <div
            style={{
              display: "flex",
              marginBottom: rhythm(2.5)
            }}
          />
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              listStyle: "none",
              marginLeft: "1rem",
              padding: 0
            }}
          >
            <li>
              {previous && (
                <Link to={previous.slug} rel="prev">
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.slug} rel="next">
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </article>
        {/* <Footer /> */}
      </Layout>
    );
  }
}

export default RssItemPageTemplate;

export const query = graphql`
  query RssItemBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        gitOrg
        siteUrl
      }
    }
    rssFeedItem(slug: { eq: $slug }) {
      id
      title
      isoDate(formatString: "MMMM DD, YYYY")
      content
      itunes {
        duration
        episode
      }
      link
      audio: enclosure {
        url
      }
    }
  }
`;
