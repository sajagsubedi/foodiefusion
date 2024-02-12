"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortFilter } from "@/redux/slices/sortSlice";
import { fetchFilteredRecipes } from "@/redux/slices/fetchSlice";
import { useRouter } from "next/navigation";

export default function Hero() {
    const sortfilter = useSelector(state => state.sortfilter);
    const router = useRouter();
    const dispatch = useDispatch();
    const [searchVal, setSearchVal] = useState("");
    const handleSearch = () => {
        let newSortFilter = {
            ...sortfilter,
            currentState: {
                ...sortfilter.currentState,
                isquery: true,
                searchQuery: searchVal
            }
        };
        dispatch(fetchFilteredRecipes(newSortFilter));
        router.push("/recipes");
    };
    return (
        <section className="hero">
            <div className="heroBody">
                <div className="heroDescriptionHalf">
                    <h1 className="heroHeading">Welcome To Foodie Fusion!</h1>
                    <p className="heroPara">
                        Elevate your kitchen creations. Foodie Fusion crafts
                        exceptional recipes based on your ingredients. Unleash
                        your culinary magic today.
                    </p>
                    <div className="searchContainer">
                        <div className="searchBar">
                            <input
                                type="text"
                                className="PrimaryInput"
                                placeholder="Search for a recipe"
                                value={searchVal}
                                onChange={e => setSearchVal(e.target.value)}
                            />
                            <button
                                className="searchBtn btn"
                                onClick={handleSearch}
                            >
                                <svg
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1.5em"
                                    width="1.5em"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M38.7 40.85 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L40.95 38.7q.45.4.45 1.025 0 .625-.5 1.125-.45.45-1.1.45-.65 0-1.1-.45Zm-19.85-12.3q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="heroImgHalf">
                    <img src="images/banner.png" alt="loading..." />
                </div>
            </div>
        </section>
    );
}
