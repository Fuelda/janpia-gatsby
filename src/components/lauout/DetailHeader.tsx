import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { Dispatch, useEffect } from "react";
import "twin.macro";
import tw from "twin.macro";
import { hCenter, pankuzu } from "../../styles/base";
import {
  businessCategoryArray,
  supportCategoryArray,
} from "../../features/search/store/filterContents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { BusinessOrgTypeThumbnail } from "../atoms/BusinessOrgTypeThumbnail";
import { BusinessTypeNameCategoryIcon } from "../atoms/BusinessTypeNameCategoryIcon";
import { useBasicInfo } from "../../hooks/useBasicInfo";
import { isActivitySupportGroup } from "../../util/businessTypeNameChecker";

export const resultCardTip = tw`text-xs py-1 px-1.5 border border-gray-base text-gray-base`;

const DetailHeader = (props: {
  business_cd: string;
  setBusinessTypeNameYear?: Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    business_org_type,
    business_name,
    business_status,
    business_category,
    support_category,
    business_type_name,
    mainGroup,
  } = useBasicInfo(props.business_cd);

  const businessCategoryProperty = businessCategoryArray;

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

  let supportCategoryLabel: string | undefined = "";
  supportCategoryLabel = supportCategoryArray.find(
    (scp) => support_category && support_category === scp.code.toString()
  )?.label;

  const splitBusinessTypeName =
    business_type_name && business_type_name.match(/(\d+年度)(.+)/);
  const businessTypeNameYear =
    splitBusinessTypeName && splitBusinessTypeName[1];

  useEffect(() => {
    props.setBusinessTypeNameYear &&
      businessTypeNameYear &&
      props.setBusinessTypeNameYear(businessTypeNameYear);
  }, [businessTypeNameYear]);

  return (
    <div>
      <div css={pankuzu}>
        <Link to="/" tw="whitespace-nowrap">
          ホーム
        </Link>
        <FontAwesomeIcon icon={faAngleRight} />
        <Link to="/result" tw="whitespace-nowrap">
          検索結果
        </Link>
        <FontAwesomeIcon icon={faAngleRight} />
        <p tw="truncate">{business_name}</p>
      </div>
      <div tw="w-full p-2.5 flex gap-2 mt-3.5 lg:(py-0)">
        <div tw="w-[100px] h-[100px] shrink-0 lg:(w-[23%] h-auto)">
          <BusinessOrgTypeThumbnail
            business_org_type={business_org_type || ""}
            business_type_name={business_type_name || ""}
          />
        </div>
        <div tw="">
          <div tw="flex gap-[5px]">
            {splitBusinessTypeName && (
              <BusinessTypeNameCategoryIcon
                businessTypeName={splitBusinessTypeName}
              />
            )}
            <p css={resultCardTip}>{businessTypeNameYear}</p>
            <p css={resultCardTip}>{business_status}</p>
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
            {/* 事業分類 */}
            {businessCategoryLabel &&
              !isActivitySupportGroup(business_type_name || "") && (
                <div css={hCenter} tw="gap-1.5">
                  <StaticImage
                    src="../../images/note.svg"
                    alt="ノートアイコン"
                    tw="w-4 h-4"
                  />
                  <p>{businessCategoryLabel}</p>
                </div>
              )}
            {supportCategoryLabel && (
              <div css={hCenter} tw="gap-1.5">
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
        {supportCategoryLabel && (
          <div css={hCenter} tw="gap-1.5">
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
  );
};

export default DetailHeader;
