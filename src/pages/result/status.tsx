import React from "react";
import { hCenter, wrapperSp } from "../../styles/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SearchSideBar from "../../components/organisms/SearchSideBar";
import { Link } from "gatsby";
import "twin.macro";
import "@fontsource-variable/noto-sans-jp";
import "../../styles/global.css";
import { GlobalStyles } from "twin.macro";

const Status = () => {
  return (
    <div>
      <GlobalStyles />
      <div tw="py-5" css={wrapperSp}>
        <div tw="justify-between" css={hCenter}>
          <p>検索条件を指定してください。</p>
          <Link to="/result" tw="w-7 h-7 text-gray-black">
            <FontAwesomeIcon icon={faXmark} tw="w-full h-full" />
          </Link>
        </div>
        <div tw="mt-5">
          <SearchSideBar />
        </div>
      </div>
    </div>
  );
};

export default Status;
