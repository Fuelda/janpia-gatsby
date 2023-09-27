import { Link } from "gatsby";
import React from "react";
import "twin.macro";
import { hCenter, vCenter } from "../../styles/base";
import tw from "twin.macro";

const detailSidebarBlock = tw`block border py-3 px-3.5 w-full font-bold`;

const DetailSidebar = (props: { slug: string }) => {
  return (
    <div tw="w-[205px] justify-start gap-[5px] sticky top-0" css={vCenter}>
      <Link css={detailSidebarBlock} to={`/result/${props.slug}`}>
        事業詳細
      </Link>
      <Link css={detailSidebarBlock} to={`/result/${props.slug}/organization`}>
        団体情報
      </Link>
      <Link
        css={detailSidebarBlock}
        to={`/result/${props.slug}/selected-project`}
      >
        公募結果報告
      </Link>
      <Link css={detailSidebarBlock} to={`/result/${props.slug}/project-plan`}>
        事業計画
      </Link>
      <Link
        css={detailSidebarBlock}
        to={`/result/${props.slug}/evaluation-plan`}
      >
        評価計画
      </Link>
      <Link
        css={detailSidebarBlock}
        to={`/result/${props.slug}/financial-plan`}
      >
        資金計画
      </Link>
    </div>
  );
};

export default DetailSidebar;
