import React from "react";
import { convertBusinessTypeNameLabel } from "../../lib/businessTypeNameChecker";
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
      businessTypeName[2].includes("活動支援枠") &&
      "活動支援");

  const businessTypeNameCategoryColor =
    (businessTypeNameCategory === "通常枠" &&
      tw`border-blue-button text-blue-button bg-blue-base`) ||
    (businessTypeNameCategory === "緊急支援枠" &&
      tw`border-red-base text-red-base bg-red-pale`) ||
    (businessTypeNameCategory === "活動支援" &&
      tw`border-emerald-500 text-emerald-500 bg-green-50`);

  return (
    <p css={[resultCardTip, businessTypeNameCategoryColor]}>
      {businessTypeNameCategory}
    </p>
  );
};
