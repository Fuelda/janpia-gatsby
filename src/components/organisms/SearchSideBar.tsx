import React from "react";
import AlgoliaSearch from "../../features/search/api/AlgoliaIndex";
import BusinessCategory from "../../features/search/component/main/Business/BusinessCategory";
import Prefectures from "../../features/search/component/main/Organization/Prefectures";
import SocialIssue from "../../features/search/component/main/Issue/SocialIssue";
import SdgsGoal from "../../features/search/component/main/Issue/SdgsGoal";
import TargetArea from "../../features/search/component/main/Business/TargetArea";
import LegalPersonality from "../../features/search/component/main/Organization/LegalPersonality";
import OrganizationTypeCd from "../../features/search/component/main/Organization/OrganizationTypeCd";
import OrganizationName from "../../features/search/component/main/Organization/OrganizationName";
import BusinessOrgType from "../../features/search/component/main/Business/BusinessOrgType";
import BusinessTypeName from "../../features/search/component/main/Business/BusinessTypeName";
import BusinessStatus from "../../features/search/component/main/Business/BusinessStatus";
import "twin.macro";
import FreewordCard from "../../features/search/component/sidebar/molecules/FreewordCard";
import AlgoliaIndex from "../../features/search/api/AlgoliaIndex";
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
