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

const SearchTargetAreaCard = (props: { area: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const filteredAllBizPlan = useFilteredStrapiContext();
  const { target_area } = searchState;
  const { setTargetArea } = searchSetState;
  const checkboxArray = prefecturesArray;

  const prefBoxStyle =
    (props.area === "tokai" && tw`grid grid-cols-3`) ||
    (props.area === "shikoku" && tw`grid grid-cols-2`) ||
    tw`flex flex-col`;

  let area: string[] = [];
  let areaName = "";
  let areaColor = tw``;
  const allPref = [
    ...checkboxArray.hokkaido,
    ...checkboxArray.tohoku,
    ...checkboxArray.kanto,
    ...checkboxArray.hokuriku,
    ...checkboxArray.tokai,
    ...checkboxArray.kinki,
    ...checkboxArray.chugoku,
    ...checkboxArray.shikoku,
    ...checkboxArray.kyushu,
    ...checkboxArray.okinawa,
  ];
  switch (props.area) {
    case "zenkoku":
      area = ["全国"];
      areaName = "全国";
      areaColor = tw`bg-gray-base`;
      break;
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
    const prefLength = filteredAllBizPlan.filter(
      (item) => item.bizPlan.target_area === pref
    ).length;
    const allPrefLength = filteredAllBizPlan.length;
    return props.area !== "zenkoku" ? prefLength : allPrefLength;
  };

  const isAllPrefInArea = area.every((ap) => target_area.includes(ap));
  const isAllPref = allPref.every((p) => target_area.includes(p));

  const addAreaPref = () => {
    if (isAllPrefInArea) {
      setTargetArea(target_area.filter((ta) => !area.includes(ta)));
    } else {
      setTargetArea([
        ...target_area.filter((ta) => !area.includes(ta)),
        ...area,
      ]);
    }
  };

  const addAllPref = () => {
    if (isAllPref) {
      setTargetArea([]);
    } else {
      setTargetArea(allPref);
    }
  };

  const handleCheckbox = (pref: string) => {
    if (target_area.includes(pref)) {
      setTargetArea(target_area.filter((p) => p !== pref));
    } else {
      setTargetArea([...target_area, pref]);
    }
  };

  return (
    <div tw="rounded-[8px]  p-[5px]" css={areaColor}>
      <div css={hCenter} tw="gap-[7px]">
        {props.area !== "zenkoku" && (
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
        )}
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
              onCheckedChange={() =>
                props.area !== "zenkoku"
                  ? handleCheckbox(checkbox)
                  : addAllPref()
              }
              css={checkBox}
              checked={
                props.area !== "zenkoku"
                  ? target_area.includes(checkbox)
                  : isAllPref
              }
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

export default SearchTargetAreaCard;
