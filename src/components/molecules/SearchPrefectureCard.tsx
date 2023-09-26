import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { hCenter, vCenter } from "../../styles/base";
import { checkBox } from "../../styles/form";
import { prefecturesArray } from "../../features/search/store/filterContents";
import { useSearchContext } from "../../context/searchContext";
import "twin.macro";
import { useFilteredStrapiContext } from "../../context/filteredStrapiContext";
import tw from "twin.macro";

const SearchPrefectureCard = (props: { area: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const filteredAllBizPlan = useFilteredStrapiContext();
  const { prefectures } = searchState;
  const { setPrefectures } = searchSetState;
  const checkboxArray = prefecturesArray;

  const prefBoxStyle =
    (props.area === "tokai" && tw`grid grid-cols-3`) ||
    (props.area === "shikoku" && tw`grid grid-cols-2`) ||
    tw`flex flex-col`;

  let area: string[] = [];
  let areaName = "";
  let areaColor = tw``;

  switch (props.area) {
    case "hokkaido":
      area = checkboxArray.hokkaido;
      areaName = "北海道";
      areaColor = tw`bg-purple-hokkaido`;
      break;
    case "tohoku":
      area = checkboxArray.tohoku;
      areaName = "東北";
      areaColor = tw`bg-purple-tohoku`;
      break;
    case "kanto":
      area = checkboxArray.kanto;
      areaName = "関東";
      areaColor = tw`bg-blue-kanto`;
      break;
    case "hokuriku":
      area = checkboxArray.hokuriku;
      areaName = "北陸";
      areaColor = tw`bg-blue-hokuriku`;
      break;
    case "tokai":
      area = checkboxArray.tokai;
      areaName = "東海";
      areaColor = tw`bg-green-tokai`;
      break;
    case "kinki":
      area = checkboxArray.kinki;
      areaName = "近畿";
      areaColor = tw`bg-green-kinki`;
      break;
    case "chugoku":
      area = checkboxArray.chugoku;
      areaName = "中国";
      areaColor = tw`bg-orange-chugoku`;
      break;
    case "shikoku":
      area = checkboxArray.shikoku;
      areaName = "四国";
      areaColor = tw`bg-yellow-shikoku`;
      break;
    case "kyushu":
      area = checkboxArray.kyushu;
      areaName = "九州";
      areaColor = tw`bg-red-kyushu`;
      break;
    case "okinawa":
      area = checkboxArray.okinawa;
      areaName = "沖縄";
      areaColor = tw`bg-red-okinawa`;
      break;
    default:
      area = [];
      areaName = "";
  }

  const pickupPref = (pref: string) => {
    const prefLength = filteredAllBizPlan.filter((item) =>
      item.group.some((g: any) => g.groupData.prefectures === pref)
    ).length;
    return prefLength;
  };

  const isAllPrefInArea = area.every((ap) => prefectures.includes(ap));

  const addAreaPref = () => {
    if (isAllPrefInArea) {
      setPrefectures(prefectures.filter((p) => !area.includes(p)));
    } else {
      setPrefectures([
        ...prefectures.filter((p) => !area.includes(p)),
        ...area,
      ]);
    }
  };

  const handleCheckbox = (pref: string) => {
    if (prefectures.includes(pref)) {
      setPrefectures(prefectures.filter((p) => p !== pref));
    } else {
      setPrefectures([...prefectures, pref]);
    }
  };

  return (
    <div tw="rounded-[8px] p-[5px]" css={areaColor}>
      <div css={hCenter} tw="gap-[7px]">
        <Checkbox.Root
          id={props.area}
          css={checkBox}
          onCheckedChange={() => addAreaPref()}
          checked={isAllPrefInArea}
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label htmlFor={props.area} tw="font-bold text-white">
          {areaName}
        </label>
      </div>
      <div css={prefBoxStyle} tw="gap-[5px] mt-[5px]">
        {area.map((checkbox) => (
          <div
            key={checkbox}
            tw="bg-white rounded w-[90px] p-0.5 gap-1.5"
            css={hCenter}
          >
            <Checkbox.Root
              id={checkbox}
              onCheckedChange={() => handleCheckbox(checkbox)}
              css={checkBox}
              checked={prefectures.includes(checkbox)}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor={checkbox} tw="text-sm font-bold">
              <p>{checkbox}</p>
              <p>({pickupPref(checkbox)})</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPrefectureCard;
