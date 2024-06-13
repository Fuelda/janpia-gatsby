import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import "twin.macro";
import tw from "twin.macro";
import { hCenter, pankuzu } from "../../styles/base";
import { businessCategoryArray } from "../../features/search/store/filterContents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { linkCollectionTypes } from "../../util/linkCollectionTypes";
import { linkCollectionTypesManual } from "../../util/linkCollectionTypesManual";

const resultCardTip = tw`text-xs py-1 px-1.5 border border-gray-base text-gray-base`;

const DetailHeader = (props: { business_cd: string }) => {
  const linkedBizPlan = linkCollectionTypes();
  const linkedBizPlanManual = linkCollectionTypesManual();
  const linkedAllBizPlan = [...linkedBizPlan, ...linkedBizPlanManual];
  const headerBizPlan = linkedAllBizPlan.find(
    (item) => item.bizPlan.business_cd === props.business_cd
  );

  const bizPlan = headerBizPlan?.bizPlan;
  const business_org_type = bizPlan?.business_org_type;
  const business_name = bizPlan?.business_name;
  const business_status = bizPlan?.business_status;
  const business_category = bizPlan?.business_category;
  const business_type_name = bizPlan?.business_type_name;
  const mainGroup = headerBizPlan?.mainGroup;

  const businessCategoryProperty = businessCategoryArray;

  let businessStatusText = "";
  if (typeof business_status === "number" && business_status === 0) {
    businessStatusText = "実施中";
  } else if (typeof business_status === "boolean" && business_status) {
    businessStatusText = "実施中";
  } else {
    businessStatusText = "終了";
  }

  let mainGroupName = "";
  if (mainGroup) {
    mainGroupName = mainGroup.node.organization_name
      ? mainGroup.node.organization_name
      : "";
  } else {
    mainGroupName = "";
  }

  let mainGroupPrefecture = "";
  if (mainGroup) {
    mainGroupPrefecture = mainGroup.node.prefectures
      ? mainGroup.node.prefectures
      : "";
  } else {
    mainGroupPrefecture = "";
  }

  let businessCategoryLabel: string | undefined = "";
  if (business_category) {
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
  } else {
    businessCategoryLabel = "";
  }

  let businessTypeNameLabel = "";
  if (business_type_name) {
    if (typeof business_type_name === "string") {
      businessTypeNameLabel = business_type_name;
    } else if (
      typeof business_type_name === "object" &&
      business_type_name.label
    ) {
      businessTypeNameLabel = business_type_name.label;
    }
  } else {
    businessTypeNameLabel = "";
  }

  const splitBusinessTypeName = businessTypeNameLabel.match(/(\d+年度)(.+)/);
  const businessTypeNameYear =
    splitBusinessTypeName && splitBusinessTypeName[1];
  const businessTypeNameCategory =
    (splitBusinessTypeName &&
      splitBusinessTypeName.length >= 2 &&
      splitBusinessTypeName[2] === "通常枠" &&
      "通常枠") ||
    (splitBusinessTypeName &&
      splitBusinessTypeName.length >= 2 &&
      splitBusinessTypeName[2] === "コロナ枠" &&
      "緊急支援枠");

  return (
    <div>
      <div css={pankuzu}>
        <Link to="/" tw="break-keep">
          ホーム
        </Link>
        <FontAwesomeIcon icon={faAngleRight} />
        <Link to="/result" tw="break-keep">
          検索結果
        </Link>
        <FontAwesomeIcon icon={faAngleRight} />
        <p tw="truncate">{business_name}</p>
      </div>
      <div tw="w-full p-2.5 flex gap-2 mt-3.5 lg:(py-0)">
        <div tw="w-[100px] h-[100px] shrink-0 lg:(w-[23%] h-auto)">
          {business_org_type && business_org_type === "F" ? (
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
            <p
              css={[
                resultCardTip,
                businessTypeNameCategory === "通常枠"
                  ? tw`border-blue-button text-blue-button bg-blue-base`
                  : tw`border-red-base text-red-base bg-red-pale`,
              ]}
            >
              {businessTypeNameCategory}
            </p>
            <p css={resultCardTip}>{businessTypeNameYear}</p>
            <p css={resultCardTip}>{businessStatusText}</p>
            {mainGroupPrefecture && (
              <p css={resultCardTip}>{mainGroupPrefecture}</p>
            )}
          </div>
          <p tw="text-lg font-bold break-words">{business_name}</p>
          <div tw="mt-3.5 flex gap-7 md:hidden">
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
        </div>
      </div>
      <div tw="hidden md:(block px-2.5)">
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
    </div>
  );
};

export default DetailHeader;
