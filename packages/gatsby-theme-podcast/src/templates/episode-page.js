import React from "react";
import { Link, graphql } from "gatsby";
import get from "lodash.get";
import PodcastPlayer from "syntax-podcast-player";

import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";
import Support from "../components/Support";
import SEO from "../components/SEO";
// import { formatReadingTime } from "../utils/helpers";
import { rhythm } from "../utils/typography";

import "./player-styles.css";
import "./transcript.css";

const TranscriptParagraph = props => {
  let hasTimestamp = false;
  const children = React.Children.toArray(props.children).map((child, i) => {
    if (i === 0 && typeof child === "string") {
      const timestamp = child.match(/^\[(\d\d):(\d\d)(?::(\d\d))?\]/);
      if (timestamp) {

        let seconds = 0;
        if (timestamp[3]) {
          seconds =
            Number(timestamp[1]) * 3600 +
            Number(timestamp[2]) * 60 +
            Number(timestamp[3]);
        } else {
          seconds = Number(timestamp[1]) * 60 + Number(timestamp[2]);
        }
        hasTimestamp = seconds;

        return (
          <a
            key={child}
            className="timestamp"
            href={`#playFrom=${seconds}`}
          >
            {child}
          </a>
        );
      }
    }
    return child;
  });

  return (
    <p id={hasTimestamp ? `playFrom=${hasTimestamp}` : ''}>
      {children}
    </p>
  );
};

const components = {
  p: TranscriptParagraph,
}

class RssItemPageTemplate extends React.Component {
  render() {
    const rssItem = this.props.data.rssFeedItem;
    const siteMetadata = get(this.props, "data.site.siteMetadata");
    const { previous, next, slug } = this.props.pageContext;
    // @TODO this won't do anything currently -- no corresponding .md file
    const editUrl = `https://github.com/${siteMetadata.gitOrg}/${
      siteMetadata.siteUrl
    }/edit/master/src/pages/${slug.replace(/\//g, "")}.md`;
    let discussUrl = `https://twitter.com/search?q=${encodeURIComponent(
      `${siteMetadata.siteUrl}/${slug}/`
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

          <blockquote
            dangerouslySetInnerHTML={{
              __html: rssItem.excerpt
            }}
          />

          {
            rssItem.childMdx ?
              <MDXProvider components={components}>
                <MDXRenderer>{rssItem.childMdx.body}</MDXRenderer>
              </MDXProvider>
            : null
          }

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
        episode
      }
      link
      audio: enclosure {
        url
      }
      excerpt
      duration
      childMdx {
        body
      }
    }
  }
`;
