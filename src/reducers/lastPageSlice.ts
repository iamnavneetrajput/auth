import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LastPageState {
  page: any;
  lastPage: string;
}

const initialState: LastPageState = {
  lastPage: '/',
};

const lastPageSlice = createSlice({
  name: 'lastPage',
  initialState,
  reducers: {
    setLastPage: (state, action: PayloadAction<string>) => {
      state.lastPage = action.payload;
    },
  },
});

export const { setLastPage } = lastPageSlice.actions;
export default lastPageSlice.reducer;
