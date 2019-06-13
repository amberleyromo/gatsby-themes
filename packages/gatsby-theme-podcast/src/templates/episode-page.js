import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import PodcastPlayer from 'syntax-podcast-player';

import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';
import Support from '../components/Support';
import SEO from '../components/SEO';
// import { formatReadingTime } from "../utils/helpers";
import { rhythm } from '../utils/typography';

import './temp-styles.css';

class EpisodePageTemplate extends React.Component {
  render() {
    const episode = this.props.data.mdx;
    const siteMetadata = get(this.props, 'data.site.siteMetadata');
    const { previous, next, slug } = this.props.pageContext;
    const editUrl = `https://github.com/${siteMetadata.gitOrg}/${
      siteMetadata.siteUrl
    }/edit/master/src/pages/${slug.replace(/\//g, '')}.md`;
    let discussUrl = `https://twitter.com/search?q=${encodeURIComponent(
      `${siteMetadata.siteUrl}${slug}`
    )}`;
    return (
      <Layout location={this.props.location} title={siteMetadata.title}>
        <SEO
          title={episode.frontmatter.title}
          description={episode.frontmatter.description}
          slug={episode.fields.slug}
          embedUrl={episode.frontmatter.embedUrl}
        />

        <Support />

        <PodcastPlayer
          show={{
            number: '1',
            displayNumber: '1',
            title: 'Testing',
            url:
              'https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/219f49/219f4989-7b89-413b-8f22-f290d553de6a/c302abae-9279-4ea1-94ab-f6f2ab9b2fca/11_Cities_tc.mp3'
          }}
        />

        <h2
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: rhythm(0.25)
          }}
        >
          {episode.frontmatter.title}
        </h2>

        <blockquote>{episode.frontmatter.description}</blockquote>

        <MDXRenderer>{episode.body}</MDXRenderer>

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
            display: 'flex',
            marginBottom: rhythm(2.5)
          }}
        />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        {/* <Footer /> */}
      </Layout>
    );
  }
}

export default EpisodePageTemplate;

export const query = graphql`
  query EpisodeBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        gitOrg
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      timeToRead
      frontmatter {
        title
        time
        date(formatString: "MMMM DD, YYYY")
        description
        episodeLink
        embedUrl
      }
      fields {
        slug
      }
    }
  }
`;
