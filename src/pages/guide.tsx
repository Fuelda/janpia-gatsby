import React from "react";
import Layout from "../components/lauout/Layout";
import Seo from "../components/lauout/Seo";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { hCenter } from "../styles/base";
import "twin.macro";
import { GuideIndex } from "../components/guide";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const Guide = () => {
  return (
    <Layout>
      <Seo title="使い方ガイド/Q&A | 休眠預金活用事業 情報公開サイト" />
      <div tw="mb-[43px]">
        <div tw="text-sm p-2 bg-blue-base gap-2" css={hCenter}>
          <Link to="/">ホーム</Link>
          <FontAwesomeIcon icon={faAngleRight} />
          <p>使い方ガイド</p>
        </div>
        <div>
          <div tw="flex items-center gap-12 lg:(gap-0 flex-col items-start px-2.5)">
            <h1 tw="text-[28px] py-6 font-bold">使い方ガイド/Q&A</h1>
            <div tw="flex items-center gap-8 lg:(gap-2 flex-col items-start)">
              <AnchorLink to="/guide#search">
                <div tw="flex items-center gap-4">
                  <p>検索結果ページの見方はこちら</p>
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </AnchorLink>
              <AnchorLink to="/guide#detail">
                <div tw="flex items-center gap-4">
                  <p>事業詳細ページの見方はこちら</p>
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </AnchorLink>
              <AnchorLink to="/guide#QnA">
                <div tw="flex items-center gap-4">
                  <p>Q&Aはこちら</p>
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </AnchorLink>
            </div>
          </div>
          <GuideIndex />
        </div>
      </div>
    </Layout>
  );
};

export default Guide;
