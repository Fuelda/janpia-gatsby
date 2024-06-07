import { Link } from "gatsby";
import React from "react";
import "twin.macro";
import { vCenter } from "../../styles/base";
import tw from "twin.macro";
import { useLocation } from "@reach/router";
import { DetailSidebarItem } from "./DetailSidebarItem";

const detailSidebarBlock = tw`block border border-gray-border py-3 px-3.5 w-full font-bold`;
const currentSidebar = tw`bg-blue-button border-blue-button text-white`;

const DetailSidebar = ({ slug }: { slug: string }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      tw="w-[205px] justify-start gap-[5px] sticky top-0 lg:(hidden)"
      css={vCenter}
    >
      <Link
        css={[
          detailSidebarBlock,
          path === `/result/${slug}/` && currentSidebar,
        ]}
        to={`/result/${slug}`}
      >
        事業詳細
      </Link>
      <Link
        css={[
          detailSidebarBlock,
          path === `/result/${slug}/organization/` && currentSidebar,
        ]}
        to={`/result/${slug}/organization`}
      >
        団体情報
      </Link>
      <DetailSidebarItem
        slug={slug}
        collectionTypes={["offering-reports", "offering-report-manuals"]}
        title="公募結果報告"
        targetPath="selected-project"
      />
      <Link
        css={[
          detailSidebarBlock,
          path === `/result/${slug}/project-plan/` && currentSidebar,
        ]}
        to={`/result/${slug}/project-plan`}
      >
        事業計画
      </Link>
      <DetailSidebarItem
        slug={slug}
        collectionTypes={["evaluation-plans", "evaluation-plan-manuals"]}
        title="評価計画"
        targetPath="evaluation-plan"
      />
      <DetailSidebarItem
        slug={slug}
        collectionTypes={[
          "finance-plans",
          "finance-plan-formers",
          "finance-plan-manuals",
        ]}
        title="資金計画"
        targetPath="financial-plan"
      />
      <DetailSidebarItem
        slug={slug}
        collectionTypes={["pre-report-manuals"]}
        title="事前評価報告"
        targetPath="exante-evaluation-report"
      />
      <DetailSidebarItem
        slug={slug}
        collectionTypes={["mid-reports", "mid-report-manuals"]}
        title="中間評価報告"
        targetPath="interim-report"
      />
      <DetailSidebarItem
        slug={slug}
        collectionTypes={["post-report-manuals"]}
        title="事後評価報告"
        targetPath="expost-evaluation-report`"
      />
      <DetailSidebarItem
        slug={slug}
        collectionTypes={["progress-reports", "progress-report-manuals"]}
        title="進捗/年度末報告"
        targetPath="progress-report`"
      />
      <DetailSidebarItem
        slug={slug}
        collectionTypes={["complete-reports", "complete-report-manuals"]}
        title="事業完了報告"
        targetPath="completion-report"
      />
      <DetailSidebarItem
        slug={slug}
        collectionTypes={["settle-reports", "settle-report-manuals"]}
        title="事業完了時精算報告"
        targetPath="financial-report"
      />
    </div>
  );
};

export default DetailSidebar;
