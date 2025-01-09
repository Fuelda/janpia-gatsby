import * as Checkbox from "@radix-ui/react-checkbox";
import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { h3, hCenter } from "../../../../../styles/base";
import { checkBox, checkBoxSet, checkMark } from "../../../../../styles/form";
import "twin.macro";
import tw from "twin.macro";
import { convertBusinessTypeNameLabel } from "../../../../../util/businessTypeNameChecker";

const BusinessTypeName = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { btnCategory } = searchState;
  const { setBtnCategory } = searchSetState;

  const businessTypeNameCategory = ["通常枠", "コロナ枠", "活動支援"];

  const handleCategoryCheckbox = (label: string) => {
    if (btnCategory.includes(label)) {
      setBtnCategory(btnCategory.filter((btny) => btny !== label));
    } else {
      setBtnCategory([...btnCategory, label]);
    }
  };

  return (
    <div>
      <div>
        <h3 css={h3}>事業枠</h3>
        <div
          tw="flex gap-y-2.5 flex-wrap px-3.5 py-2.5"
          css={props.path.includes("search") ? tw`gap-x-14` : tw`gap-x-3`}
        >
          {businessTypeNameCategory.map((checkbox) => (
            <div key={checkbox} css={[hCenter, checkBoxSet]}>
              <Checkbox.Root
                id={checkbox}
                onClick={() =>
                  handleCategoryCheckbox(convertBusinessTypeNameLabel(checkbox))
                }
                css={checkBox}
                checked={btnCategory.includes(
                  convertBusinessTypeNameLabel(checkbox)
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
              <label htmlFor={checkbox}>
                {convertBusinessTypeNameLabel(checkbox)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessTypeName;
