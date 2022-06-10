import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'view',
  initialState: {
    value: 0,
  },
  reducers: {
    modifyView: (state, action) => {
      console.log(state, action);

      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { modifyView } = filterSlice.actions;

export default filterSlice.reducer;
