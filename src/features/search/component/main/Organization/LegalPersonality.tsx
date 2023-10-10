import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { legalPersonalityArray } from "../../../store/filterContents";
import { checkBox, checkBoxSet, checkMark } from "../../../../../styles/form";
import { h3, hCenter } from "../../../../../styles/base";
import "twin.macro";
import tw from "twin.macro";

const legalPersonalityLabelArray = [
  { code: [1, 2], label: "NPO法人" },
  { code: [12], label: "株式会社" },
  { code: [3, 7], label: "社団法人" },
  { code: [4, 8], label: "財団法人" },
  { code: [20], label: "社会福祉法人" },
  { code: [14], label: "更生保護法人" },
  { code: [24], label: "任意団体" },
  { code: [99], label: "その他" },
];

const LegalPersonality = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { legal_personality } = searchState;
  const { setLegalPersonality } = searchSetState;
  const checkboxArray = legalPersonalityArray;

  const handleCheckbox = (code: number[]) => {
    if (legal_personality.includes(code[0])) {
      setLegalPersonality(legal_personality.filter((lp) => !code.includes(lp)));
    } else {
      setLegalPersonality([...legal_personality, ...code]);
    }
  };

  return (
    <div>
      <h3 css={h3}>法人格</h3>
      <div
        tw="flex gap-y-2.5 flex-wrap px-3.5 py-2.5"
        css={props.path.includes("/search/") ? tw`gap-x-14` : tw`gap-x-3`}
      >
        {legalPersonalityLabelArray.map((checkbox) => (
          <div key={checkbox.label} css={[hCenter, checkBoxSet]}>
            <Checkbox.Root
              id={String(checkbox.code)}
              onCheckedChange={() => handleCheckbox(checkbox.code)}
              css={checkBox}
              checked={legal_personality.includes(checkbox.code[0])}
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
            <label htmlFor={String(checkbox.code)} tw="">
              {checkbox.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalPersonality;
