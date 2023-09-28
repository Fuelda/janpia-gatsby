import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { legalPersonalityArray } from "../../../store/filterContents";
import { checkBox } from "../../../../../styles/form";
import { h3, hCenter } from "../../../../../styles/base";
import "twin.macro";

const LegalPersonality = () => {
  const { searchState, searchSetState } = useSearchContext();
  const { legal_personality } = searchState;
  const { setLegalPersonality } = searchSetState;
  const checkboxArray = legalPersonalityArray;

  const handleCheckbox = (code: number) => {
    if (legal_personality.includes(code)) {
      setLegalPersonality(legal_personality.filter((lp) => lp !== code));
    } else {
      setLegalPersonality([...legal_personality, code]);
    }
  };

  return (
    <div>
      <h3 css={h3}>法人格</h3>
      <div tw="flex gap-4 gap-y-2.5 flex-wrap px-3.5 py-2.5">
        {checkboxArray.map((checkbox) => (
          <div key={checkbox.code} css={hCenter} tw="gap-2 w-[124px]">
            <Checkbox.Root
              id={String(checkbox.code)}
              onCheckedChange={() => handleCheckbox(checkbox.code)}
              css={checkBox}
              checked={legal_personality.includes(checkbox.code)}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor={String(checkbox.code)}>{checkbox.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalPersonality;
