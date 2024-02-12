import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    recipes: [],
    url: "",
    offset: 0,
    number: 9,
    totalResults: 0
};

//actions
export const fetchRecipes = createAsyncThunk(
    "recipes/fetchRecipes",
    async () => {
        let url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&number=${initialState.number}`;
        let resp = await fetch(url);
        resp = await resp.json();
        let returnData = {
            recipes: resp.recipes,
            url
        };
        return returnData;
    }
);

export const fetchMoreRecipes = createAsyncThunk(
    "recipes/fetchMoreRecipes",
    async payload => {
        const { offset, url, sortfilter } = payload;
        let payloadData = {};
        let newUrl = url;
        if (sortfilter.fetchState.isquery == true) {
            const skipVal = offset + initialState.number;
            newUrl = `${newUrl}&offset=${skipVal}`;
            payloadData.offset = skipVal;
            let resp = await fetch(newUrl);
            resp = await resp.json();
            payloadData.recipes = resp.results;
        } else {
            payloadData.offset = 0;
            payloadData.totalResults = -1;
            let resp = await fetch(newUrl);
            resp = await resp.json();
            payloadData.recipes = resp.recipes;
        }
        return payloadData;
    }
);

export const fetchFilteredRecipes = createAsyncThunk(
    "recipes/fetchFilteredRecipes",
    async payload => {
        const { searchQuery, selectFilters } = payload.currentState;
        const diet = selectFilters[0].selectedOpt;
        const cuisine = selectFilters[1].selectedOpt;
        const meal = selectFilters[2].selectedOpt;
        let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&number=${initialState.number}`;
        if (searchQuery) {
            url = url + "&query=" + searchQuery;
        }
        if (diet) {
            url = url + "&diet=" + diet;
        }
        if (cuisine) {
            url = url + "&cuisine=" + cuisine;
        }
        if (meal) {
            url = url + "&type=" + meal;
        }
        let resp = await fetch(url);
        resp = await resp.json();
        const { number, offset, totalResults } = resp;
        let returnData = {
            recipes: resp.results,
            number,
            offset,
            totalResults,
            url
        };

        return returnData;
    }
);

//Slice
const fetchSlice = createSlice({
    name: "fetch",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchRecipes.fulfilled, (state, action) => {
            state.recipes = action.payload.recipes;
            state.url = action.payload.url;
        });
        builder.addCase(fetchMoreRecipes.fulfilled, (state, action) => {
            state.recipes = state.recipes.concat(action.payload.recipes);
            state.offset = action.payload.offset;
            state.totalResults = action.payload.totalResults;
        });
        builder.addCase(fetchFilteredRecipes.fulfilled, (state, action) => {
            state.recipes = action.payload.recipes;
            state.totalResults = action.payload.totalResults;
            state.offset = action.payload.offset;
            state.url = action.payload.url;
        });
    }
});

export default fetchSlice.reducer;
