import { createSlice } from "@reduxjs/toolkit";

const themeColor = localStorage.getItem("themeColor");
const isLightTheme = localStorage.getItem("isLighttheme") === "1";

const initialState = {
  primary: `hsl(${themeColor || 196}, ${isLightTheme ? "70%" : "15%"}, ${isLightTheme ? "27%" : "95%"})`,
  secondary: `hsl(${themeColor || 196}, ${isLightTheme ? "15%" : "30%"}, ${isLightTheme ? "95%" : "17%"})`,
  hover: `hsl(${themeColor || 196}, ${isLightTheme ? "10%" : "40%"}, ${isLightTheme ? "90%" : "35%"})`,
  isDarktheme: !isLightTheme,
  colorPickerValue: { h: themeColor || 196, s: 50, l: 35 },
  dark: { saturaion: { primary: 15, secondary: 30, hover: 40 }, lightness: { primary: 95, secondary: 17, hover: 35 } },
  light: {
    saturaion: { primary: 70, secondary: 15, hover: 10 },
    lightness: { primary: 27, secondary: 95, hover: 90 },
  },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setPrimaryColor: (state, action) => {
      const h = action.payload;
      localStorage.setItem("themeColor", h);
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
    setDarkTheme: (state) => {
      localStorage.setItem("isLighttheme", "0");
      return {
        ...state,
        primary: `hsl(${state.colorPickerValue.h}, ${state.dark.saturaion.primary}%, ${state.dark.lightness.primary}%)`,
        secondary: `hsl(${state.colorPickerValue.h}, ${state.dark.saturaion.secondary}%, ${state.dark.lightness.secondary}%)`,
        hover: `hsl(${state.colorPickerValue.h}, ${state.dark.saturaion.hover}%, ${state.dark.lightness.hover}%)`,
        isDarktheme: true,
      };
    },
    setLightTheme: (state) => {
      localStorage.setItem("isLighttheme", "1");
      return {
        ...state,
        primary: `hsl(${state.colorPickerValue.h}, ${state.light.saturaion.primary}%, ${state.light.lightness.primary}%)`,
        secondary: `hsl(${state.colorPickerValue.h}, ${state.light.saturaion.secondary}%, ${state.light.lightness.secondary}%)`,
        hover: `hsl(${state.colorPickerValue.h}, ${state.light.saturaion.hover}%, ${state.light.lightness.hover}%)`,
        isDarktheme: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPrimaryColor, setDarkTheme, setLightTheme } = themeSlice.actions;

export default themeSlice.reducer;
