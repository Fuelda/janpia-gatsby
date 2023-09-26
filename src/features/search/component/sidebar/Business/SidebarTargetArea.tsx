import React from "react";
import "twin.macro";
import { h3, vCenter } from "../../../../../styles/base";
import { StaticImage } from "gatsby-plugin-image";
import { useModalContext } from "../../../../../context/modalContext";

const SidebarTargetArea = () => {
  const { setIsModalOpen } = useModalContext();
  return (
    <div>
      <h3 css={h3}>団体所在地</h3>
      <div tw="px-3.5 py-2.5">
        <p>選択した地域：</p>
        <button
          css={vCenter}
          tw="mt-3 border border-blue-button rounded py-2.5 "
          onClick={() => setIsModalOpen("targetArea")}
        >
          <div tw="flex gap-2.5">
            <StaticImage
              src="../../../../../images/map-icon.svg"
              alt="マップアイコン"
              tw="w-[21.65px]"
            />
            <p tw="text-blue-button font-bold">活動地域を選択する</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SidebarTargetArea;
