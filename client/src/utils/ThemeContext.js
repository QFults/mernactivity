import React, { useState, useContext } from "react";

// Create our theme context using React.CreateContext()
export const ThemeContext = React.createContext();

// Create a custom hook that allows easy access to our ThemeContext values
export const useTheme = () => useContext(ThemeContext);

// Creating our theme provider. Accepts an argument of "props", here we plucking off the "children" object.
export default function ThemeProvider(props) {
  const darkTheme = false;
  return (
    // Dark theme and toggle theme are getting provided to the child components
    <ThemeContext.Provider value={{ darkTheme }} {...props} />
  );
}
