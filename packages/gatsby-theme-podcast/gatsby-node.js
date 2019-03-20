const { createFilePath } = require(`gatsby-source-filesystem`);
const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");
const _ = require("lodash");

exports.onPreBootstrap = ({ reporter }) => {
  const dirs = ["content", "content/episodes", "content/fragments"];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const episodePage = require.resolve("./src/templates/episode-page.js");
    resolve(
      graphql(
        `
          {
            allMdx(
              sort: {
                fields: [frontmatter___date, frontmatter___title]
                order: DESC
              }
              filter: { fileAbsolutePath: { regex: "/episodes/" } }
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
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create episode pages.
        const episodes = result.data.allMdx.edges;
        _.each(episodes, (episode, index) => {
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
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (
    node.internal.type === `Mdx` &&
    node.fileAbsolutePath.includes(`/episodes/`)
  ) {
    const value = path.parse(node.fileAbsolutePath).name;
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
