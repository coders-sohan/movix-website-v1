import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    data: {},
    genres: {},
  },
  reducers: {
    getApiConfigurations: (state, action) => {
      state.data = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfigurations, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
