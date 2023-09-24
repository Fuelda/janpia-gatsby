import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { prefecturesArray } from "../../../store/filterContents";
import { StaticImage } from "gatsby-plugin-image";
import { useFilteredStrapiContext } from "../../../../../context/filteredStrapiContext";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import "twin.macro";
import { checkBox } from "../../../../../styles/form";
import { hCenter, vCenter } from "../../../../../styles/base";
import SearchPrefectureCard from "../../../../../components/molecules/SearchPrefectureCard";

const Prefectures = () => {
  return (
    <div tw="relative">
      <StaticImage
        alt="団体所在地"
        src="../../../../../images/map.png"
        tw="w-[930px] h-[630px]"
        objectFit="contain"
      />

      <div tw="absolute bottom-0 right-0 flex gap-6 flex-row-reverse items-end">
        <div tw=" flex flex-col gap-3.5 mb-[205px]">
          <div>
            <SearchPrefectureCard area="hokkaido" />
          </div>
          <div>
            <SearchPrefectureCard area="tohoku" />
          </div>
        </div>
        <div tw="mb-[25px]">
          <SearchPrefectureCard area="kanto" />
        </div>
        <div>
          <SearchPrefectureCard area="tokai" />
        </div>
        <div>
          <SearchPrefectureCard area="shikoku" />
        </div>
      </div>
      <div tw="absolute top-0 left-0 flex gap-6 flex-row-reverse">
        <div>
          <SearchPrefectureCard area="hokuriku" />
        </div>
        <div>
          <SearchPrefectureCard area="kinki" />
        </div>
        <div>
          <SearchPrefectureCard area="chugoku" />
        </div>
        <div>
          <SearchPrefectureCard area="kyushu" />
        </div>
      </div>
      <div tw="absolute bottom-0 left-0">
        <SearchPrefectureCard area="okinawa" />
      </div>
    </div>
  );
};

export default Prefectures;
