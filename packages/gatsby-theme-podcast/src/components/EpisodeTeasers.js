import React, { Fragment } from "react";
import { Link, useStaticQuery, StaticQuery, graphql } from "gatsby";

// @TODO: hmm, for now I'll use "link" for the slug? revisit
// const query = graphql`
//   query getEpisodes {
//     allRssFeedItem {
//       nodes {
//         id
//         title
//         date: isoDate(formatString: "MMMM DD, YYYY")
//         description: content
//         link
//         itunes {
//           duration
//         }
//       }
//     }
//   }
// `;

const durationToMinutes = durationInSeconds => {
  return Math.floor(durationInSeconds / 60);
};

// hackity hack. this extracts the first paragraph from the description
const extractFirstParagraph = html => {
  return html.match(/<p>(.*?)<\/p>/)[0];
};

const PostTeasers = () => {
  // const data = useStaticQuery(query);
  // const episodes = data.allRssFeedItem.nodes;

  return <p>Placeholder</p>;
  // return (
  //   <Fragment>
  //     {episodes.map(episode => {
  //       const {
  //         id,
  //         title,
  //         date,
  //         description,
  //         link,
  //         itunes: { duration }
  //       } = episode;
  //       const formattedDescription = extractFirstParagraph(description);
  //       return (
  //         <div
  //           style={{
  //             textAlign: "left"
  //           }}
  //           key={id}
  //         >
  //           <h3
  //             style={{
  //               marginTop: "1rem",
  //               marginBottom: "0.4375rem",
  //               textDecoration: "underline"
  //             }}
  //           >
  //             <Link style={{ boxShadow: "none" }} to={`/todo`}>
  //               {title}
  //             </Link>
  //           </h3>
  //           <small>
  //             {date}
  //             {` • ${durationToMinutes(duration)} min 🎧`}
  //           </small>
  //           <p
  //             dangerouslySetInnerHTML={{
  //               __html: formattedDescription
  //             }}
  //           />
  //         </div>
  //       );
  //     })}
  //   </Fragment>
  // );
};

export default PostTeasers;
