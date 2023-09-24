import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import "twin.macro";
import tw from "twin.macro";
import { vCenter } from "../../styles/base";
import { useStrapiContext } from "../../context/strapiContext";

type IndexProjectCardType = {
  isFdo: boolean;
};

const IndexProjectCard = ({ isFdo }: IndexProjectCardType) => {
  const { allStrapiBizPlan, allStrapiBizPlanManual } = useStrapiContext();
  const project = allStrapiBizPlan.edges.filter((item) =>
    isFdo
      ? item.node.business_org_type === "F"
      : item.node.business_org_type === "A"
  );
  const projectManual = allStrapiBizPlanManual.edges.filter((item) =>
    isFdo
      ? item.node.business_org_type === "F"
      : item.node.business_org_type === "A"
  );
  const onGoingProject = project.filter(
    (item) => item.node.business_status === 1
  );
  const onGoingProjectManual = projectManual.filter(
    (item) => item.node.business_status === true
  );

  return (
    <div
      tw="border-4 rounded-10 w-[450px] "
      css={isFdo ? tw`border-blue-fdo` : tw`border-green-ado`}
    >
      <p
        tw="text-3xl text-white pt-4 pb-3.5 text-center"
        css={isFdo ? tw`bg-blue-fdo` : tw`bg-green-ado`}
      >
        {isFdo ? "資金分配団体" : "実行団体"}
      </p>
      <div tw="flex pt-4 pb-5 px-5 gap-3.5">
        {isFdo ? (
          <StaticImage
            src="../../images/icon_shikinbunpai.png"
            alt="団体アイコン"
            tw="w-[105px] h-[105px]"
          />
        ) : (
          <StaticImage
            src="../../images/icon_jikkou.png"
            alt="団体アイコン"
            tw="w-[105px] h-[105px]"
          />
        )}
        <div css={vCenter} tw="w-64 justify-around">
          <p tw="text-2xl font-bold text-center">
            事業数：
            <span tw="text-5xl">{project.length + projectManual.length}</span>
          </p>
          <div tw="flex gap-5">
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
