import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchPanel: false,
  searchValue: "",
  searchLevel: "n5",
  totalWordsFound: { n5: 0, n4: 0, n3: 0, n2: 0, n1: 0 },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSearchPanel: (state) => ({ ...state, isSearchPanel: true }),
    closeSearchPanel: (state) => ({ ...state, isSearchPanel: false }),
    setSearchValue: (state, action) => ({ ...state, searchValue: action.payload }),
    setSearchLevel: (state, action) => ({ ...state, searchLevel: action.payload }),
    setTotalWordsFound: (state, action) => ({
      ...state,
      totalWordsFound: { ...state.totalWordsFound, ...action.payload },
    }),
  },
});

// Action creators are generated for each case reducer function
export const { openSearchPanel, closeSearchPanel, setSearchValue, setSearchLevel, setTotalWordsFound } =
  searchSlice.actions;

export default searchSlice.reducer;
