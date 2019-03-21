const pkg = require("./package.json");

module.exports = {
  siteMetadata: {
    title: "The podcast title",
    author: "Jane Doe & John Doe",
    description: "Description of the show.",
    gitOrg: "GitHub org name for the podcast site",
    siteUrl: "yoursiteurl.com",
    social: {
      twitter: "@yourshowhandle"
    },
    sources: [
      {
        name: "RSS",
        url: "https://feeds.simplecast.com/9H3Jd25O"
      },
      {
        name: "Google",
        url:
          "https://www.google.com/podcasts?feed=aHR0cHM6Ly9yc3Muc2ltcGxlY2FzdC5jb20vcG9kY2FzdHMvNzA0OS9yc3M%3D"
      },
      {
        name: "Apple",
        url: "https://itunes.apple.com/us/podcast/hope-in-source/id1437677655"
      },
      {
        name: "Spotify",
        url: "https://open.spotify.com/show/5EXwiyKzPrrucncKyrHy0B"
      },
      {
        name: "GitHub",
        url: "https://github.com/hzoo/hopeinsource.com"
      }
    ],
    // Tweet ids
    praise: [
      `1059181425184755713`,
      `1052646871154548738`,
      `1053342917014753281`
    ]
  },
  plugins: [
    /*
     * We need to make sure that Webpack processes this theme as ES6, so we add
     * this plugin and specify the package name in `modules`.
     */
    {
      resolve: "gatsby-plugin-compile-es6-packages",
      options: {
        modules: [pkg.name]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "podcast-episodes",
        path: "content/episodes"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "podcast-demo-episodes",
        path: `${__dirname}/content/episodes`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "podcast-fragments",
        path: "content/fragments"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "podcast-demo-fragments",
        path: `${__dirname}/content/fragments`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "podcast-assets",
        path: "content/assets"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "podcast-demo-assets",
        path: `${__dirname}/content/assets`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: require.resolve(`./src/utils/typography`)
      }
    },
    {
      resolve: "gatsby-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.js")
        }
      }
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/pages`
      }
    }
  ]
};
