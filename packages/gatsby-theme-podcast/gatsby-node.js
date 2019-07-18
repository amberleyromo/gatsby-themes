const fs = require("fs");
const path = require("path");

exports.onPreBootstrap = ({ reporter }) => {
  const dirs = [
    "content",
    "content/episodes",
    "content/fragments",
    "content/assets"
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });
};

exports.createPages = async function createPages({ graphql, actions }) {
  const { createPage } = actions;
  const rssItemPage = require.resolve("./src/templates/episode-page.js");
  const result = await graphql(
    `
      {
        allRssFeedItem(sort: { fields: [pubDate], order: DESC }) {
          nodes {
            title
            slug
          }
        }
      }
    `
  ).then(response => {
    if (response.errors) {
      throw new Error(response.errors);
    }
    return response;
  });

  // Create item pages.
  const rssItems = result.data.allRssFeedItem.nodes;
  rssItems.forEach((rssItem, index) => {
    const previous =
      index === rssItems.length - 1 ? null : rssItems[index + 1].node;
    const next = index === 0 ? null : rssItems[index - 1].node;

    createPage({
      path: rssItem.slug,
      component: rssItemPage,
      context: {
        slug: rssItem.slug,
        previous,
        next
      }
    });
  });
};

// Connect mdx notes/transcripts to episode
exports.onCreateNode = async ({ node, actions, getNodesByType }) => {
  const { createParentChildLink } = actions;

  if (node.internal.type !== `Mdx`) {
    return;
  }

  const rssItemNodes = getNodesByType(`rssFeedItem`);

  const filtered = rssItemNodes.find(rssItemNode => {
    return rssItemNode.link === node.frontmatter.boop;
  });

  if (filtered) {
    createParentChildLink({ parent: filtered, child: node });
  }
};
