import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    fetchState: {
        isquery: false,
        searchQuery: "",
        selectFilters: [
            { active: false, selectedOpt: "" },
            { active: false, selectedOpt: "" },
            { active: false, selectedOpt: "" }
        ]
    },
    currentState: {
        isquery: false,
        searchQuery: "",
        selectFilters: [
            { active: false, selectedOpt: "" },
            { active: false, selectedOpt: "" },
            { active: false, selectedOpt: "" }
        ]
    }
};
export const setSortFilter = createAsyncThunk(
    "sortfilter/setSortFilter",
    payload => {
        let rs = false;
        for (let i = 0; i < 3; i++) {
            if (
                payload.currentState.selectFilters[i].selectedOpt !== "" ||
                payload.currentState.searchQuery !== ""
            ) {
                rs = true;
                break;
            }
        }
        let newObj = { ...payload.currentState };
        newObj.isquery = rs;
        return newObj;
    }
);

const changeFilterSlice = createSlice({
    name: "changeFilter",
    initialState,
    reducers: {
        updateFetchState: (state, action) => {
            state.fetchState = { ...state.currentState };
        },
        clearSortFilter: (state, action) => {
            state.currentState = { ...initialState.currentState };
        }
    },
    extraReducers: builder => {
        builder.addCase(setSortFilter.fulfilled, (state, action) => {
            state.currentState = action.payload;
        });
    }
});

export const { clearSortFilter, updateFetchState } = changeFilterSlice.actions;
export default changeFilterSlice.reducer;
