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

const Issue = () => {
  const { resetSearchStatus } = useSearchContext();

  useEffect(() => {
    resetSearchStatus();
  }, []);

  return (
    <Layout>
      <div tw="mb-32">
        <div css={pankuzu}>
          <Link to="/">ホーム</Link>
          <FontAwesomeIcon icon={faAngleRight} />
          <p>社会課題から探す</p>
        </div>
        <h2 tw="text-xl py-6 px-3.5 font-bold">社会課題から探す</h2>
        <div css={vCenter} tw="gap-11">
          <div>
            <SocialIssue />
            <SdgsGoal path="search" />
            <TopicKeyword />
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
