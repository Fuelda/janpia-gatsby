import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useSearchContext } from "../../../../../context/searchContext";
import { subsidyAmountArray } from "../../../store/filterContents";
import {
  checkBox,
  checkBoxList,
  checkBoxSet,
  checkMark,
} from "../../../../../styles/form";
import "twin.macro";
import { h3, hCenter } from "../../../../../styles/base";
import tw from "twin.macro";

const SubsidyAmount = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { subsidy_amount } = searchState;
  const { setSubsidyAmount } = searchSetState;

  const checkboxArray = subsidyAmountArray;

  const handleCheckbox = (min: number, max: number) => {
    if (subsidy_amount.some((sa) => sa.min === min)) {
      setSubsidyAmount(subsidy_amount.filter((sa) => sa.min !== min));
    } else {
      setSubsidyAmount([...subsidy_amount, { min: min, max: max }]);
    }
  };

  return (
    <div>
      <h3 css={h3}>助成額</h3>
      <div
        tw="flex gap-y-2.5 flex-wrap px-3.5 py-2.5"
        css={props.path.includes("search") ? tw`gap-x-14` : tw`gap-x-3`}
      >
        {checkboxArray.map((checkbox) => (
          <div key={checkbox.label} css={[hCenter, checkBoxSet]}>
            <Checkbox.Root
              id={checkbox.label}
              onCheckedChange={() => handleCheckbox(checkbox.min, checkbox.max)}
              css={checkBox}
              checked={subsidy_amount.some((sa) => sa.min === checkbox.min)}
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
            <label htmlFor={checkbox.label}>{checkbox.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubsidyAmount;
