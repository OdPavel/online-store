import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRequestThinck = createAsyncThunk('request/fetchStatus', async (params) => {
  const { categoryChange, sortType, currentPage, search } = params;
  const { data } = await axios.get(
    `https://636a9404c07d8f936da23cbd.mockapi.io/thincks?${categoryChange}&sortBy=${sortType.sortProperty}&page=${currentPage}&limit=4&${search}&order=acs`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading', //loading|success|error
};

export const requestItems = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchRequestThinck.pending]: (state) => {
      state.status = 'loading';
      state.status = [];
    },
    [fetchRequestThinck.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    },
    [fetchRequestThinck.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = requestItems.actions;

export default requestItems.reducer;
