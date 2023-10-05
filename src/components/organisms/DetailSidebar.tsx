import { Link } from "gatsby";
import React from "react";
import "twin.macro";
import { hCenter, vCenter } from "../../styles/base";
import tw from "twin.macro";
import { useDetailContext } from "../../context/detailContext";
import { useLocation } from "@reach/router";

const detailSidebarBlock = tw`block border border-gray-border py-3 px-3.5 w-full font-bold`;
const currentSidebar = tw`bg-blue-button border-blue-button text-white`;

const DetailSidebar = (props: { slug: string }) => {
  const {
    withORM,
    withPreRM,
    withMRM,
    withPostRM,
    withProRM,
    withCRM,
    withSR,
  } = useDetailContext();
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
          path === `/result/${props.slug}/` && currentSidebar,
        ]}
        to={`/result/${props.slug}`}
      >
        事業詳細
      </Link>
      <Link
        css={[
          detailSidebarBlock,
          path === `/result/${props.slug}/organization/` && currentSidebar,
        ]}
        to={`/result/${props.slug}/organization`}
      >
        団体情報
      </Link>
      {withORM && (
        <Link
          css={[
            detailSidebarBlock,
            path === `/result/${props.slug}/selected-project/` &&
              currentSidebar,
          ]}
          to={`/result/${props.slug}/selected-project`}
        >
          公募結果報告
        </Link>
      )}
      <Link
        css={[
          detailSidebarBlock,
          path === `/result/${props.slug}/project-plan/` && currentSidebar,
        ]}
        to={`/result/${props.slug}/project-plan`}
      >
        事業計画
      </Link>
      <Link
        css={[
          detailSidebarBlock,
          path === `/result/${props.slug}/evaluation-plan/` && currentSidebar,
        ]}
        to={`/result/${props.slug}/evaluation-plan`}
      >
        評価計画
      </Link>
      <Link
        css={[
          detailSidebarBlock,
          path === `/result/${props.slug}/financial-plan/` && currentSidebar,
        ]}
        to={`/result/${props.slug}/financial-plan`}
      >
        資金計画
      </Link>
      {withPreRM && (
        <Link
          css={[
            detailSidebarBlock,
            path === `/result/${props.slug}/exante-evaluation-report/` &&
              currentSidebar,
          ]}
          to={`/result/${props.slug}/exante-evaluation-report`}
        >
          事前評価報告
        </Link>
      )}
      {withMRM && (
        <Link
          css={[
            detailSidebarBlock,
            path === `/result/${props.slug}/interim-report/` && currentSidebar,
          ]}
          to={`/result/${props.slug}/interim-report`}
        >
          中間評価報告
        </Link>
      )}
      {withPostRM && (
        <Link
          css={[
            detailSidebarBlock,
            path === `/result/${props.slug}/expost-evaluation-report/` &&
              currentSidebar,
          ]}
          to={`/result/${props.slug}/expost-evaluation-report`}
        >
          事後評価報告
        </Link>
      )}
      {withProRM && (
        <Link
          css={[
            detailSidebarBlock,
            path === `/result/${props.slug}/progress-report/` && currentSidebar,
          ]}
          to={`/result/${props.slug}/progress-report`}
        >
          進捗/年度末報告
        </Link>
      )}
      {withCRM && (
        <Link
          css={[
            detailSidebarBlock,
            path === `/result/${props.slug}/completion-report/` &&
              currentSidebar,
          ]}
          to={`/result/${props.slug}/completion-report`}
        >
          事業完了報告
        </Link>
      )}
      {withSR && (
        <Link
          css={[
            detailSidebarBlock,
            path === `/result/${props.slug}/financial-report/` &&
              currentSidebar,
          ]}
          to={`/result/${props.slug}/financial-report`}
        >
          事業完了時精算報告
        </Link>
      )}
    </div>
  );
};

export default DetailSidebar;
