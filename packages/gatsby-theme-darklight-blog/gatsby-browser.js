import React from "react";

import { ThemeProvider } from "./src/context/theme-context";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
