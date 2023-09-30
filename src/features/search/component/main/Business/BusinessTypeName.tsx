import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { useStrapiContext } from "../../../../../context/strapiContext";
import { h3, hCenter } from "../../../../../styles/base";
import {
  checkBox,
  checkBoxList,
  checkBoxSet,
} from "../../../../../styles/form";
import "twin.macro";
import tw from "twin.macro";

const BusinessTypeName = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { allStrapiBizPlan, allStrapiBizPlanManual } = useStrapiContext();
  const { business_type_name, btnYear, btnCategory } = searchState;
  const { setBusinessTypeName, setBtnYear, setBtnCategory } = searchSetState;

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
    btnYear !== label ? setBtnYear(label) : setBtnYear("");
  };
  const handleCategoryCheckbox = (label: string) => {
    btnCategory !== label ? setBtnCategory(label) : setBtnCategory("");
  };

  useEffect(() => {
    setBusinessTypeName(btnYear + btnCategory);
  }, [btnYear, btnCategory]);

  useEffect(() => {
    business_type_name === "" && setBtnYear("");
    business_type_name === "" && setBtnCategory("");
  }, [business_type_name]);

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
                checked={btnYear === checkbox}
              >
                <Checkbox.Indicator>
                  <CheckIcon />
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
                checked={btnCategory === checkbox}
              >
                <Checkbox.Indicator>
                  <CheckIcon />
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
