import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import {
  isActivitySupportGroup,
  isEmergencySupportGroup,
} from "../../lib/businessTypeNameChecker";

export const BusinessOrgTypeThumbnail = ({
  business_org_type,
  business_type_name,
}: {
  business_org_type: string;
  business_type_name: string;
}) => {
  switch (true) {
    case isActivitySupportGroup(business_type_name):
      return business_org_type === "F" ? (
        <StaticImage
          src="../../images/thumbnail_katsudoshien.png"
          alt="サムネイル"
          tw="w-full"
        />
      ) : (
        <StaticImage
          src="../../images/thumbnail_shientaisho.png"
          alt="サムネイル"
          tw="w-full"
        />
      );

    case isEmergencySupportGroup(business_type_name):
      return business_org_type === "F" ? (
        <StaticImage
          src="../../images/thumbnail_shikinbunpai_emergency.png"
          alt="サムネイル"
          tw="w-full"
        />
      ) : (
        <StaticImage
          src="../../images/thumbnail_jikkou_emergency.png"
          alt="サムネイル"
          tw="w-full"
        />
      );

    default:
      return business_org_type === "F" ? (
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
      );
  }
};
