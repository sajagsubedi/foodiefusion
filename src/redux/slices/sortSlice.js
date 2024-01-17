import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAction: false,
  fetchState: {
    isquery: false,
    searchQuery: '',
    selectFilters: [
      { active: false, selectedOpt: '' },
      { active: false, selectedOpt: '' },
      { active: false, selectedOpt: '' },
    ],
  },
  currentState: {
    isquery: false,
    searchQuery: '',
    selectFilters: [
      { active: false, selectedOpt: '' },
      { active: false, selectedOpt: '' },
      { active: false, selectedOpt: '' },
    ],
  },
};

const changeFilterSlice = createSlice({
  name: 'changeFilter',
  initialState,
  reducers: {
    setSortFilter: (state, action) => {
      const toComparePayload = {
        ...action.payload.currentState,
        isquery: false,
      };

      if (
        JSON.stringify(toComparePayload) === JSON.stringify(initialState.currentState)
      ) {
        state = initialState;
      } else {
        state.currentState = { ...action.payload };
        state.currentState.isquery = true;
      }
    },
    clearSortFilter: (state, action) => {
      const { currentState } = action.payload;

      if (
        JSON.stringify(currentState.selectFilters) !==
          JSON.stringify(initialState.currentState.selectFilters) ||
        currentState.searchQuery !== initialState.currentState.searchQuery
      ) {
        state.isAction = true;
        state.currentState = { ...initialState.currentState };
      }
    },
  },
});

export const { setSortFilter, clearSortFilter } = changeFilterSlice.actions;
export default changeFilterSlice.reducer;
