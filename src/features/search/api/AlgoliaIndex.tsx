import React, { useMemo, useCallback } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import type { SearchBoxProps } from "react-instantsearch";
import { useAlgoliaStrapiContext } from "../../../context/algoliaStrapiContext";
import SearchBoxIndex from "../component/main/Freeword/SearchBoxIndex";
import "twin.macro";
import SearchBoxSidebar from "../component/sidebar/Freeword/SearchBoxSidebar";
import { useSearchContext } from "../../../context/searchContext";
import SearchBoxTopicKeyword from "../component/main/Freeword/SearchBoxTopicKeyword";
import debounce from "lodash/debounce";

const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || "",
  process.env.GATSBY_ALGOLIA_SEARCH_KEY || ""
);

const searchClient = {
  ...algoliaClient,
  search(requests: any): Promise<{ results: any[] }> {
    if (requests.every(({ params }: { params: any }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }
    return algoliaClient.search(requests);
  },
};

const AlgoliaIndex = (props: { path: string }) => {
  const { setAlgoliaHits } = useAlgoliaStrapiContext();
  const { searchSetState } = useSearchContext();
  const { setWithAlgoliaQuery } = searchSetState;

  const index = searchClient.initIndex("janpia-johokokai");
  const searchOption = { hitsPerPage: 1000 };

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (!query) {
          setAlgoliaHits([]);
          return;
        }

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
      }, 1000), // 1秒のデバウンス時間
    [index, setAlgoliaHits]
  );

  const queryHook: SearchBoxProps["queryHook"] = useCallback(
    (query: any, search: any) => {
      setWithAlgoliaQuery(query ? true : false);
      debouncedSearch(query);
    },
    [setWithAlgoliaQuery, debouncedSearch]
  );

  return (
    <InstantSearch indexName="janpia-johokokai" searchClient={searchClient}>
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
