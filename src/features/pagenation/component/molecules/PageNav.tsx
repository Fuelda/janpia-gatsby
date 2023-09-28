import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch } from "react";
import "twin.macro";
import { vCenter } from "../../../../styles/base";
import tw from "twin.macro";

type pageNavType = {
  totalPageNum: number;
  itemNum: number;
  currentPageNo: number;
  setCurrentPageNo: Dispatch<number>;
  itemPerPage: number;
};

const PageNav = ({
  totalPageNum,
  itemNum,
  currentPageNo,
  setCurrentPageNo,
  itemPerPage,
}: pageNavType) => {
  const pageButtons = [];
  for (let i = 1; i <= totalPageNum; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPageNo(i)}
        tw="w-[30px] h-[30px]"
        css={currentPageNo === i && tw`bg-blue-base text-blue-button `}
      >
        {i}
      </button>
    );
  }

  return (
    <div css={vCenter} tw="mt-5">
      <div tw="flex">
        {!(currentPageNo === 1) && (
          <div>
            <button tw="mr-4" onClick={() => setCurrentPageNo(1)}>
              <FontAwesomeIcon tw="text-gray-black" icon={faAnglesLeft} />
            </button>
            <button
              tw="mr-6"
              onClick={() => setCurrentPageNo(currentPageNo - 1)}
            >
              <FontAwesomeIcon tw="text-gray-black" icon={faAngleLeft} />
            </button>
          </div>
        )}

        <div tw="flex">{pageButtons}</div>

        {!(currentPageNo === totalPageNum) && (
          <div>
            <button
              tw="ml-6"
              onClick={() => setCurrentPageNo(currentPageNo + 1)}
            >
              <FontAwesomeIcon tw="text-gray-black" icon={faAngleRight} />
            </button>
            <button tw="ml-4" onClick={() => setCurrentPageNo(totalPageNum)}>
              <FontAwesomeIcon tw="text-gray-black" icon={faAnglesRight} />
            </button>
          </div>
        )}
      </div>

      <div tw="mt-3">
        {`${itemPerPage * (currentPageNo - 1) + 1}-${
          itemPerPage * currentPageNo <= itemNum
            ? itemPerPage * currentPageNo
            : itemNum
        } / ${itemNum}`}
      </div>
    </div>
  );
};

export default PageNav;
