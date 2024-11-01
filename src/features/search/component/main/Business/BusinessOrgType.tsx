import * as Checkbox from "@radix-ui/react-checkbox";
import React, { useState } from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { OrganizationTypeCdArray } from "../../../store/filterContents";
import "twin.macro";
import { checkBox, checkBoxSet, checkMark } from "../../../../../styles/form";
import { h3, hCenter } from "../../../../../styles/base";
import tw from "twin.macro";

const BusinessOrgType = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { orgTypeSelections } = searchState;
  const { setOrgTypeSelections } = searchSetState;

  const handleCheckbox = ({
    code,
    activitySupport,
  }: {
    code: string;
    activitySupport: boolean;
  }) => {
    if (
      orgTypeSelections.some(
        (ot) => ot.code === code && ot.activitySupport === activitySupport
      )
    ) {
      setOrgTypeSelections(
        orgTypeSelections.filter(
          (ot) => ot.code !== code || ot.activitySupport !== activitySupport
        )
      );
    } else {
      setOrgTypeSelections([...orgTypeSelections, { code, activitySupport }]);
    }
  };

  return (
    <div>
      <h3 css={h3}>団体種別</h3>
      <div
        tw="flex gap-y-2.5 flex-wrap px-3.5 py-2.5"
        css={props.path.includes("search") ? tw`gap-x-14` : tw`gap-x-3`}
      >
        {OrganizationTypeCdArray.map((checkbox, index) => (
          <div
            key={checkbox.code + index.toString()}
            css={[hCenter, checkBoxSet]}
          >
            <Checkbox.Root
              id={checkbox.label}
              onCheckedChange={() =>
                handleCheckbox({
                  code: checkbox.code,
                  activitySupport: checkbox.activitySupport,
                })
              }
              css={checkBox}
              checked={orgTypeSelections.some(
                (ot) =>
                  ot.code === checkbox.code &&
                  ot.activitySupport === checkbox.activitySupport
              )}
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
