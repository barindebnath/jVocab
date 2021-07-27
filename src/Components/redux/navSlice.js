import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentScreen: "Home", isNavPanel: false };

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setCurrentScreen: (state, action) => ({
      ...state,
      currentScreen: action.payload,
      isNavPanel: document.documentElement.clientWidth > 768,
    }),
    openNavPanel: (state) => ({ ...state, isNavPanel: true }),
    closeNavPanel: (state) => ({ ...state, isNavPanel: false }),
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentScreen, openNavPanel, closeNavPanel } = navSlice.actions;

export default navSlice.reducer;
