import React, { useEffect } from "react";
import Layout from "../../components/lauout/Layout";
import "twin.macro";
import { h3, hCenter, pankuzu, vCenter } from "../../styles/base";
import OrganizationName from "../../features/search/component/main/Organization/OrganizationName";
import OrganizationTypeCd from "../../features/search/component/main/Organization/OrganizationTypeCd";
import LegalPersonality from "../../features/search/component/main/Organization/LegalPersonality";
import ToResultButton from "../../components/atoms/ToResultButton";
import ResetSearchButton from "../../components/atoms/ResetSearchButton";
import Prefectures from "../../features/search/component/main/Organization/Prefectures";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useSearchContext } from "../../context/searchContext";
import { useLocation } from "@reach/router";
import PrefecturesSp from "../../features/search/component/main/Organization/PrefecturesSp";
import Seo from "../../components/lauout/Seo";

const Organization = () => {
  const { resetSearchStatus } = useSearchContext();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    resetSearchStatus();
  }, []);

  return (
    <Layout>
      <Seo title="団体から探す | 休眠預金活用事業 情報公開サイト" />
      <div tw="mb-32">
        <div css={pankuzu}>
          <Link to="/">ホーム</Link>
          <FontAwesomeIcon icon={faAngleRight} />
          <p>団体から探す</p>
        </div>
        <h2 tw="text-xl py-6 px-3.5 font-bold">団体から探す</h2>
        <div css={vCenter} tw="gap-11">
          <div>
            <OrganizationName path={path} />
            <OrganizationTypeCd path={path} />

            <h3 css={h3} tw="lg:(hidden)">
              団体所在地
            </h3>
            <div tw="px-11 py-4 lg:(hidden)">
              <Prefectures />
            </div>
            <div tw="hidden lg:(block)">
              <PrefecturesSp category="prefectures" />
            </div>

            <LegalPersonality path={path} />
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

export default Organization;
