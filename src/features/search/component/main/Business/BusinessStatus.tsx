import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import * as RadioGroup from "@radix-ui/react-radio-group";
import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { businessStatusArray } from "../../../store/filterContents";
import "twin.macro";
import { h3, hCenter } from "../../../../../styles/base";
import {
  checkBox,
  checkBoxList,
  checkBoxSet,
  checkMark,
} from "../../../../../styles/form";
import tw from "twin.macro";

const BusinessStatus = (props: { path: string }) => {
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
      <div
        tw="flex gap-y-2.5 flex-wrap px-3.5 py-2.5"
        css={props.path.includes("search") ? tw`gap-x-14` : tw`gap-x-3`}
      >
        {checkboxArray.map((checkbox) => (
          <div key={checkbox.code} css={[hCenter, checkBoxSet]}>
            <Checkbox.Root
              id={checkbox.label}
              onCheckedChange={() => handleCheckbox(checkbox.code)}
              css={checkBox}
              checked={business_status === checkbox.code}
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

export default BusinessStatus;
