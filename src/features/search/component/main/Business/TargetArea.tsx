import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import "twin.macro";
import SearchTargetAreaCard from "../../../../../components/molecules/SearchTargetAreaCard";

const TargetArea = () => {
  return (
    <div tw="relative">
      <StaticImage
        alt="事業対象地域"
        src="../../../../../images/map.png"
        tw="w-[80%] h-[630px]"
        objectFit="contain"
      />

      <div tw="absolute bottom-0 right-0 flex gap-6 flex-row-reverse items-end">
        <div tw=" flex flex-col gap-3.5 mb-[110px]">
          <div>
            <SearchTargetAreaCard area="zenkoku" />
          </div>
          <div>
            <SearchTargetAreaCard area="hokkaido" />
          </div>
          <div>
            <SearchTargetAreaCard area="tohoku" />
          </div>
        </div>
        <div tw="mb-[25px]">
          <SearchTargetAreaCard area="kanto" />
        </div>
        <div>
          <SearchTargetAreaCard area="tokai" />
        </div>
        <div>
          <SearchTargetAreaCard area="shikoku" />
        </div>
      </div>
      <div tw="absolute top-0 left-0 flex gap-6 flex-row-reverse">
        <div>
          <SearchTargetAreaCard area="hokuriku" />
        </div>
        <div>
          <SearchTargetAreaCard area="kinki" />
        </div>
        <div>
          <SearchTargetAreaCard area="chugoku" />
        </div>
        <div>
          <SearchTargetAreaCard area="kyushu" />
        </div>
      </div>
      <div tw="absolute bottom-0 left-0">
        <SearchTargetAreaCard area="okinawa" />
      </div>
    </div>
  );
};

export default TargetArea;
