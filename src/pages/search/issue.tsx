import React, { useEffect } from "react";
import Layout from "../../components/lauout/Layout";
import "twin.macro";
import { h3, hCenter, pankuzu, vCenter } from "../../styles/base";
import ToResultButton from "../../components/atoms/ToResultButton";
import ResetSearchButton from "../../components/atoms/ResetSearchButton";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import TopicKeyword from "../../features/search/component/main/Business/TopicKeyword";
import SocialIssue from "../../features/search/component/main/Issue/SocialIssue";
import SdgsGoal from "../../features/search/component/main/Issue/SdgsGoal";
import { useSearchContext } from "../../context/searchContext";
import BusinessTypeName from "../../features/search/component/main/Issue/BusinessTypeName";
import { useLocation } from "@reach/router";
import Seo from "../../components/lauout/Seo";

const Issue = () => {
  const { resetSearchStatus } = useSearchContext();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    resetSearchStatus();
  }, []);

  return (
    <Layout>
      <Seo title="社会課題から探す | 休眠預金活用事業 情報公開サイト" />
      <div tw="mb-32">
        <div css={pankuzu}>
          <Link to="/">ホーム</Link>
          <FontAwesomeIcon icon={faAngleRight} />
          <p>社会課題から探す</p>
        </div>
        <h2 tw="text-xl py-6 px-3.5 font-bold">社会課題から探す</h2>
        <div css={vCenter} tw="gap-11">
          <div>
            <BusinessTypeName path={path} />
            <SocialIssue />
            <SdgsGoal path="search" />
            <TopicKeyword path="search" />
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

export default Issue;
