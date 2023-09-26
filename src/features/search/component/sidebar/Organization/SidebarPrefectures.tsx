import React from "react";
import "twin.macro";
import { h3, vCenter } from "../../../../../styles/base";
import { StaticImage } from "gatsby-plugin-image";

const SidebarPrefectures = () => {
  return (
    <div>
      <h3 css={h3}>団体所在地</h3>
      <div tw="px-3.5 py-2.5">
        <p>選択した地域：</p>
        <button css={vCenter} tw="mt-3 border border-blue-button ">
          <div tw="flex">
            <StaticImage
              src="../../../../../images/map-icon.svg"
              alt="マップアイコン"
              tw="w-[21.65px]"
            />
            <p>団体所在地を選択する</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SidebarPrefectures;
