import React from "react";
import StrapiProvider from "./src/context/strapiContext";
import SearchProvider from "./src/context/searchContext";
import FilteredStrapiProvider from "./src/context/filteredStrapiContext";
import AlgoliaStrapiProvider from "./src/context/algoliaStrapiContext";
import ModalProvider from "./src/context/modalContext";
import "./src/styles/modal.scss";

export const wrapRootElement = ({ element }) => (
  <StrapiProvider>
    <SearchProvider>
      <AlgoliaStrapiProvider>
        <FilteredStrapiProvider>
          <ModalProvider>{element}</ModalProvider>
        </FilteredStrapiProvider>
      </AlgoliaStrapiProvider>
    </SearchProvider>
  </StrapiProvider>
);
