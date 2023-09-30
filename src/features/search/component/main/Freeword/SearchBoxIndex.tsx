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
import { hCenter } from "../../../../../styles/base";
import { textField } from "../../../../../styles/form";
import { Link } from "gatsby";

const SearchBoxIndex = (props: UseSearchBoxProps) => {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchStalled = status === "stalled";

  const setQuery = (newQuery: string) => {
    setInputValue(newQuery);
    refine(newQuery);
  };

  return (
    <div tw="w-full ">
      <form
        tw="w-full relative"
        action=""
        role="search"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        onReset={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setQuery("");
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <input
          css={textField}
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="キーワードを入力してください"
          spellCheck={false}
          maxLength={512}
          type="search"
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          autoFocus
        />
        <div
          css={hCenter}
          tw="absolute right-1 top-1/2 transform -translate-y-1/2 gap-4"
        >
          <button
            type="reset"
            tw=""
            hidden={inputValue.length === 0 || isSearchStalled}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <Link
            to="/result"
            tw=" text-lg  p-2.5 bg-blue-button rounded text-white tracking-widest"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} tw="mr-1.5" />検 索
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SearchBoxIndex;
