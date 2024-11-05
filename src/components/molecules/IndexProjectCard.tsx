import React from "react";
import "twin.macro";
import tw from "twin.macro";
import { hCenter, vCenter } from "../../styles/base";
import { useStrapiContext } from "../../context/strapiContext";
import { isActivitySupportGroup } from "../../lib/businessTypeNameChecker";
import { BusinessOrgTypeIcon } from "../atoms/BusinessOrgTypeIcon";

type IndexProjectCardType = {
  isFdo: boolean;
  isActivitySupport: boolean;
};

const IndexProjectCard = ({
  isFdo,
  isActivitySupport,
}: IndexProjectCardType) => {
  const { allStrapiBizPlan, allStrapiBizPlanManual } = useStrapiContext();

  const project = allStrapiBizPlan.edges.filter((item) => {
    if (isActivitySupport) {
      return (
        isActivitySupportGroup(item.node.business_type_name || "") &&
        (isFdo
          ? item.node.business_org_type === "F"
          : item.node.business_org_type === "A")
      );
    } else {
      return isFdo
        ? item.node.business_org_type === "F"
        : item.node.business_org_type === "A";
    }
  });
  const projectManual = allStrapiBizPlanManual.edges.filter((item) => {
    if (isActivitySupport) {
      return (
        isActivitySupportGroup(item.node.business_type_name?.label || "") &&
        (isFdo
          ? item.node.business_org_type === "F"
          : item.node.business_org_type === "A")
      );
    } else {
      return isFdo
        ? item.node.business_org_type === "F"
        : item.node.business_org_type === "A";
    }
  });
  const onGoingProject = project.filter(
    (item) => item.node.business_status == 0
  );
  const onGoingProjectManual = projectManual.filter(
    (item) => item.node.business_status
  );

  const indexProjectCardLabel = isActivitySupport
    ? isFdo
      ? "活動支援団体"
      : "支援対象団体"
    : isFdo
    ? "資金分配団体"
    : "実行団体";

  const indexProjectCardBorderColor = isActivitySupport
    ? isFdo
      ? tw`border-red-500` // TODO: 色はアイコン決定に合わせる
      : tw`border-yellow-500` // TODO: 色はアイコン決定に合わせる
    : isFdo
    ? tw`border-blue-fdo`
    : tw`border-green-ado`;
  const indexProjectCardLabelColor = isActivitySupport
    ? isFdo
      ? tw`bg-red-500` // TODO: 色はアイコン決定に合わせる
      : tw`bg-yellow-500` // TODO: 色はアイコン決定に合わせる
    : isFdo
    ? tw`bg-blue-fdo`
    : tw`bg-green-ado`;

  return (
    <div
      tw="border-4 rounded-10 w-[450px] lg:(w-full)"
      css={indexProjectCardBorderColor}
    >
      <p
        tw="text-3xl text-white pt-4 pb-3.5 text-center lg:(text-2xl)"
        css={indexProjectCardLabelColor}
      >
        {indexProjectCardLabel}
      </p>
      <div tw="flex pt-4 pb-5 px-5 gap-3.5 lg:(flex-col justify-between items-center)">
        <BusinessOrgTypeIcon
          isFdo={isFdo}
          isActivitySupport={isActivitySupport}
        />
        <div css={vCenter} tw="w-64 justify-around lg:(w-full)">
          <div tw="text-2xl font-bold text-center lg:(text-lg)" css={hCenter}>
            <p>
              登録
              <br />
              事業数
            </p>
            <p>：</p>
            <p tw="text-5xl lg:(text-2xl)">
              {project.length + projectManual.length}
            </p>
          </div>
          <div tw="flex gap-5 lg:(flex-col gap-0)">
            <p tw="text-lg">
              実施数：
              <span tw="text-2xl">
                {onGoingProject.length + onGoingProjectManual.length}
              </span>
            </p>
            <p tw="text-lg">
              完了：
              <span tw="text-2xl">
                {project.length +
                  projectManual.length -
                  (onGoingProject.length + onGoingProjectManual.length)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexProjectCard;
