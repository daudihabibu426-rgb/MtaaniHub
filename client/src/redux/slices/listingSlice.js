import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: [],
  currentListing: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    location: '',
    priceMin: 0,
    priceMax: 10000000,
    sortBy: 'newest'
  }
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    fetchListingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchListingsSuccess: (state, action) => {
      state.listings = action.payload;
      state.loading = false;
    },
    fetchListingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchListingSuccess: (state, action) => {
      state.currentListing = action.payload;
      state.loading = false;
    },
    fetchListingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  }
});

export const {
  fetchListingsStart,
  fetchListingsSuccess,
  fetchListingsFailure,
  fetchListingStart,
  fetchListingSuccess,
  fetchListingFailure,
  setFilters,
  clearFilters
} = listingSlice.actions;
export default listingSlice.reducer;
