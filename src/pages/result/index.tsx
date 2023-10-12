import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import SearchSideBar from "../../components/organisms/SearchSideBar";
import Layout from "../../components/lauout/Layout";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { hCenter } from "../../styles/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "twin.macro";
import { useFilteredStrapiContext } from "../../context/filteredStrapiContext";
import ResultCard from "../../components/molecules/ResultCard";
import PageNav from "../../features/pagenation/component/molecules/PageNav";
import ItemPerPage from "../../features/pagenation/component/atoms/ItemPerPage";
import PageNavTiny from "../../features/pagenation/component/molecules/PageNavTiny";
import SortSelector from "../../features/sort/component/atoms/SortSelector";
import ChangeSearchStatusButton from "../../components/atoms/ChangeSearchStatusButton";

const Result = () => {
  const filteredAllBizPlan = useFilteredStrapiContext();
  const [currentSort, setCurrentSort] = useState("bizPlan");
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(30);

  const sortByBizPlan = (a: any, b: any) =>
    new Intl.Collator("ja").compare(
      a.bizPlan.business_name,
      b.bizPlan.business_name
    );
  const sortByGroup = (a: any, b: any) =>
    new Intl.Collator("ja").compare(
      a.mainGroup ? a.mainGroup.node.organization_name : "",
      b.mainGroup ? b.mainGroup.node.organization_name : ""
    );
  const sortByYear = (a: any, b: any) => {
    const yearA =
      (a.bizPlan.business_type_name.label &&
        a.bizPlan.business_type_name.label.toLowerCase()) ||
      a.bizPlan.business_type_name.toLowerCase();
    const yearB =
      (b.bizPlan.business_type_name.label &&
        b.bizPlan.business_type_name.label.toLowerCase()) ||
      b.bizPlan.business_type_name.toLowerCase();
    return yearA > yearB ? -1 : 1;
  };

  const sortFunction =
    (currentSort === "bizPlan" && sortByBizPlan) ||
    (currentSort === "group" && sortByGroup) ||
    (currentSort === "year" && sortByYear) ||
    ((a: any, b: any) => 1 | -1);
  const sortedBizPlan = filteredAllBizPlan.sort(sortFunction);

  const itemNum = sortedBizPlan.length;
  const totalPageNum = Math.ceil(itemNum / itemPerPage);
  const displayBizPlan = sortedBizPlan.slice(
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

        <div tw="flex justify-between py-5 px-2.5 lg:(py-3)">
          <div css={hCenter} tw="gap-8 lg:(flex-col items-start w-full gap-2)">
            <div>
              <p tw="text-sm">
                検索結果：<span tw="text-xl">{filteredAllBizPlan.length}</span>
                件
              </p>
            </div>
            <div css={hCenter} tw="gap-8 lg:(w-full)">
              <SortSelector
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
              />
              <ItemPerPage
                itemPerPage={itemPerPage}
                setItemPerPage={setItemPerPage}
              />
            </div>
          </div>
          <div tw="lg:(hidden)">
            <PageNavTiny
              totalPageNum={totalPageNum}
              itemNum={itemNum}
              currentPageNo={currentPageNo}
              setCurrentPageNo={setCurrentPageNo}
              itemPerPage={itemPerPage}
            />
          </div>
        </div>

        <div tw="hidden lg:(block px-2.5 pb-2.5)">
          <ChangeSearchStatusButton />
        </div>

        <div tw="flex gap-2.5">
          <div tw="lg:(hidden)">
            <SearchSideBar />
          </div>

          <div tw="w-[70%] lg:(w-full px-2.5)">
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
    </Layout>
  );
};

export default Result;
