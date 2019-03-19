// const { createFilePath } = require(`gatsby-source-filesystem`);
const fs = require("fs");
// const path = require('path');
// const Promise = require('bluebird');
// const _ = require('lodash');

// const SLUG_SEPARATOR = '_';

exports.onPreBootstrap = ({ reporter }) => {
  const dirs = ["content", "content/episodes", "content/fragments"];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`);
      fs.mkdirSync(dir);
    }
  });
};
