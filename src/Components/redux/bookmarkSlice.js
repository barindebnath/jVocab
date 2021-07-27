import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  n5Noun: localStorage.getItem("n5Noun"),
  n5Verb: localStorage.getItem("n5Verb"),
  n5Adverb: localStorage.getItem("n5Adverb"),
  n5Adjective: localStorage.getItem("n5Adjective"),
  n5Conjunction: localStorage.getItem("n5Conjunction"),
  n5Numbers: localStorage.getItem("n5Numbers"),
  n5Expression: localStorage.getItem("n5Expression"),
  n5Miscellaneous: localStorage.getItem("n5Miscellaneous"),
  n5DefinitionLess: localStorage.getItem("n5DefinitionLess"),

  n4Noun: localStorage.getItem("n4Noun"),
  n4Verb: localStorage.getItem("n4Verb"),
  n4Adverb: localStorage.getItem("n4Adverb"),
  n4Adjective: localStorage.getItem("n4Adjective"),
  n4Conjunction: localStorage.getItem("n4Conjunction"),
  n4Numbers: localStorage.getItem("n4Numbers"),
  n4Expression: localStorage.getItem("n4Expression"),
  n4Miscellaneous: localStorage.getItem("n4Miscellaneous"),
  n4DefinitionLess: localStorage.getItem("n4DefinitionLess"),

  n2Noun: localStorage.getItem("n2Noun"),
  n2Verb: localStorage.getItem("n2Verb"),
  n2Adverb: localStorage.getItem("n2Adverb"),
  n2Adjective: localStorage.getItem("n2Adjective"),
  n2Conjunction: localStorage.getItem("n2Conjunction"),
  n2Numbers: localStorage.getItem("n2Numbers"),
  n2Expression: localStorage.getItem("n2Expression"),
  n2Miscellaneous: localStorage.getItem("n2Miscellaneous"),
  n2DefinitionLess: localStorage.getItem("n2DefinitionLess"),
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setBookmark: (state, action) => ({ ...state, [action.payload.name]: action.payload.value }),
  },
});

// Action creators are generated for each case reducer function
export const { setBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
