import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import {
  UseSearchBoxProps,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch";
import "twin.macro";
import { h3, hCenter } from "../../../../../styles/base";
import {
  checkBox,
  checkBoxSet,
  checkMark,
  textField,
} from "../../../../../styles/form";
import { Link } from "gatsby";
import { topicKeywordArray } from "../../../store/filterContents";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useSearchContext } from "../../../../../context/searchContext";

const SearchBoxTopicKeyword = (props: UseSearchBoxProps) => {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchState, searchSetState } = useSearchContext();
  const { topic_keywords } = searchState;
  const { setTopicKeywords } = searchSetState;
  const checkboxArray = topicKeywordArray;

  const isSearchStalled = status === "stalled";

  const setQuery = (newQuery: string) => {
    setInputValue(newQuery);
    refine(newQuery);
  };

  const handleCheckbox = (label: string) => {
    if (topic_keywords.includes(label)) {
      setTopicKeywords(topic_keywords.filter((tk) => tk !== label));
    } else {
      setTopicKeywords([...topic_keywords, label]);
    }
    setQuery(label);
  };

  return (
    <div tw="w-full ">
      <h3 css={h3}>話題のキーワード</h3>
      <div tw="flex gap-x-14 gap-y-2.5 flex-wrap px-3.5 py-2.5">
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

export default SearchBoxTopicKeyword;
