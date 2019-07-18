const crypto = require("crypto");
const Parser = require("rss-parser");
const parser = new Parser();

// Based on and extended from https://github.com/rheajt/gatsby-source-rss/blob/master/src/gatsby-node.js

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

  // Prepare RSS item nodes
  const preparedRssItemNodes = items.map(rssItem => {
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
      parent: null,
      children: []
    });
    node.internal = {
      type: "rssFeedItem",
      contentDigest: createContentDigest(node)
    };
    return node;
  });

  const feedInfo = {
    id: link,
    title,
    description,
    link,
    imageUrl: image.url,
    items___NODE: preparedRssItemNodes.map(node => node.id),
    parent: null
  };

  feedInfo.internal = {
    type: "rssFeedInfo",
    contentDigest: createContentDigest(feedInfo)
  };

  createNode(feedInfo);

  // Actually create nodes for RSS items
  preparedRssItemNodes.forEach(rssItemNode => createNode(rssItemNode));
}

exports.sourceNodes = sourceNodes;
