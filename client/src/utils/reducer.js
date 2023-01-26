import { TOGGLE_THEME } from "./actions";

export const reducer = (state, { type }) => {
  switch (type) {
    case TOGGLE_THEME:
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    default:
      return state;
  }
};
