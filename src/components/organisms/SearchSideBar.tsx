import React from "react";
import "twin.macro";
import FreewordCard from "../../features/search/component/sidebar/molecules/FreewordCard";
import ParameterCard from "../../features/search/component/sidebar/molecules/ParameterCard";
import ResetSearchButton from "../atoms/ResetSearchButton";
import { vCenter } from "../../styles/base";

const SearchSideBar = () => {
  return (
    <div tw="w-[300px]">
      <FreewordCard />
      <ParameterCard />
      <div css={vCenter} tw="mt-4">
        <ResetSearchButton />
      </div>
    </div>
  );
};

export default SearchSideBar;
