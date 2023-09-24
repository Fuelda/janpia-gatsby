import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { OrganizationTypeCdArray } from "../../../store/filterContents";
import "twin.macro";
import { checkBox, checkBoxList } from "../../../../../styles/form";
import { h3, hCenter } from "../../../../../styles/base";

const BusinessOrgType = () => {
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
      <div css={checkBoxList} tw="px-3.5 py-2.5">
        {checkboxArray.map((checkbox) => (
          <div key={checkbox.code} css={hCenter} tw="gap-2">
            <Checkbox.Root
              id={checkbox.label}
              onCheckedChange={() => handleCheckbox(checkbox.code)}
              css={checkBox}
              checked={business_org_type.includes(checkbox.code)}
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

export default BusinessOrgType;
