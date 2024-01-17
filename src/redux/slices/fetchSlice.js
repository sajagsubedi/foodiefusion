import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  url: "",
  offset: 0,
  number: 0,
  totalResults: 0,
};

//actions
export const fetchRecipes = createAsyncThunk("fetchRecipes", async () => {
  let url =
"https://api.spoonacular.com/recipes/random?apiKey=3ca61df6115c4e5a88ff46ef66e7d657&number=10";
  let resp = await fetch(url);
  resp = await resp.json();
  let returnData= {
    recipes: resp.recipes,
    url,
}
return returnData;
});

export const fetchMoreRecipes = createAsyncThunk("fetchMoreRecipes", async (payload) => {
  const { offset, url, number, sortfilter } = payload;
  let payloadData = {};
  let newUrl = url;
  if (sortfilter.isquery == true) {
    const skipVal = offset + number;
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
})

export const fetchFilteredRecipes = createAsyncThunk("fetchFilteredRecipes", async (payload) => {
  if (
    JSON.stringify(payload.currentState) ===
    JSON.stringify(payload.fetchState)
  ) {
    return;
  }
  const { searchQuery, selectFilters } = payload.currentState;
  const diet = selectFilters[0].selectedOpt;
  const cuisine = selectFilters[1].selectedOpt;
  const meal = selectFilters[2].selectedOpt;
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=3ca61df6115c4e5a88ff46ef66e7d657&number=10`;
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
  let returnData= {
    recipes: resp.results,
    number,
    offset,
    totalResults,
    url,
  }
   return returnData;
  });

  //Slice
  const fetchSlice = createSlice({
    name: "fetch",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchRecipes.fulfilled, (state, action) => {
        if (state.data) {
          state.data = action.payload;
        }
      });
      builder.addCase(fetchMoreRecipes.fulfilled, (state, action) => {
        if (state.data) {
          const newData = {
            ...state.data,
            offset: action.payload.offset,
            recipes: state.data.recipes.concat(action.payload.recipes),
          };
          state.data = newData;
        }
      });
    },
  });
  
export default fetchSlice.reducer;