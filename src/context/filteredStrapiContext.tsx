import React, { FC, ReactNode, createContext, useContext } from "react";
import { filterStrapiData } from "../features/search/util/filterStrapiData";
import { filterStrapiManualData } from "../features/search/util/filterStrapiManualData";

const FilteredStrapiContext = createContext<any[]>([]);

const FilteredStrapiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const filteredBizPlan = filterStrapiData();
  const filteredBizPlanManual = filterStrapiManualData();
  const filteredAllBizPlan = [...filteredBizPlan, ...filteredBizPlanManual];

  return (
    <FilteredStrapiContext.Provider value={filteredAllBizPlan}>
      {children}
    </FilteredStrapiContext.Provider>
  );
};

export function useFilteredStrapiContext() {
  return useContext(FilteredStrapiContext);
}

export default FilteredStrapiProvider;
