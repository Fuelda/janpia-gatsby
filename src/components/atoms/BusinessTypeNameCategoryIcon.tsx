import React from "react";
import { convertBusinessTypeNameLabel } from "../../util/businessTypeNameChecker";
import tw from "twin.macro";
import { resultCardTip } from "../lauout/DetailHeader";

export const BusinessTypeNameCategoryIcon = ({
  businessTypeName,
}: {
  businessTypeName: RegExpMatchArray;
}) => {
  const businessTypeNameCategory =
    (businessTypeName &&
      businessTypeName.length >= 2 &&
      businessTypeName[2].includes("通常枠") &&
      "通常枠") ||
    (businessTypeName &&
      businessTypeName.length >= 2 &&
      convertBusinessTypeNameLabel(businessTypeName[2]).includes(
        "緊急支援枠"
      ) &&
      "緊急支援枠") ||
    (businessTypeName &&
      businessTypeName.length >= 2 &&
      businessTypeName[2].includes("活動支援") &&
      "活動支援");

  const businessTypeNameCategoryColor =
    (businessTypeNameCategory === "通常枠" &&
      tw`border-blue-businessType text-blue-businessType bg-blue-base`) ||
    (businessTypeNameCategory === "緊急支援枠" &&
      tw`border-red-businessType text-red-businessType bg-red-pale`) ||
    (businessTypeNameCategory === "活動支援" &&
      tw`border-green-businessType text-green-businessType bg-green-50`);

  return (
    <p css={[resultCardTip, businessTypeNameCategoryColor]}>
      {businessTypeNameCategory}
    </p>
  );
};
