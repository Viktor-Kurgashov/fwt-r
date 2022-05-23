import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    filterParams: {
      q: "",
      authorId: "",
      locationId: "",
      created_gte: "",
      created_lte: ""
    },
    authors: [],
    locations: [],
    paintings: [],
    fetchState: 'Loading...',
    paginationLinks: {
      first: false,
      prev: false,
      next: false,
      last: false,
      arr: [false]
    }
  },

  reducers: {
    setFilterParam: (state, action) => {
      state.filterParams[action.payload.param] = action.payload.value;
    },
    setAuthors: (state, action) => {
      state.authors = action.payload;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setPaintings: (state, action) => {
      state.paintings = action.payload;
    },
    setFetchState: (state, action) => {
      state.fetchState = action.payload;
    },
    setPaginationLinks: (state, action) => {
      state.paginationLinks = action.payload;
    },
  }
});

export const storeFilterParams = (state) => state.data.filterParams;
export const storeAuthors = (state) => state.data.authors;
export const storeLocations = (state) => state.data.locations;

export const storePaintings = (state) => state.data.paintings;
export const storeFetchState = (state) => state.data.fetchState;
export const storePaginationLinks = (state) => state.data.paginationLinks;

export const { setFilterParam, setAuthors, setLocations, setPaintings, setFetchState, setPaginationLinks } = dataSlice.actions;
export default dataSlice.reducer;