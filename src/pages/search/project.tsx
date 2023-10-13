import React, { useEffect } from "react";
import Layout from "../../components/lauout/Layout";
import "twin.macro";
import { h3, hCenter, pankuzu, vCenter } from "../../styles/base";
import ToResultButton from "../../components/atoms/ToResultButton";
import ResetSearchButton from "../../components/atoms/ResetSearchButton";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import BusinessOrgType from "../../features/search/component/main/Business/BusinessOrgType";
import BusinessStatus from "../../features/search/component/main/Business/BusinessStatus";
import BusinessCategory from "../../features/search/component/main/Business/BusinessCategory";
import TargetArea from "../../features/search/component/main/Business/TargetArea";
import SubsidyAmount from "../../features/search/component/main/Business/SubsidyAmount";
import TopicKeyword from "../../features/search/component/main/Business/TopicKeyword";
import { useSearchContext } from "../../context/searchContext";
import BusinessTypeName from "../../features/search/component/main/Business/BusinessTypeName";
import { useLocation } from "@reach/router";
import PrefecturesSp from "../../features/search/component/main/Organization/PrefecturesSp";
import AlgoliaIndex from "../../features/search/api/AlgoliaIndex";
import Seo from "../../components/lauout/Seo";

const Project = () => {
  const { resetSearchStatus, searchState } = useSearchContext();
  const { btnCategory } = searchState;
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    resetSearchStatus();
  }, []);

  return (
    <Layout>
      <Seo title="事業から探す | 休眠預金活用事業 情報公開サイト" />
      <div tw="mb-32">
        <div css={pankuzu}>
          <Link to="/">ホーム</Link>
          <FontAwesomeIcon icon={faAngleRight} />
          <p>事業から探す</p>
        </div>
        <h2 tw="text-xl py-6 px-3.5 font-bold">事業から探す</h2>
        <div css={vCenter} tw="gap-11">
          <div>
            <BusinessOrgType path={path} />
            <BusinessTypeName path={path} />
            {btnCategory.includes("通常枠") && <BusinessCategory path={path} />}
            <BusinessStatus path={path} />

            <h3 css={h3} tw="lg:(hidden)">
              事業対象地域
            </h3>
            <div tw="px-11 py-4 lg:(hidden)">
              <TargetArea />
            </div>
            <div tw="hidden lg:(block)">
              <PrefecturesSp category="targetArea" />
            </div>

            <SubsidyAmount path={path} />
            <TopicKeyword path={path} />
            {/* <AlgoliaIndex path="search" /> */}
          </div>
          <div css={vCenter} tw="gap-6">
            <ToResultButton />
            <ResetSearchButton />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
