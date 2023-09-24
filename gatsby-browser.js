import React from "react";
import StrapiProvider from "./src/context/strapiContext";
import SearchProvider from "./src/context/searchContext";
import FilteredStrapiProvider from "./src/context/filteredStrapiContext";
import AlgoliaStrapiProvider from "./src/context/algoliaStrapiContext";

export const wrapRootElement = ({ element }) => (
  <StrapiProvider>
    <SearchProvider>
      <AlgoliaStrapiProvider>
        <FilteredStrapiProvider>{element}</FilteredStrapiProvider>
      </AlgoliaStrapiProvider>
    </SearchProvider>
  </StrapiProvider>
);
