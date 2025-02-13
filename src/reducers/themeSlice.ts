import { createSlice } from "@reduxjs/toolkit";

type ThemeType = "light" | "dark" | "system";

// LocalStorage se initial theme load karna
const getInitialTheme = (): ThemeType => {
  return (localStorage.getItem("theme") as ThemeType) || "system";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload); // Redux state aur localStorage dono sync
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
