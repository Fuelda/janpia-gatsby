import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import {
  OrganizationTypeCdArray,
  topicKeywordArray,
} from "../../../store/filterContents";
import "twin.macro";
import {
  checkBox,
  checkBoxList,
  checkBoxSet,
  checkMark,
} from "../../../../../styles/form";
import { h3, hCenter } from "../../../../../styles/base";
import tw from "twin.macro";

const TopicKeyword = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { topic_keywords } = searchState;
  const { setTopicKeywords } = searchSetState;
  const checkboxArray = topicKeywordArray;

  const handleCheckbox = (label: string) => {
    if (topic_keywords.includes(label)) {
      setTopicKeywords(topic_keywords.filter((tk) => tk !== label));
    } else {
      setTopicKeywords([...topic_keywords, label]);
    }
  };

  return (
    <div>
      <h3 css={h3}>話題のキーワード</h3>
      <div
        tw="flex gap-y-2.5 flex-wrap px-3.5 py-2.5"
        css={props.path.includes("search") ? tw`gap-x-14` : tw`gap-x-3`}
      >
        {checkboxArray.map((checkbox) => (
          <div key={checkbox} css={[hCenter, checkBoxSet]}>
            <Checkbox.Root
              id={checkbox}
              onCheckedChange={() => handleCheckbox(checkbox)}
              css={checkBox}
              checked={topic_keywords.includes(checkbox)}
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
            <label htmlFor={checkbox}>{checkbox}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicKeyword;
