import * as Checkbox from "@radix-ui/react-checkbox";
import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { useStrapiContext } from "../../../../../context/strapiContext";
import { h3, hCenter } from "../../../../../styles/base";
import { checkBox, checkBoxSet, checkMark } from "../../../../../styles/form";
import "twin.macro";
import tw from "twin.macro";

const BusinessTypeName = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { allStrapiBizPlan, allStrapiBizPlanManual } = useStrapiContext();
  const { btnYear, btnCategory } = searchState;
  const { setBtnYear, setBtnCategory } = searchSetState;

  const businessTypeNameYear = allStrapiBizPlan.edges.map(
    (item) => item.node.business_type_name || ""
  );
  const businessTypeNameYearManual = allStrapiBizPlanManual.edges.map(
    (item) => item.node.business_type_name?.label || ""
  );
  const businessTypeNameYearSum = [
    ...businessTypeNameYear,
    ...businessTypeNameYearManual,
  ];
  const uniqueBusinessTypeNameYear = [...new Set(businessTypeNameYearSum)];
  const regexPattern = /\d{4}年度/g;
  const yearBusinessTypeNameYear = uniqueBusinessTypeNameYear.map((item) => {
    const matches = item?.match(regexPattern);
    return matches ? matches[0] : item;
  });
  const uniqueYearBusinessTypeNameYear = [
    ...new Set(yearBusinessTypeNameYear),
  ].sort((a, b) => {
    return b.localeCompare(a);
  });

  const businessTypeNameCategory = ["通常枠", "コロナ枠"];

  const handleYearCheckbox = (label: string) => {
    if (btnYear.includes(label)) {
      setBtnYear(btnYear.filter((btny) => btny !== label));
    } else {
      setBtnYear([...btnYear, label]);
    }
  };
  const handleCategoryCheckbox = (label: string) => {
    if (btnCategory.includes(label)) {
      setBtnCategory(btnCategory.filter((btny) => btny !== label));
    } else {
      setBtnCategory([...btnCategory, label]);
    }
  };

  return (
    <div>
      <div>
        <h3 css={h3}>採択事業年度</h3>
        <div
          tw="flex gap-y-2.5 flex-wrap px-3.5 py-2.5"
          css={props.path.includes("search") ? tw`gap-x-14` : tw`gap-x-3`}
        >
          {uniqueYearBusinessTypeNameYear.map((checkbox) => (
            <div key={checkbox} css={[hCenter, checkBoxSet]} tw="gap-2">
              <Checkbox.Root
                id={checkbox}
                onClick={() => handleYearCheckbox(checkbox)}
                css={checkBox}
                checked={btnYear.includes(checkbox)}
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
              </Checkbox.Root>
              <label htmlFor={checkbox}>{checkbox}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 css={h3}>事業枠</h3>
        <div
          tw="flex gap-y-2.5 flex-wrap px-3.5 py-2.5"
          css={props.path.includes("search") ? tw`gap-x-14` : tw`gap-x-3`}
        >
          {businessTypeNameCategory.map((checkbox) => (
            <div key={checkbox} css={[hCenter, checkBoxSet]} tw="gap-2">
              <Checkbox.Root
                id={checkbox}
                onClick={() => handleCategoryCheckbox(checkbox)}
                css={checkBox}
                checked={btnCategory.includes(checkbox)}
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
              </Checkbox.Root>
              <label htmlFor={checkbox}>
                {(checkbox === "通常枠" && "通常枠") ||
                  (checkbox === "コロナ枠" && "緊急支援枠")}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessTypeName;
