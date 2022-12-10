import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchrequest = createAsyncThunk('request/fetchStatus', async (userId: number, thunkAPI) => {
  const { data } = await axios.get(
    `https://636a9404c07d8f936da23cbd.mockapi.io/thincks?${categoryChange}&sortBy=${sortType.sortProperty}&page=${currentPage}&limit=4&${search}&order=acs`,
  );
  return data;
});

const initialState = {
  items: [],
};

export const requestItems = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = requestItems.actions;

export default requestItems.reducer;
