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

const createChildren = (items, parentId, createNode) => {
  const childIds = [];
  items.forEach(item => {
    childIds.push(item.link);
    const node = Object.assign({}, item, {
      id: item.link,
      title: item.title,
      description: item.description,
      link: item.link,
      parent: parentId,
      children: []
    });
    node.internal = {
      type: "rssFeedItem",
      contentDigest: createContentDigest(node)
    };
    createNode(node);
  });
  return childIds;
};

const generateEpisodeSlug = title => {
  return (
    title
      // remove non-alphanumeric characters, except spaces
      .replace(/[^\w\s]/gi, "")
      .toLowerCase()
      .split(" ")
      .join("-")
  );
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
  const { title, description, link, image, items } = data;
  let slug = generateEpisodeSlug(title);
  const childrenIds = createChildren(items, link, createNode);
  const feedStory = {
    id: link,
    // slug, // adding new fields breaks things?
    title,
    description,
    link,
    // imageUrl: image.url, // adding new fields breaks things?
    parent: null,
    children: childrenIds
  };

  feedStory.internal = {
    type: "rssFeed",
    contentDigest: createContentDigest(feedStory)
  };

  createNode(feedStory);
}

exports.sourceNodes = sourceNodes;

exports.createPages = async function createPages({ graphql, actions }) {
  const { createPage } = actions;
  const episodePage = require.resolve("./src/templates/episode-page.js");
  const result = await graphql(
    `
      {
        allMdx(
          sort: {
            fields: [frontmatter___date, frontmatter___title]
            order: DESC
          }
          filter: {
            fields: {
              source: { in: ["podcast-demo-episodes", "podcast-episodes"] }
              slug: { ne: null }
            }
          }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
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

  // Create episode pages.
  const episodes = result.data.allMdx.edges;
  episodes.forEach((episode, index) => {
    const previous =
      index === episodes.length - 1 ? null : episodes[index + 1].node;
    const next = index === 0 ? null : episodes[index - 1].node;

    createPage({
      path: episode.node.fields.slug,
      component: episodePage,
      context: {
        slug: episode.node.fields.slug,
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
