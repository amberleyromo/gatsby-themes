const fs = require("fs");
const path = require("path");
const Parser = require("rss-parser");
const parser = new Parser();
const crypto = require("crypto");

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

const createContentDigest = obj =>
  crypto
    .createHash("md5")
    .update(JSON.stringify(obj))
    .digest("hex");

const generateRSSItemSlug = title => {
  return (
    title
      // remove non-alphanumeric characters, except spaces
      .replace(/[^\w\s]/gi, "")
      .toLowerCase()
      .split(" ")
      .join("-")
  );
};

const durationToMinutes = durationInSeconds => {
  return Math.floor(durationInSeconds / 60);
};

// hackity hack. this extracts the first paragraph from the description
const extractFirstParagraph = html => {
  return html.match(/<p>(.*?)<\/p>/)[0];
};

async function sourceNodes({ actions }, { rssSource = "" }) {
  if (!rssSource) {
    console.log(`gatsby-theme-podcast requires an RSS feed`);
    return;
  }
  const { createNode } = actions;
  const data = await parser.parseURL(rssSource);

  if (!data) {
    return;
  }

  // Create nodes for top-level RSS feed info
  const { title, description, link, image, items } = data;
  const feedInfo = {
    id: link,
    title,
    description,
    link,
    imageUrl: image.url,
    parent: null
  };

  feedInfo.internal = {
    type: "rssFeedInfo",
    contentDigest: createContentDigest(feedInfo)
  };

  createNode(feedInfo);

  // Create nodes for RSS items
  // Prepare RSS item nodes
  const prepareRssItemNodes = items.map(rssItem => {
    let slug = generateRSSItemSlug(rssItem.title);
    let excerpt = extractFirstParagraph(rssItem.content);
    let duration = durationToMinutes(rssItem.itunes.duration);
    const node = Object.assign({}, rssItem, {
      id: rssItem.link,
      title: rssItem.title,
      content: rssItem.content,
      link: rssItem.link,
      excerpt,
      duration,
      slug,
      parent: null
    });
    node.internal = {
      type: "rssFeedItem",
      contentDigest: createContentDigest(node)
    };
    return node;
  });
  // Create RSS item nodes
  prepareRssItemNodes.forEach(rssItemNode => createNode(rssItemNode));
}

exports.sourceNodes = sourceNodes;

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

let userCreatedOwnEpisodes = false;

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    // create source field
    const fileNode = getNode(node.parent);

    const source = fileNode.sourceInstanceName;

    createNodeField({
      node,
      name: `source`,
      value: source
    });

    const eligibleEpisodeSources = [
      "podcast-demo-episodes",
      "podcast-episodes"
    ];

    if (eligibleEpisodeSources.includes(source)) {
      if (source === "podcast-episodes") {
        userCreatedOwnEpisodes = true;
      }

      if (userCreatedOwnEpisodes && source === "podcast-demo-episodes") {
        return;
      }

      // create slug for episode pages
      const value = path.parse(node.fileAbsolutePath).name;
      createNodeField({
        name: `slug`,
        node,
        value
      });
    }
  }
};
