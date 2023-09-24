import React from "react";
import SearchBoxSidebar from "../Freeword/SearchBoxSidebar";
import AlgoliaIndex from "../../../api/AlgoliaIndex";
import tw from "twin.macro";
import "twin.macro";
import { sidebarCard, sidebarHeading } from "../../../../../styles/sidebar";

const FreewordCard = () => {
  return (
    <div css={sidebarCard}>
      <p css={sidebarHeading} tw="text-sm">
        フリーワードから探す
      </p>
      <div tw="p-2.5">
        <AlgoliaIndex path="result" />
      </div>
    </div>
  );
};

export default FreewordCard;
