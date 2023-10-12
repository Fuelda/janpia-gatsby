import React, { useMemo } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import type { SearchBoxProps } from "react-instantsearch";
import { useAlgoliaStrapiContext } from "../../../context/algoliaStrapiContext";
import SearchBoxIndex from "../component/main/Freeword/SearchBoxIndex";
import "twin.macro";
import SearchBoxSidebar from "../component/sidebar/Freeword/SearchBoxSidebar";
import { useSearchContext } from "../../../context/searchContext";
import SearchBoxTopicKeyword from "../component/main/Freeword/SearchBoxTopicKeyword";

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || "",
  process.env.GATSBY_ALGOLIA_SEARCH_KEY || ""
);

const AlgoliaIndex = (props: { path: string }) => {
  const { setAlgoliaHits } = useAlgoliaStrapiContext();
  const { searchSetState } = useSearchContext();
  const { setWithAlgoliaQuery } = searchSetState;

  const index = searchClient.initIndex("janpia_search");
  const searchOption = { hitsPerPage: 1000 };

  const queryHook: SearchBoxProps["queryHook"] = (query, search) => {
    setWithAlgoliaQuery(query ? true : false);
    console.log(query);
    index.search(query, searchOption).then(({ hits }) => {
      const hitCd = hits.map((hit: any) => {
        if (hit.business_cd) {
          return { code: hit.business_cd, type: "business" };
        } else if (hit.organization_cd) {
          return { code: hit.organization_cd, type: "organization" };
        } else if (hit.insert_id) {
          return { code: hit.insert_id, type: "attachedFile" };
        } else if (hit.biz_cd_executive || hit.biz_cd_fund_distr) {
          return {
            code: hit.biz_cd_executive || hit.biz_cd_fund_distr,
            type: "business",
          };
        } else {
          return { code: "", type: "" };
        }
      });

      setAlgoliaHits(hitCd);
    });
  };

  return (
    <InstantSearch indexName="janpia_search" searchClient={searchClient}>
      {props.path === "/" && (
        <div>
          <div tw="lg:(hidden)">
            <SearchBoxIndex queryHook={queryHook} />
          </div>
          <div tw="hidden lg:(block)">
            <SearchBoxSidebar queryHook={queryHook} />
          </div>
        </div>
      )}
      {props.path === "result" && <SearchBoxSidebar queryHook={queryHook} />}
      {props.path === "search" && (
        <SearchBoxTopicKeyword queryHook={queryHook} />
      )}
    </InstantSearch>
  );
};

export default AlgoliaIndex;
