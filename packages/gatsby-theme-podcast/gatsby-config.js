const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    title: 'The podcast title',
    author: 'Jane Doe & John Doe',
    description: 'Description of the show.',
    gitOrg: 'GitHub org name for the podcast site',
    siteUrl: 'https://yoursiteurl.com',
    social: {
      twitter: '@yourshowhandle'
    },
    sources: [
      {
        name: 'RSS',
        url: 'https://feeds.simplecast.com/'
      }
    ],
    // Tweet ids
    praise: [`1117454932880363522`],
    appleAppId: false
  },
  plugins: [
    /*
     * We need to make sure that Webpack processes this theme as ES6, so we add
     * this plugin and specify the package name in `modules`.
     */
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: [pkg.name]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'podcast-episodes',
        path: 'content/episodes'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'podcast-demo-episodes',
        path: `${__dirname}/content/episodes`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'podcast-fragments',
        path: 'content/fragments'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'podcast-demo-fragments',
        path: `${__dirname}/content/fragments`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'podcast-assets',
        path: 'content/assets'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'podcast-demo-assets',
        path: `${__dirname}/content/assets`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: require.resolve(`./src/utils/typography`)
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/Layout.js')
        }
      }
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/pages`
      }
    }
  ]
};
