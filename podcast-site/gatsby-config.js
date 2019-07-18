module.exports = {
  siteMetadata: {
    title: "Fullstack Health",
    author: "Amberley Romo & Kurt Kemple",
    description:
      "A podcast about physical and mental health and the tech industry.",
    gitOrg: "amberleyromo",
    siteUrl: "https://fullstack.health",
    social: {
      twitter: "@FullstackHealth"
    },
    praise: [`1145685107845603329`],
    sources: [
      {
        name: "RSS",
        url: "https://feeds.simplecast.com/"
      },
      {
        name: "Apple",
        url:
          "https://podcasts.apple.com/us/podcast/fullstack-health/id1471885563"
      },
      {
        name: "Google",
        url:
          "https://www.google.com/podcasts?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy9jMTU3NDM4L3BvZGNhc3QvcnNz"
      },
      {
        name: "Spotify",
        url: "https://open.spotify.com/show/7dBdY84WENnRHOhksaXsxH"
      },
      {
        name: "PocketCasts",
        url: "https://pca.st/1EA3"
      }
    ]
  },
  plugins: [
    {
      resolve: "gatsby-theme-podcast",
      options: {
        rssSource: "https://anchor.fm/s/c157438/podcast/rss"
      }
    }
  ]
};
