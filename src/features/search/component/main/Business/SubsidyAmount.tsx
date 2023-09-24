import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useSearchContext } from "../../../../../context/searchContext";
import { subsidyAmountArray } from "../../../store/filterContents";
import { checkBox, checkBoxList } from "../../../../../styles/form";
import "twin.macro";
import { h3, hCenter } from "../../../../../styles/base";

const SubsidyAmount = () => {
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
      <div css={checkBoxList} tw="flex-wrap gap-y-2.5 px-3.5 py-2.5">
        {checkboxArray.map((checkbox) => (
          <div key={checkbox.label} css={hCenter} tw="gap-2">
            <Checkbox.Root
              id={checkbox.label}
              onCheckedChange={() => handleCheckbox(checkbox.min, checkbox.max)}
              css={checkBox}
              checked={subsidy_amount.some((sa) => sa.min === checkbox.min)}
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

export default SubsidyAmount;
