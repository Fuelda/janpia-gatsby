import React from "react";
import { hCenter } from "../../styles/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby";
import "twin.macro";
import { useDetailContext } from "../../context/detailContext";
import { useLocation } from "@reach/router";
import tw from "twin.macro";

const linkBox = tw`text-[15px] w-60 px-3 py-2.5 border border-gray-base justify-between lg:(w-full)`;
const currentSidebar = tw`opacity-50`;

const DetailFooter = (props: { slug: string }) => {
  const { withORM, withPreRM, withMRM, withPostRM, withProRM, withCRM } =
    useDetailContext();
  const location = useLocation();
  const path = location.pathname;
  return (
    <div tw="hidden lg:(grid px-2.5 grid-cols-2 gap-2.5 mb-10)">
      <Link
        to={`/result/${props.slug}`}
        css={[
          hCenter,
          linkBox,
          path === `/result/${props.slug}/` && currentSidebar,
        ]}
      >
        <p tw="inline-block">事業詳細</p>
        <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
      </Link>
      <Link
        css={[
          hCenter,
          linkBox,
          path === `/result/${props.slug}/organization/` && currentSidebar,
        ]}
        to={`/result/${props.slug}/organization`}
      >
        <p tw="inline-block">団体情報</p>
        <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
      </Link>
      {withORM && (
        <Link
          css={[
            hCenter,
            linkBox,
            path === `/result/${props.slug}/selected-project/` &&
              currentSidebar,
          ]}
          to={`/result/${props.slug}/selected-project`}
        >
          <p tw="inline-block">公募結果報告</p>
          <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
        </Link>
      )}
      <Link
        css={[
          hCenter,
          linkBox,
          path === `/result/${props.slug}/project-plan/` && currentSidebar,
        ]}
        to={`/result/${props.slug}/project-plan`}
      >
        <p tw="inline-block">事業計画</p>
        <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
      </Link>
      <Link
        css={[
          hCenter,
          linkBox,
          path === `/result/${props.slug}/evaluation-plan/` && currentSidebar,
        ]}
        to={`/result/${props.slug}/evaluation-plan`}
      >
        <p tw="inline-block">評価計画</p>
        <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
      </Link>
      <Link
        css={[
          hCenter,
          linkBox,
          path === `/result/${props.slug}/financial-plan/` && currentSidebar,
        ]}
        to={`/result/${props.slug}/financial-plan`}
      >
        <p tw="inline-block">資金計画</p>
        <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
      </Link>
      {withPreRM && (
        <Link
          css={[
            hCenter,
            linkBox,
            path === `/result/${props.slug}/exante-evaluation-report/` &&
              currentSidebar,
          ]}
          to={`/result/${props.slug}/exante-evaluation-report`}
        >
          <p tw="inline-block">事前評価報告</p>
          <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
        </Link>
      )}
      {withMRM && (
        <Link
          css={[
            hCenter,
            linkBox,
            path === `/result/${props.slug}/interim-report/` && currentSidebar,
          ]}
          to={`/result/${props.slug}/interim-report`}
        >
          <p tw="inline-block">中間評価報告</p>
          <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
        </Link>
      )}
      {withPostRM && (
        <Link
          css={[
            hCenter,
            linkBox,
            path === `/result/${props.slug}/expost-evaluation-report/` &&
              currentSidebar,
          ]}
          to={`/result/${props.slug}/expost-evaluation-report`}
        >
          <p tw="inline-block">事後評価報告</p>
          <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
        </Link>
      )}
      {withProRM && (
        <Link
          css={[
            hCenter,
            linkBox,
            path === `/result/${props.slug}/progress-report/` && currentSidebar,
          ]}
          to={`/result/${props.slug}/progress-report`}
        >
          <p tw="inline-block">進捗/年度末報告</p>
          <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
        </Link>
      )}
      {withCRM && (
        <Link
          css={[
            hCenter,
            linkBox,
            path === `/result/${props.slug}/completion-report/` &&
              currentSidebar,
          ]}
          to={`/result/${props.slug}/completion-report`}
        >
          <p tw="inline-block">事業完了報告</p>
          <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
        </Link>
      )}
      <Link
        css={[
          hCenter,
          linkBox,
          path === `/result/${props.slug}/financial-report/` && currentSidebar,
        ]}
        to={`/result/${props.slug}/financial-report`}
      >
        <p tw="inline-block">事業完了時精算報告</p>
        <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
      </Link>
    </div>
  );
};

export default DetailFooter;
