import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { hCenter, vCenter } from "../../styles/base";
import {
  checkBox,
  checkBoxPref,
  checkBoxPrefArea,
  checkMark,
  checkMarkPref,
} from "../../styles/form";
import { prefecturesArray } from "../../features/search/store/filterContents";
import { useSearchContext } from "../../context/searchContext";
import "twin.macro";
import tw from "twin.macro";
import { filterStrapiDataWithoutPref } from "../../features/search/util/withoutPrefectrues/filterStrapiDataWithoutPref";
import { filterStrapiManualDataWithoutPref } from "../../features/search/util/withoutPrefectrues/filterStrapiManualDataWithputPref";

const SearchTargetAreaCard = (props: { area: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const filteredBizplanWithoutPref = filterStrapiDataWithoutPref();
  const filteredBizPlanManualWithoutPref = filterStrapiManualDataWithoutPref();
  const filteredAllBizPlan = [
    ...filteredBizplanWithoutPref,
    ...filteredBizPlanManualWithoutPref,
  ];
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
  let checkColor = tw``;
  let checkBoxColor = tw``;

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
      checkColor = tw`fill-gray-base `;
      checkBoxColor = tw`!bg-gray-base bg-opacity-30 border-opacity-30 border-gray-base`;
      break;
    case "hokkaido":
      area = checkboxArray.hokkaido;
      areaName = "北海道";
      areaColor = tw`bg-purple-hokkaido`;
      checkColor = tw`fill-purple-hokkaido `;
      checkBoxColor = tw`!bg-purple-hokkaido bg-opacity-30 border-opacity-30 border-purple-hokkaido`;
      break;
    case "tohoku":
      area = checkboxArray.tohoku;
      areaName = "東北";
      areaColor = tw`bg-purple-tohoku`;
      checkColor = tw`fill-purple-tohoku `;
      checkBoxColor = tw`!bg-purple-tohoku bg-opacity-30 border-opacity-30 border-purple-tohoku `;
      break;
    case "kanto":
      area = checkboxArray.kanto;
      areaName = "関東";
      areaColor = tw`bg-blue-kanto`;
      checkColor = tw`fill-blue-kanto `;
      checkBoxColor = tw`!bg-blue-kanto bg-opacity-30 border-opacity-30 border-blue-kanto `;
      break;
    case "hokuriku":
      area = checkboxArray.hokuriku;
      areaName = "北陸";
      areaColor = tw`bg-blue-hokuriku`;
      checkColor = tw`fill-blue-hokuriku `;
      checkBoxColor = tw`!bg-blue-hokuriku bg-opacity-30 border-opacity-30 border-blue-hokuriku `;
      break;
    case "tokai":
      area = checkboxArray.tokai;
      areaName = "東海";
      areaColor = tw`bg-green-tokai`;
      checkColor = tw`fill-green-tokai `;
      checkBoxColor = tw`!bg-green-tokai bg-opacity-30 border-opacity-30 border-green-tokai`;
      break;
    case "kinki":
      area = checkboxArray.kinki;
      areaName = "近畿";
      areaColor = tw`bg-green-kinki`;
      checkColor = tw`fill-green-kinki `;
      checkBoxColor = tw`!bg-green-kinki bg-opacity-30 border-opacity-30 border-green-kinki`;
      break;
    case "chugoku":
      area = checkboxArray.chugoku;
      areaName = "中国";
      areaColor = tw`bg-orange-chugoku`;
      checkColor = tw`fill-orange-chugoku `;
      checkBoxColor = tw`!bg-orange-chugoku bg-opacity-30 border-opacity-30 border-orange-chugoku`;
      break;
    case "shikoku":
      area = checkboxArray.shikoku;
      areaName = "四国";
      areaColor = tw`bg-yellow-shikoku`;
      checkColor = tw`fill-yellow-shikoku `;
      checkBoxColor = tw`!bg-yellow-shikoku bg-opacity-30 border-opacity-30 border-yellow-shikoku`;
      break;
    case "kyushu":
      area = checkboxArray.kyushu;
      areaName = "九州";
      areaColor = tw`bg-red-kyushu`;
      checkColor = tw`fill-red-kyushu `;
      checkBoxColor = tw`!bg-red-kyushu bg-opacity-30 border-opacity-30 border-red-kyushu `;
      break;
    case "okinawa":
      area = checkboxArray.okinawa;
      areaName = "沖縄";
      areaColor = tw`bg-red-okinawa`;
      checkColor = tw`fill-red-okinawa `;
      checkBoxColor = tw`!bg-red-okinawa bg-opacity-30 border-opacity-30 border-red-okinawa`;
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
    // return props.area !== "zenkoku" ? prefLength : allPrefLength;
    return prefLength;
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
          <button
            id={props.area}
            css={[checkBoxPrefArea, isAllPrefInArea && tw`bg-white`]}
            onClick={() => addAreaPref()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.003"
              height="11.252"
              viewBox="0 0 15.003 11.252"
              css={[checkMarkPref, isAllPrefInArea && checkColor]}
            >
              <path
                id="check"
                d="M300.625,135.16l-1.876-1.876h0L295,129.533l1.875-1.875,3.751,3.751,7.5-7.5L310,125.783Z"
                transform="translate(-294.999 -123.908)"
              />
            </svg>
          </button>
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
            <button
              css={[
                checkBoxPref,
                target_area.includes(checkbox) && checkBoxColor,
              ]}
              onClick={() => handleCheckbox(checkbox)}
              id={checkbox}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.003"
                height="11.252"
                viewBox="0 0 15.003 11.252"
                css={[
                  checkMarkPref,
                  target_area.includes(checkbox) && checkColor,
                ]}
              >
                <path
                  id="check"
                  d="M300.625,135.16l-1.876-1.876h0L295,129.533l1.875-1.875,3.751,3.751,7.5-7.5L310,125.783Z"
                  transform="translate(-294.999 -123.908)"
                />
              </svg>
            </button>
            {/* <Checkbox.Root
              id={checkbox}
              onCheckedChange={() =>
                // props.area !== "zenkoku"
                //   ? handleCheckbox(checkbox)
                //   : addAllPref()
                handleCheckbox(checkbox)
              }
              css={checkBox}
              checked={
                // props.area !== "zenkoku"
                //   ? target_area.includes(checkbox)
                //   : isAllPref
                target_area.includes(checkbox)
              }
            >
              <Checkbox.Indicator tw="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.003"
                  height="11.252"
                  viewBox="0 0 15.003 11.252"
                  css={checkMark}
                >
                  <path
                    id="check"
                    d="M300.625,135.16l-1.876-1.876h0L295,129.533l1.875-1.875,3.751,3.751,7.5-7.5L310,125.783Z"
                    transform="translate(-294.999 -123.908)"
                  />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Root> */}
            <label htmlFor={checkbox} tw="text-sm font-bold">
              <p tw="text-sm font-bold">{checkbox}</p>
              <p tw="text-xs">({pickupPref(checkbox)})</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTargetAreaCard;
