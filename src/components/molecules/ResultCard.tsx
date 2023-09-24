import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import "twin.macro";
import tw from "twin.macro";
import { hCenter } from "../../styles/base";
import { businessCategoryArray } from "../../features/search/store/filterContents";

const resultCardTip = tw`text-xs py-1 px-1.5 border`;

const ResultCard = (props: any) => {
  const { content } = props;
  const { bizPlan, group } = content;
  const {
    business_cd,
    business_org_type,
    business_name,
    business_status,
    target_area,
    business_category,
  } = bizPlan;
  const businessCategoryProperty = businessCategoryArray;

  let businessStatusText = "";
  if (typeof business_status === "string" && business_status === "1") {
    businessStatusText = "実施中";
  } else if (typeof business_status === "boolean" && business_status) {
    businessStatusText = "実施中";
  } else {
    businessStatusText = "終了";
  }

  const mainGroup = group.find((g: any) => {
    const groupRole =
      g.business_org_type === "F" ? g.org_role_fdo : g.org_role_fdo;
    return groupRole === 1;
  });
  const mainGroupName = mainGroup ? mainGroup.groupData.organization_name : "";

  let businessCategoryLabel: string | undefined = "";
  if (business_category.code === 1) {
    businessCategoryLabel = business_category.subCode
      ? businessCategoryProperty.find(
          (bcp) => business_category.subCode === bcp.subCode
        )?.label
      : "草の根活動支援事業";
  } else {
    businessCategoryLabel = businessCategoryProperty.find(
      (bcp) => business_category.code === bcp.code
    )?.label;
  }

  return (
    <Link
      to={`/result/${business_cd}`}
      tw="border border-black-font w-full p-2.5 flex gap-2 "
    >
      <div tw="w-[100px] h-[100px] shrink-0">
        {business_org_type === "F" ? (
          <StaticImage
            src="../../images/thumbnail_shikinbunpai.png"
            alt="サムネイル"
            tw="w-full"
          />
        ) : (
          <StaticImage
            src="../../images/thumbnail_jikkou.png"
            alt="サムネイル"
            tw="w-full"
          />
        )}
      </div>
      <div tw="">
        <div tw="flex gap-[5px]">
          <p css={resultCardTip}>{businessStatusText}</p>
          <p css={resultCardTip}>{target_area}</p>
        </div>
        <p tw="text-lg font-bold break-words">{business_name}</p>
        {mainGroup && (
          <div css={hCenter} tw="gap-1.5">
            <StaticImage
              src="../../images/office.svg"
              alt="オフィスアイコン"
              tw="w-4 h-4"
            />
            <p>{mainGroupName}</p>
          </div>
        )}
        {businessCategoryLabel && (
          <div css={hCenter} tw="gap-1.5">
            <StaticImage
              src="../../images/note.svg"
              alt="ノートアイコン"
              tw="w-4 h-4"
            />
            <p>{businessCategoryLabel}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ResultCard;
