import { createSlice } from "@reduxjs/toolkit";

const initialState = { isScrollView: true };

export const listViewSlice = createSlice({
  name: "listView",
  initialState,
  reducers: {
    setListView: (state) => ({ ...state, isScrollView: !state.isScrollView }),
  },
});

// Action creators are generated for each case reducer function
export const { setListView } = listViewSlice.actions;

export default listViewSlice.reducer;
