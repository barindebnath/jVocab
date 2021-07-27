import { configureStore } from "@reduxjs/toolkit";
import jlptLevelReducer from "./jlptLevelSlice";
import navReducer from "./navSlice";
import searchReducer from "./searchSlice";
import themeReducer from "./themeSlice";
import bookmarkReducer from "./bookmarkSlice";

export const store = configureStore({
  reducer: {
    jlptLevel: jlptLevelReducer,
    nav: navReducer,
    search: searchReducer,
    theme: themeReducer,
    bookmark: bookmarkReducer,
  },
});
