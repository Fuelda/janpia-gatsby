import React from "react";
import Layout from "../components/lauout/Layout";
import Seo from "../components/lauout/Seo";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { hCenter } from "../styles/base";
import "twin.macro";
import { GuideIndex } from "../components/guide";

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
          <h1 tw="text-[28px] py-6 font-bold">使い方ガイド/Q&A</h1>
          <GuideIndex />
        </div>
      </div>
    </Layout>
  );
};

export default Guide;
