import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import "twin.macro";

type IndexProjectCardType = {
  isFdo: boolean;
  isActivitySupport: boolean;
};

export const BusinessOrgTypeIcon = ({
  isFdo,
  isActivitySupport,
}: IndexProjectCardType) => {
  if (isActivitySupport) {
    {
      return isFdo ? (
        <StaticImage
          src="../../images/icon_katsudoshien.png"
          alt="団体アイコン"
          tw="w-[105px] h-[105px]"
        />
      ) : (
        <StaticImage
          src="../../images/icon_shientaisho.png"
          alt="団体アイコン"
          tw="w-[105px] h-[105px]"
        />
      );
    }
  } else {
    return isFdo ? (
      <StaticImage
        src="../../images/icon_shikinbunpai.png"
        alt="団体アイコン"
        tw="w-[105px] h-[105px]"
      />
    ) : (
      <StaticImage
        src="../../images/icon_jikkou.png"
        alt="団体アイコン"
        tw="w-[105px] h-[105px]"
      />
    );
  }
};
