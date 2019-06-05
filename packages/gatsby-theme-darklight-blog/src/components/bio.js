/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { Styled, css, Flex } from "theme-ui"
import BioContent from "./bio-content.js"

const Bio = () => {
  const data = useStaticQuery(bioQuery)
  const {
    site: {
      siteMetadata: { author },
    },
    avatar,
  } = data

  return (
    <Flex mb={4}>
      <Image
        fixed={avatar.childImageSharp.fixed}
        alt={author}
        css={css({
          mr: 2,
          mb: 0,
          width: 48,
          borderRadius: 99999,
        })}
      />
      <Styled.p>
        <BioContent />
      </Styled.p>
    </Flex>
  )
}

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
      }
    }
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 48, height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Bio
