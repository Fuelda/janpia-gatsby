import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { businessCategoryArray } from "../../../store/filterContents";
import { checkBox, checkBoxList } from "../../../../../styles/form";
import "twin.macro";
import { h3, hCenter } from "../../../../../styles/base";

const BusinessCategory = () => {
  const { searchState, searchSetState } = useSearchContext();
  const { business_category } = searchState;
  const { setBusinessCategory } = searchSetState;

  const checkboxArray = businessCategoryArray;

  const handleCheckbox = (code: number, subCode: number) => {
    if (
      business_category.some((bc) => bc.code === code && bc.subCode === subCode)
    ) {
      setBusinessCategory(
        business_category.filter(
          (bc) => bc.code !== code || bc.subCode !== subCode
        )
      );
    } else {
      setBusinessCategory([
        ...business_category,
        { code: code, subCode: subCode },
      ]);
    }
  };

  return (
    <div>
      <h3 css={h3}>事業分類</h3>
      <div css={checkBoxList} tw="flex-wrap gap-y-2.5 px-3.5 py-2.5">
        {checkboxArray.map((checkbox) => (
          <div key={checkbox.label} css={hCenter} tw="gap-2">
            <Checkbox.Root
              id={checkbox.label}
              onCheckedChange={() =>
                handleCheckbox(checkbox.code, checkbox.subCode)
              }
              css={checkBox}
              checked={business_category.some(
                (bc) => bc.subCode === checkbox.subCode
              )}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor={checkbox.label}>{checkbox.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessCategory;
