import React from "react";
import { h3, vCenter } from "../../../../../styles/base";
import "twin.macro";
import TargetAreaSpItem from "./TargetAreaSpItem";
import { useModalContext } from "../../../../../context/modalContext";
import { useSearchContext } from "../../../../../context/searchContext";
import { StaticImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const TargetAreaSpCard = () => {
  const { setIsModalOpen } = useModalContext();
  const { searchSetState } = useSearchContext();
  const { setPrefectures } = searchSetState;
  return (
    <div>
      <TargetAreaSpItem area="zenkoku" />
      <TargetAreaSpItem area="hokkaido" />
      <TargetAreaSpItem area="tohoku" />
      <TargetAreaSpItem area="kanto" />
      <TargetAreaSpItem area="hokuriku" />
      <TargetAreaSpItem area="tokai" />
      <TargetAreaSpItem area="kinki" />
      <TargetAreaSpItem area="chugoku" />
      <TargetAreaSpItem area="shikoku" />
      <TargetAreaSpItem area="kyushu" />
      <TargetAreaSpItem area="okinawa" />
      <div tw="px-2.5" css={vCenter}>
        <button
          onClick={() => setIsModalOpen("")}
          css={vCenter}
          tw="mt-3 border border-blue-button rounded py-2.5 w-full"
        >
          <div tw="flex gap-2.5">
            <StaticImage
              src="../../../../../images/map-icon.svg"
              alt="マップアイコン"
              tw="w-[21.65px]"
            />
            <p tw="text-blue-button font-bold">団体所在地を選択する</p>
          </div>
        </button>
        <button
          tw="text-sm text-gray-border mt-3"
          onClick={() => setPrefectures([])}
        >
          <FontAwesomeIcon icon={faCircleXmark} tw="mr-1" />
          地域選択をリセット
        </button>
      </div>
    </div>
  );
};

export default TargetAreaSpCard;
