import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch } from "react";
import "twin.macro";
import SearchSideBar from "./SearchSideBar";
import { hCenter, wrapperSp } from "../../styles/base";

const SearchSpBar = (props: { setState: Dispatch<boolean> }) => {
  const { setState } = props;

  return (
    <div
      tw="w-screen h-screen bg-white z-40 fixed top-0 overflow-scroll py-5"
      css={wrapperSp}
    >
      <div tw="justify-between" css={hCenter}>
        <p>検索条件を指定してください。</p>
        <button onClick={() => setState(false)} tw="w-7 h-7 text-gray-black">
          <FontAwesomeIcon icon={faXmark} tw="w-full h-full" />
        </button>
      </div>
      <div tw="mt-5">
        <SearchSideBar />
      </div>
    </div>
  );
};

export default SearchSpBar;
