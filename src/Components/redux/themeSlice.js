import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  primary: "#2D6E86",
  secondary: "#f0f3f4",
  hover: "#e3e5e8",
  isDarktheme: false,
  colorPickerValue: { h: 196, s: 50, l: 35 },
  dark: { saturaion: { primary: 15, secondary: 50, hover: 40 }, lightness: { primary: 95, secondary: 35, hover: 35 } },
  light: { saturaion: { primary: 50, secondary: 15, hover: 10 }, lightness: { primary: 35, secondary: 95, hover: 90 } },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setPrimaryColor: (state, action) => {
      const h = action.payload;
      const sPrimary = state.isDarktheme ? state.dark.saturaion.primary : state.light.saturaion.primary;
      const lPrimary = state.isDarktheme ? state.dark.lightness.primary : state.light.lightness.primary;
      const sSeconday = state.isDarktheme ? state.dark.saturaion.secondary : state.light.saturaion.secondary;
      const lSeconday = state.isDarktheme ? state.dark.lightness.secondary : state.light.lightness.secondary;
      const sHover = state.isDarktheme ? state.dark.saturaion.hover : state.light.saturaion.hover;
      const lHover = state.isDarktheme ? state.dark.lightness.hover : state.light.lightness.hover;
      return {
        ...state,
        primary: `hsl(${h}, ${sPrimary}%, ${lPrimary}%)`,
        secondary: `hsl(${h}, ${sSeconday}%, ${lSeconday}%)`,
        hover: `hsl(${h}, ${sHover}%, ${lHover}%)`,
        colorPickerValue: { ...state.colorPickerValue, h, s: sPrimary, l: lPrimary },
      };
    },
    setDarkTheme: (state) => ({
      ...state,
      primary: `hsl(${state.colorPickerValue.h}, ${state.dark.saturaion.primary}%, ${state.dark.lightness.primary}%)`,
      secondary: `hsl(${state.colorPickerValue.h}, ${state.dark.saturaion.secondary}%, ${state.dark.lightness.secondary}%)`,
      hover: `hsl(${state.colorPickerValue.h}, ${state.dark.saturaion.hover}%, ${state.dark.lightness.hover}%)`,
      isDarktheme: true,
    }),
    setLightTheme: (state) => ({
      ...state,
      primary: `hsl(${state.colorPickerValue.h}, ${state.light.saturaion.primary}%, ${state.light.lightness.primary}%)`,
      secondary: `hsl(${state.colorPickerValue.h}, ${state.light.saturaion.secondary}%, ${state.light.lightness.secondary}%)`,
      hover: `hsl(${state.colorPickerValue.h}, ${state.light.saturaion.hover}%, ${state.light.lightness.hover}%)`,
      isDarktheme: false,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { setPrimaryColor, setDarkTheme, setLightTheme } = themeSlice.actions;

export default themeSlice.reducer;
