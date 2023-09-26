import { Link, PageProps, graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import SearchSideBar from "../components/organisms/SearchSideBar";
import Layout from "../components/lauout/Layout";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { hCenter } from "../styles/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "twin.macro";
import { useFilteredStrapiContext } from "../context/filteredStrapiContext";
import ResultCard from "../components/molecules/ResultCard";
import PageNav from "../features/pagenation/component/molecules/PageNav";
import ItemPerPage from "../features/pagenation/component/atoms/ItemPerPage";
import PageNavTiny from "../features/pagenation/component/molecules/PageNavTiny";
import Modal from "react-modal";
import { useModalContext } from "../context/modalContext";
import ModalPrefectures from "../features/search/component/sidebar/modal/ModalPrefectures";

Modal.setAppElement("#___gatsby");

const Result = () => {
  const filteredAllBizPlan = useFilteredStrapiContext();
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(30);
  const { isModalOpen, setIsModalOpen } = useModalContext();

  const itemNum = filteredAllBizPlan.length;
  const totalPageNum = Math.ceil(itemNum / itemPerPage);
  const displayBizPlan = filteredAllBizPlan.slice(
    itemPerPage * (currentPageNo - 1),
    itemPerPage * currentPageNo
  );

  useEffect(() => {
    setCurrentPageNo(1);
  }, [filteredAllBizPlan, itemPerPage]);

  return (
    <Layout>
      <div tw="mb-[90px]">
        <div tw="text-sm p-2 bg-blue-base gap-2" css={hCenter}>
          <Link to="/">ホーム</Link>
          <FontAwesomeIcon icon={faAngleRight} />
          <p>検索結果</p>
        </div>

        <div tw="flex justify-between py-5 px-2.5">
          <div css={hCenter} tw="gap-8">
            <div>
              <p tw="text-sm">
                検索結果：<span tw="text-xl">{filteredAllBizPlan.length}</span>
                件
              </p>
            </div>
            <div>
              <ItemPerPage
                itemPerPage={itemPerPage}
                setItemPerPage={setItemPerPage}
              />
            </div>
          </div>
          <div>
            <PageNavTiny
              totalPageNum={totalPageNum}
              itemNum={itemNum}
              currentPageNo={currentPageNo}
              setCurrentPageNo={setCurrentPageNo}
              itemPerPage={itemPerPage}
            />
          </div>
        </div>

        <div tw="flex gap-2.5">
          <SearchSideBar />

          <div tw="w-[70%]">
            <div tw="flex flex-col gap-2.5">
              {displayBizPlan.map((item, i) => (
                <ResultCard key={i} content={item} />
              ))}
            </div>

            <PageNav
              totalPageNum={totalPageNum}
              itemNum={itemNum}
              currentPageNo={currentPageNo}
              setCurrentPageNo={setCurrentPageNo}
              itemPerPage={itemPerPage}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen !== ""}
        onRequestClose={() => setIsModalOpen("")}
        shouldCloseOnEsc={true}
        className="ResultModal"
        overlayClassName="ResultOverlay"
      >
        <ModalPrefectures />
      </Modal>
    </Layout>
  );
};

export default Result;
