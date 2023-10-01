import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { h3, hCenter } from "../../../../../styles/base";
import { prefecturesArray } from "../../../store/filterContents";
import { checkBox, checkBoxSet } from "../../../../../styles/form";
import "twin.macro";
import { useSearchContext } from "../../../../../context/searchContext";
import { filterStrapiDataWithoutPref } from "../../../util/withoutPrefectrues/filterStrapiDataWithoutPref";
import { filterStrapiManualDataWithoutPref } from "../../../util/withoutPrefectrues/filterStrapiManualDataWithputPref";

const PrefecturesSpItem = (props: { area: string }) => {
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

  let area: string[] = [];
  let areaName = "";
  switch (props.area) {
    case "hokkaido":
      area = checkboxArray.hokkaido;
      areaName = "北海道";
      break;
    case "tohoku":
      area = checkboxArray.tohoku;
      areaName = "東北";
      break;
    case "kanto":
      area = checkboxArray.kanto;
      areaName = "関東";
      break;
    case "hokuriku":
      area = checkboxArray.hokuriku;
      areaName = "北陸";
      break;
    case "tokai":
      area = checkboxArray.tokai;
      areaName = "東海";
      break;
    case "kinki":
      area = checkboxArray.kinki;
      areaName = "近畿";
      break;
    case "chugoku":
      area = checkboxArray.chugoku;
      areaName = "中国";
      break;
    case "shikoku":
      area = checkboxArray.shikoku;
      areaName = "四国";
      break;
    case "kyushu":
      area = checkboxArray.kyushu;
      areaName = "九州";
      break;
    case "okinawa":
      area = checkboxArray.okinawa;
      areaName = "沖縄";
      break;
    default:
      area = [];
      areaName = "";
  }

  const handleCheckbox = (pref: string) => {
    if (prefectures.includes(pref)) {
      setPrefectures(prefectures.filter((p) => p !== pref));
    } else {
      setPrefectures([...prefectures, pref]);
    }
  };

  const pickupPref = (pref: string) => {
    const prefLength = filteredAllBizPlan.filter((item) =>
      item.group.some((g: any) => g.groupData.prefectures === pref)
    ).length;
    return prefLength;
  };

  return (
    <div>
      <h3 css={h3}>{areaName}</h3>
      <div tw="flex gap-y-2.5 flex-wrap px-3.5 py-2.5 gap-x-3">
        {area.map((checkbox) => (
          <div key={checkbox} css={[hCenter]} tw="w-[45%] gap-2">
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
            <label htmlFor={checkbox}>
              <p tw="">{`${checkbox} (${pickupPref(checkbox)})`}</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrefecturesSpItem;
