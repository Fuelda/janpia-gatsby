import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
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

const SearchPrefectureCard = (props: { area: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const filteredBizplanWithoutPref = filterStrapiDataWithoutPref();
  const filteredBizPlanManualWithoutPref = filterStrapiManualDataWithoutPref();
  const filteredAllBizPlan = [
    ...filteredBizplanWithoutPref,
    ...filteredBizPlanManualWithoutPref,
  ];
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
  let checkColor = tw``;
  let checkBoxColor = tw``;

  switch (props.area) {
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
      (item) =>
        item.group.some((g: any) => g.groupData.prefectures === pref) ||
        item.mainGroup?.node.prefectures === pref
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
        {/* <Checkbox.Root
          id={props.area}
          css={checkBoxPrefArea}
          onCheckedChange={() => addAreaPref()}
          checked={isAllPrefInArea}
        >
          <Checkbox.Indicator tw="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.003"
              height="11.252"
              viewBox="0 0 15.003 11.252"
              css={checkColor}
            >
              <path
                id="check"
                d="M300.625,135.16l-1.876-1.876h0L295,129.533l1.875-1.875,3.751,3.751,7.5-7.5L310,125.783Z"
                transform="translate(-294.999 -123.908)"
              />
            </svg>
          </Checkbox.Indicator>
        </Checkbox.Root> */}
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
                prefectures.includes(checkbox) && checkBoxColor,
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
                  prefectures.includes(checkbox) && checkColor,
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
              onCheckedChange={() => handleCheckbox(checkbox)}
              css={[
                checkBoxPref,
                prefectures.includes(checkbox) && checkBoxColor,
              ]}
              checked={prefectures.includes(checkbox)}
            >
              <Checkbox.Indicator tw="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.003"
                  height="11.252"
                  viewBox="0 0 15.003 11.252"
                  css={checkColor}
                >
                  <path
                    id="check"
                    d="M300.625,135.16l-1.876-1.876h0L295,129.533l1.875-1.875,3.751,3.751,7.5-7.5L310,125.783Z"
                    transform="translate(-294.999 -123.908)"
                  />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Root> */}
            <label htmlFor={checkbox}>
              <p tw="text-sm font-bold">{checkbox}</p>
              <p tw="text-xs">({pickupPref(checkbox)})</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPrefectureCard;
