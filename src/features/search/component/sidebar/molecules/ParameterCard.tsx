import React from "react";
import { sidebarCard, sidebarHeading } from "../../../../../styles/sidebar";
import "twin.macro";
import SearchCategoryCard from "./SearchCategoryCard";

const ParameterCard = () => {
  return (
    <div css={sidebarCard} tw="mt-2.5">
      <p css={sidebarHeading} tw="text-sm">
        検索条件から探す
      </p>
      <SearchCategoryCard category="organization" />
      <SearchCategoryCard category="project" />
      <SearchCategoryCard category="issue" />
    </div>
  );
};

export default ParameterCard;
