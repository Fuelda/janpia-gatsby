import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import * as RadioGroup from "@radix-ui/react-radio-group";
import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { businessStatusArray } from "../../../store/filterContents";
import "twin.macro";
import { h3, hCenter } from "../../../../../styles/base";
import { checkBox, checkBoxList } from "../../../../../styles/form";

const BusinessStatus = () => {
  const { searchState, searchSetState } = useSearchContext();
  const { business_status } = searchState;
  const { setBusinessStatus } = searchSetState;
  const checkboxArray = businessStatusArray;

  const handleCheckbox = (code: number) => {
    business_status !== code
      ? setBusinessStatus(code)
      : setBusinessStatus(null);
  };

  return (
    <div>
      <h3 css={h3}>事業ステータス</h3>
      <div css={checkBoxList} tw="px-3.5 py-2.5">
        {checkboxArray.map((checkbox) => (
          <div key={checkbox.code} css={hCenter} tw="gap-2">
            <Checkbox.Root
              id={checkbox.label}
              onCheckedChange={() => handleCheckbox(checkbox.code)}
              css={checkBox}
              checked={business_status === checkbox.code}
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

export default BusinessStatus;
