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

type ItemPerPageType = {
  itemPerPage: number;
  setItemPerPage: Dispatch<number>;
};

const selectItem = tw`ml-4`;
const selectCheck = tw`absolute left-1 inline-flex items-center justify-center`;

const ItemPerPage = ({ itemPerPage, setItemPerPage }: ItemPerPageType) => {
  return (
    <div css={hCenter} tw="gap-2 lg:(gap-0)">
      <p tw="text-sm">表示件数：</p>
      <Select.Root onValueChange={(e) => setItemPerPage(parseInt(e))}>
        <Select.Trigger
          aria-label="itemPerPage"
          tw="w-[75px] border justify-between rounded-[3px] py-1 px-2 border-gray-border"
          css={hCenter}
        >
          <Select.Value placeholder={itemPerPage} />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content tw="bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            <Select.Viewport tw="p-1.5">
              <Select.Item value="10" css={selectItem}>
                <Select.ItemText>10</Select.ItemText>
                <Select.ItemIndicator css={selectCheck}>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="30" css={selectItem}>
                <Select.ItemText>30</Select.ItemText>
                <Select.ItemIndicator css={selectCheck}>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="50" css={selectItem}>
                <Select.ItemText>50</Select.ItemText>
                <Select.ItemIndicator css={selectCheck}>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="100" css={selectItem}>
                <Select.ItemText>100</Select.ItemText>
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

export default ItemPerPage;
