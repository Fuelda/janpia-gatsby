import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import "twin.macro";
import tw from "twin.macro";
import { hCenter } from "../../styles/base";
import {
  businessCategoryArray,
  supportCategoryArray,
} from "../../features/search/store/filterContents";
import { BusinessOrgTypeThumbnail } from "../atoms/BusinessOrgTypeThumbnail";
import { BusinessTypeNameCategoryIcon } from "../atoms/BusinessTypeNameCategoryIcon";

const resultCardTip = tw`text-xs py-1 px-1.5 border border-gray-border`;

const ResultCard = (props: any) => {
  const { content } = props;
  const { bizPlan, group, mainGroup } = content;
  const {
    business_cd,
    business_org_type,
    business_name,
    business_status,
    business_category,
    business_type_name,
    support_category,
  } = bizPlan;

  let businessStatusText = "";
  if (typeof business_status === "number" && business_status === 0) {
    businessStatusText = "実施中";
  } else if (typeof business_status === "boolean" && business_status) {
    businessStatusText = "実施中";
  } else {
    businessStatusText = "終了";
  }

  const mainGroupIndirect = group.find((g: any) => {
    const groupRole =
      g.business_org_type === "F" ? g.org_role_fdo : g.org_role_fdo;
    return groupRole === 0 || 1;
  });

  let mainGroupName = "";
  if (mainGroup) {
    mainGroupName = mainGroup.node.organization_name;
  } else if (mainGroupIndirect && mainGroupIndirect.groupData) {
    mainGroupName = mainGroupIndirect.groupData.organization_name;
  } else {
    mainGroupName = "";
  }

  let mainGroupPrefecture = "";
  if (mainGroup) {
    mainGroupPrefecture = mainGroup.node.prefectures;
  } else if (mainGroupIndirect && mainGroupIndirect.groupData) {
    mainGroupPrefecture = mainGroupIndirect.groupData.prefectures;
  } else {
    mainGroupPrefecture = "";
  }

  let businessCategoryLabel: string | undefined = "";
  if (business_category && business_category.code === 1) {
    businessCategoryLabel = business_category.subCode
      ? businessCategoryArray.find(
          (bcp) => business_category.subCode === bcp.subCode
        )?.label
      : "草の根活動支援事業";
  } else {
    businessCategoryLabel = businessCategoryArray.find(
      (bcp) => business_category && business_category.code === bcp.code
    )?.label;
  }

  let supportCategoryLabel: string | undefined = "";
  supportCategoryLabel = supportCategoryArray.find(
    (scp) => support_category && support_category === scp.code.toString()
  )?.label;

  const businessTypeNameLabel = business_type_name.label || business_type_name;
  const splitBusinessTypeName = businessTypeNameLabel.match(/(\d+年度)(.+)/);
  const businessTypeNameYear =
    splitBusinessTypeName && splitBusinessTypeName[1];

  return (
    <Link
      to={`/result/${business_cd}`}
      tw="border border-gray-border w-full p-2.5"
    >
      <div tw="flex gap-2 ">
        <div tw="w-[100px] h-[100px] shrink-0 lg:(w-[24%] h-auto)">
          <BusinessOrgTypeThumbnail
            business_org_type={business_org_type}
            business_type_name={business_type_name.label || business_type_name}
          />
        </div>
        <div tw="">
          <div tw="flex gap-[5px]">
            <BusinessTypeNameCategoryIcon
              businessTypeName={splitBusinessTypeName}
            />
            <p css={resultCardTip}>{businessTypeNameYear}</p>
            <p css={resultCardTip}>{businessStatusText}</p>
            {mainGroupPrefecture && (
              <p css={resultCardTip}>{mainGroupPrefecture}</p>
            )}
          </div>
          <p tw="text-lg font-bold break-all">{business_name}</p>
          <div tw="md:(hidden)">
            {(mainGroup || mainGroupIndirect) && (
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
              <div css={hCenter} tw="gap-1.5 text-sm">
                <StaticImage
                  src="../../images/note.svg"
                  alt="ノートアイコン"
                  tw="w-4 h-4"
                />
                <p>{businessCategoryLabel}</p>
              </div>
            )}
            {supportCategoryLabel && (
              <div css={hCenter} tw="gap-1.5 text-sm">
                <StaticImage
                  src="../../images/note.svg"
                  alt="ノートアイコン"
                  tw="w-4 h-4"
                />
                <p>{supportCategoryLabel}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div tw="hidden md:(block mt-1.5)">
        {(mainGroup || mainGroupIndirect) && (
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
          <div css={hCenter} tw="gap-1.5 text-sm">
            <StaticImage
              src="../../images/note.svg"
              alt="ノートアイコン"
              tw="w-4 h-4"
            />
            <p>{businessCategoryLabel}</p>
          </div>
        )}
        {supportCategoryLabel && (
          <div css={hCenter} tw="gap-1.5 text-sm">
            <StaticImage
              src="../../images/note.svg"
              alt="ノートアイコン"
              tw="w-4 h-4"
            />
            <p>{supportCategoryLabel}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ResultCard;
