import React, { useReducer } from "react";

// Import our custom hook.
import { useTheme } from "../utils/ThemeContext";
import { reducer } from "../utils/reducer";
import { TOGGLE_THEME } from "../utils/actions";

// Make our ThemeComponent the default export from this file
export default function ThemeComponent() {
  // Pluck values from our ThemeContext by invoking our useTheme hook
  const initialState = useTheme();

  const [state, dispatch] = useReducer(reducer, initialState);

  // Object containing CSS gradient for darkTheme and non-darkTheme
  const themeStyles = {
    background: state.darkTheme
      ? "-webkit-linear-gradient(top left, #150C17, #535353)"
      : "-webkit-linear-gradient(bottom, #FFFFFF, #EDBAAB)",
    padding: "10rem",
    margin: "10rem",
    borderRadius: "30px",
    color: state.darkTheme ? "#FAFAFA" : "#363537",
  };

  return (
    <>
      <h1>Consumers!</h1>
      <button
        id="button"
        onClick={() =>
          dispatch({ type: TOGGLE_THEME, payload: state.darkTheme })
        }
        className="btn"
        type="button"
      >
        Toggle dark theme
      </button>
      <section className="text-center">
        The current value of{" "}
        <code style={{ fontWeight: "bold" }}>
          darkTheme: {state.darkTheme.toString()}
        </code>
      </section>
      <div style={themeStyles}>
        <h1>Theme Component</h1>
      </div>
    </>
  );
}
