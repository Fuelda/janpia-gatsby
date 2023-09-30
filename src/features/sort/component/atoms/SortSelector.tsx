import React, { Dispatch } from "react";
import "twin.macro";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { hCenter } from "../../../../styles/base";
import tw from "twin.macro";

type SortSelectorType = {
  currentSort: string;
  setCurrentSort: Dispatch<string>;
};

const selectItem = tw`ml-4`;
const selectCheck = tw`absolute left-1 inline-flex items-center justify-center`;

const SortSelector = ({ currentSort, setCurrentSort }: SortSelectorType) => {
  return (
    <div css={hCenter} tw="gap-2 lg:(gap-0)">
      <p tw="text-sm">表示順：</p>
      <Select.Root onValueChange={(e) => setCurrentSort(e)}>
        <Select.Trigger
          aria-label="sortSelector"
          tw="w-[200px] border justify-between rounded-[3px] py-1 px-2 border-gray-border lg:(w-[164px])"
          css={hCenter}
        >
          <Select.Value placeholder="選択してください" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content tw="bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            <Select.Viewport tw="p-1.5">
              <Select.Item value="bizPlan" css={selectItem}>
                <Select.ItemText>事業名順</Select.ItemText>
                <Select.ItemIndicator css={selectCheck}>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="group" css={selectItem}>
                <Select.ItemText>団体名順</Select.ItemText>
                <Select.ItemIndicator css={selectCheck}>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="year" css={selectItem}>
                <Select.ItemText>採択事業年度順</Select.ItemText>
                <Select.ItemIndicator css={selectCheck}>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default SortSelector;
