import React from "react";
import { sidebarCard, sidebarHeading } from "../../../../../styles/sidebar";
import "twin.macro";
import SearchCategoryCard from "./SearchCategoryCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { vCenter } from "../../../../../styles/base";
import { Link } from "gatsby";

const ParameterCard = () => {
  return (
    <div css={sidebarCard} tw="mt-2.5">
      <p css={sidebarHeading} tw="text-sm">
        検索条件から探す
      </p>
      <SearchCategoryCard category="organization" />
      <SearchCategoryCard category="project" />
      <SearchCategoryCard category="issue" />

      <div tw=" hidden lg:(block p-4)" css={vCenter}>
        <Link
          to="/result/"
          tw="w-full bg-blue-button text-white py-2 text-center block rounded"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} tw="mr-3" />
          検索
        </Link>
      </div>
    </div>
  );
};

export default ParameterCard;
