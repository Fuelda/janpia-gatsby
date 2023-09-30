import React from "react";
import { sdgsGoalArray } from "../../../store/filterContents";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useSearchContext } from "../../../../../context/searchContext";
import "twin.macro";
import { checkBox, checkBoxList } from "../../../../../styles/form";
import { h3, hCenter } from "../../../../../styles/base";
import tw from "twin.macro";

const SdgsGoal = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { sdgs_goal } = searchState;
  const { setSdgsGoal } = searchSetState;
  const checkboxArray = sdgsGoalArray;

  const handleCheckbox = (code: string) => {
    if (sdgs_goal.includes(code)) {
      setSdgsGoal(sdgs_goal.filter((sg) => sg !== code));
    } else {
      setSdgsGoal([...sdgs_goal, code]);
    }
  };

  const allSdgs = sdgsGoalArray.map((sdgs) => sdgs.code);

  return (
    <div>
      <h3 css={h3}>SDGs</h3>
      <div>
        <div tw="mt-[5px] px-3.5 pt-2.5">
          <div css={hCenter} tw="gap-2">
            <Checkbox.Root
              id="allSdgs"
              onCheckedChange={() => setSdgsGoal(allSdgs)}
              css={checkBox}
              checked={
                sdgs_goal.sort().toString() === allSdgs.sort().toString()
              }
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor="allSdgs">すべてにチェック</label>
          </div>
        </div>
        <div
          tw="gap-y-2.5 px-3.5 py-2.5"
          css={
            props.path === "search"
              ? tw`grid grid-cols-3 lg:(flex flex-col)`
              : tw`flex flex-col`
          }
        >
          {checkboxArray.map((checkbox) => (
            <div key={checkbox.code} css={hCenter} tw="gap-1.5">
              <Checkbox.Root
                id={checkbox.code}
                onCheckedChange={() => handleCheckbox(checkbox.code)}
                css={checkBox}
                checked={sdgs_goal.includes(checkbox.code)}
              >
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor={checkbox.code}>{checkbox.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SdgsGoal;
