import React from "react";
import colors from "../tokens/colors";

export default ({ children }) => (
  <div
    style={{
      color: colors.textNormal,
      background: colors.backgroundColor,
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "42rem",
      padding: "1.75rem 1.3125rem"
    }}
  >
    {children}
  </div>
);
