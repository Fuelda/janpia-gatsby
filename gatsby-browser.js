import React from "react";
import StrapiProvider from "./src/context/strapiContext";
import SearchProvider from "./src/context/searchContext";
import FilteredStrapiProvider from "./src/context/filteredStrapiContext";
import AlgoliaStrapiProvider from "./src/context/algoliaStrapiContext";
import ModalProvider from "./src/context/modalContext";
import DetailProvider from "./src/context/detailContext";
import ConsortiumProvider from "./src/context/consortiumContext";
import "./src/styles/modal.scss";
import "./src/styles/news.scss";
import "./src/styles/table.scss";
import "./src/styles/hamburger.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";

export const wrapRootElement = ({ element }) => (
  <StrapiProvider>
    <SearchProvider>
      <AlgoliaStrapiProvider>
        <FilteredStrapiProvider>
          <ModalProvider>
            <DetailProvider>
              <ConsortiumProvider>{element}</ConsortiumProvider>
            </DetailProvider>
          </ModalProvider>
        </FilteredStrapiProvider>
      </AlgoliaStrapiProvider>
    </SearchProvider>
  </StrapiProvider>
);
