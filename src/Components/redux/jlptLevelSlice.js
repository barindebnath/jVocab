import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentLevel: "n5" };

export const jlptLevelSlice = createSlice({
  name: "jlptLevel",
  initialState,
  reducers: {
    setLevel: (state, action) => ({ ...state, currentLevel: action.payload }),
  },
});

// Action creators are generated for each case reducer function
export const { setLevel } = jlptLevelSlice.actions;

export default jlptLevelSlice.reducer;
