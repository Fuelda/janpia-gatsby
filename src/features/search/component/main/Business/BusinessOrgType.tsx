import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { OrganizationTypeCdArray } from "../../../store/filterContents";
import "twin.macro";
import {
  checkBox,
  checkBoxList,
  checkBoxSet,
  checkMark,
} from "../../../../../styles/form";
import { h3, hCenter } from "../../../../../styles/base";
import tw from "twin.macro";

const BusinessOrgType = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { business_org_type } = searchState;
  const { setBusinessOrgType } = searchSetState;
  const checkboxArray = OrganizationTypeCdArray;

  const handleCheckbox = (code: string) => {
    if (business_org_type.includes(code)) {
      setBusinessOrgType(business_org_type.filter((bot) => bot !== code));
    } else {
      setBusinessOrgType([...business_org_type, code]);
    }
  };

  return (
    <div>
      <h3 css={h3}>団体種別</h3>
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
              checked={business_org_type.includes(checkbox.code)}
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

export default BusinessOrgType;
