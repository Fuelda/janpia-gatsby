import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "twin.macro";
import { hCenter } from "../../../../../styles/base";
import tw from "twin.macro";
import OrganizationName from "../../main/Organization/OrganizationName";
import OrganizationTypeCd from "../../main/Organization/OrganizationTypeCd";
import LegalPersonality from "../../main/Organization/LegalPersonality";
import BusinessOrgType from "../../main/Business/BusinessOrgType";
import BusinessCategory from "../../main/Business/BusinessCategory";
import BusinessStatus from "../../main/Business/BusinessStatus";
import SubsidyAmount from "../../main/Business/SubsidyAmount";
import TopicKeyword from "../../main/Business/TopicKeyword";
import SocialIssue from "../../main/Issue/SocialIssue";
import SdgsGoal from "../../main/Issue/SdgsGoal";
import SidebarPrefectures from "../Organization/SidebarPrefectures";
import BusinessTypeName from "../../main/Business/BusinessTypeName";
import { useLocation } from "@reach/router";
import PrefecturesSp from "../../main/Organization/PrefecturesSp";

const SearchCategoryCard = (props: { category: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const path = location.pathname;

  let categoryName = "";
  if (props.category === "organization") {
    categoryName = "団体";
  } else if (props.category === "project") {
    categoryName = "事業";
  } else {
    categoryName = "社会課題";
  }

  return (
    <div>
      <button
        tw="bg-blue-button text-white justify-between w-full p-2 text-sm"
        css={hCenter}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p tw="text-sm">{categoryName}から探す</p>
        <FontAwesomeIcon icon={faAngleDown} css={isOpen && tw`rotate-180`} />
      </button>
      {props.category === "organization" && (
        <div
          css={!isOpen && tw`h-0 overflow-hidden`}
          tw="transition-[height] duration-300 ease-in"
        >
          <OrganizationName path={path} />
          <OrganizationTypeCd path={path} />
          <SidebarPrefectures category="prefectures" />
          <PrefecturesSp category="prefectures" />
          <LegalPersonality path={path} />
        </div>
      )}
      {props.category === "project" && (
        <div
          css={!isOpen && tw`h-0 overflow-hidden`}
          tw="transition-[height] duration-300 ease-in"
        >
          <BusinessTypeName path={path} />
          <BusinessOrgType path={path} />
          <BusinessCategory path={path} />
          <SubsidyAmount path={path} />
          <BusinessStatus path={path} />
          <SidebarPrefectures category="targetArea" />
          <PrefecturesSp category="targetArea" />
        </div>
      )}
      {props.category === "issue" && (
        <div
          css={!isOpen && tw`h-0 overflow-hidden`}
          tw="transition-[height] duration-300 ease-in"
        >
          <SocialIssue />
          <SdgsGoal path="result" />
        </div>
      )}
    </div>
  );
};

export default SearchCategoryCard;
