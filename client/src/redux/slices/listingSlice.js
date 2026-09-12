import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: [],
  loading: false,
  error: null,
  total: 0
};

const listingSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload.listings;
      state.total = action.payload.total;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setListings, setLoading, setError } = listingSlice.actions;
export default listingSlice.reducer;
