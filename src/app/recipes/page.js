"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchRecipes, fetchMoreRecipes } from "@/redux/slices/fetchSlice"
import { RecipeItem, SortMenu, Spinner } from "@/components";
import { SortToggleContainer, SortToggleBtn } from "@/styles/ComponentStyles";

export default function Page() {
  const recipes = useSelector((state) => state.recipes);
  const sortfilter = useSelector((state) => state.sortfilter);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
const [isSortMenuActive, setIsSortMenuActive] = useState(false);
  const toggleSort = () => {
    setIsSortMenuActive((prev) => !prev);
  };
  const changeLoading = (arg) => {
    setLoading(arg);
  };
  useEffect(() => {
    setLoading(true);
    if (recipes.recipes.length == 0) {   
      dispatch(fetchRecipes())
    }
    setLoading(false);
  }, []);

  const validateSpinner = () => {
    if (!loading) {
      return <Spinner />;
    } else {
      return "";
    }
  };
  return (
    <section className="recipes">
      <h3 className="sectionHeading"> Recipes</h3>
      <SortToggleContainer>
        <SortToggleBtn className="sortToggle" onClick={toggleSort}>
          <svg
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            width="1.5em"
          >
            <path
              fill="currentColor"
              d="M16.5 36h-9q-.65 0-1.075-.425Q6 35.15 6 34.5q0-.65.425-1.075Q6.85 33 7.5 33h9q.65 0 1.075.425Q18 33.85 18 34.5q0 .65-.425 1.075Q17.15 36 16.5 36Zm24-21h-33q-.65 0-1.075-.425Q6 14.15 6 13.5q0-.65.425-1.075Q6.85 12 7.5 12h33q.65 0 1.075.425Q42 12.85 42 13.5q0 .65-.425 1.075Q41.15 15 40.5 15Zm-12 10.5h-21q-.65 0-1.075-.425Q6 24.65 6 24q0-.65.425-1.075Q6.85 22.5 7.5 22.5h21q.65 0 1.075.425Q30 23.35 30 24q0 .65-.425 1.075-.425.425-1.075.425Z"
            />
          </svg>
        </SortToggleBtn>
      </SortToggleContainer>

      {loading && <Spinner />}
      {!loading && recipes.recipes.length===0 && (<h3 className="noRecipe">No recipes found!</h3>)}
     {recipes.recipes.length!==0 &&<InfiniteScroll
        dataLength={recipes.recipes.length}
        className="recipeGroup"
        next={() =>dispatch(fetchMoreRecipes({
            offset: recipes.offset,
            url: recipes.url,
            sortfilter: sortfilter,
          }))
        }
        hasMore={recipes.recipes.length !==recipes.totalResults}
        loader={validateSpinner()}
      >
        {!loading &&
          recipes.recipes.map((data, i) => {
            return <RecipeItem key={i} data={data} />;
          })}
      </InfiniteScroll>}
      <SortMenu
        state={{
          isSortMenuActive,
          toggleSort,
          changeLoading,
        }}
      />
    </section>
  );
}