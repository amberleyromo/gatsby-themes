import Typography from "typography";
import Wordpress2016 from "typography-theme-wordpress-2016";
import colors from "../tokens/colors";

Wordpress2016.overrideThemeStyles = () => ({
  body: {
    backgroundColor: colors.backgroundColor,
    color: colors.textNormal,
    WebkitFontSmoothing: "antialiased"
  },
  a: {
    color: colors.textLink
  },
  hr: {
    background: colors.hr
  },
  "blockquote em": {
    color: "#404040",
    fontSize: "14px"
  },
  "a.gatsby-resp-image-link": {
    boxShadow: "none"
  },
  "a.anchor": {
    boxShadow: "none"
  },
  'a.anchor svg[aria-hidden="true"]': {
    stroke: colors.textLink
  },
  "p code": {
    fontSize: "1.1rem"
  },
  "li code": {
    fontSize: "1rem"
  },
  // ul: {
  //   marginLeft: "1rem"
  // },
  blockquote: {
    color: "inherit",
    borderLeftColor: "inherit",
    opacity: "0.8",
    marginLeft: 0
  }
});

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
