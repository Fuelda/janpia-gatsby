import React from "react";
import "twin.macro";
import { h3, vCenter } from "../../../../../styles/base";
import { StaticImage } from "gatsby-plugin-image";
import { useModalContext } from "../../../../../context/modalContext";
import { useSearchContext } from "../../../../../context/searchContext";

const SidebarPrefectures = (props: { category: string }) => {
  const { setIsModalOpen } = useModalContext();
  const { searchState } = useSearchContext();
  const { prefectures, target_area } = searchState;
  const prefecturesText =
    props.category === "prefectures"
      ? prefectures.join(" / ")
      : target_area.join(" / ");

  return (
    <div tw="lg:hidden">
      <h3 css={h3}>
        {props.category === "prefectures" ? "団体所在地" : "事業対象地域"}
      </h3>
      <div tw="px-3.5 py-2.5">
        <p>選択した地域：{prefecturesText}</p>
        <button
          css={vCenter}
          tw="mt-3 border border-blue-button rounded py-2.5 w-full"
          onClick={() => {
            props.category === "prefectures"
              ? setIsModalOpen("prefectures")
              : setIsModalOpen("targetArea");
          }}
        >
          <div tw="flex gap-2.5">
            <StaticImage
              src="../../../../../images/map-icon.svg"
              alt="マップアイコン"
              tw="w-[21.65px]"
            />
            <p tw="text-blue-button font-bold">
              {props.category === "prefectures" ? "団体所在地" : "活動地域"}
              を選択する
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SidebarPrefectures;
