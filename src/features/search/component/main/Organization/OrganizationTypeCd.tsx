import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { OrganizationTypeCdArray } from "../../../store/filterContents";
import "twin.macro";
import { h3, hCenter } from "../../../../../styles/base";
import {
  checkBox,
  checkBoxList,
  checkBoxSet,
  checkMark,
} from "../../../../../styles/form";
import tw from "twin.macro";

const OrganizationTypeCd = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { organization_type_cd } = searchState;
  const { setOrganizationTypeCd } = searchSetState;
  const checkboxArray = OrganizationTypeCdArray;

  const handleCheckbox = (code: string) => {
    if (organization_type_cd.includes(code)) {
      setOrganizationTypeCd(organization_type_cd.filter((otc) => otc !== code));
    } else {
      setOrganizationTypeCd([...organization_type_cd, code]);
    }
  };

  return (
    <div>
      <h3 css={h3}>団体種別</h3>
      <div
        tw="flex gap-y-2.5 flex-wrap px-3.5 py-2.5"
        css={props.path.includes("search") ? tw`gap-x-14` : tw`gap-x-3`}
      >
        {checkboxArray.map((checkbox, index) => (
          <div
            key={checkbox.code + index.toString()}
            css={[hCenter, checkBoxSet]}
          >
            <Checkbox.Root
              id={checkbox.code}
              onCheckedChange={() => handleCheckbox(checkbox.code)}
              css={checkBox}
              checked={organization_type_cd.includes(checkbox.code)}
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
            <label htmlFor={checkbox.code}>{checkbox.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationTypeCd;
