import { useStrapiContext } from "../context/strapiContext";

export const linkCollectionTypes = () => {
  const allStrapiData = useStrapiContext();

  const allGroup = allStrapiData.allStrapiGroup.edges;
  const allBizPlanGroup = allStrapiData.allStrapiBizPlanGroup.edges;
  const allBizPlanSub = allStrapiData.allStrapiBizPlanSub.edges;
  const allBizPlan = allStrapiData.allStrapiBizPlan.edges;
  const allFinancePlan = allStrapiData.allStrapiFinancePlan.edges;
  const allFinancePlanFormer = allStrapiData.allStrapiFinancePlanFormer.edges;
  const allEvaluationPlan = allStrapiData.allStrapiEvaluationPlan.edges;

  const linkedBizPlanGroup = allBizPlanGroup.map((bpg) => {
    const linkingGroup = allGroup.find(
      (g) => g.node.organization_cd === bpg.node.organization_cd
    );
    return { ...bpg.node, groupData: linkingGroup?.node };
  });

  const linkedBizPlan = allBizPlan.map((bp) => {
    const linkingBizPlanGroup = linkedBizPlanGroup.filter(
      (lbpg) => lbpg.business_cd === bp.node.business_cd
    );
    const organization_cd =
      bp.node.business_org_type === "F"
        ? bp.node.fund_distr_grp_cd
        : bp.node.executive_grp_cd;
    const mainGroup = allGroup.find(
      (g) => g.node.organization_cd === organization_cd
    );
    const linkingBizPlanSub = allBizPlanSub
      .filter((bps) => bps.node.business_cd === bp.node.business_cd)
      .map((bps) => bps.node);
    const linkingFinancePlan = allFinancePlan.find((fp) =>
      fp.node.business_org_type === "F"
        ? fp.node.biz_cd_fund_distr === bp.node.business_cd
        : fp.node.biz_cd_executive === bp.node.business_cd
    );
    const linkingFinancePlanFormer = allFinancePlanFormer.find((fpf) =>
      fpf.node.business_org_type === "F"
        ? fpf.node.biz_cd_fund_distr === bp.node.business_cd
        : fpf.node.biz_cd_executive === bp.node.business_cd
    );
    const linkingEvaluationPlan = allEvaluationPlan.find(
      (ep) => ep.node.business_cd === bp.node.business_cd
    );
    const linkingBusinessCategory = bp.node.business_category
      ? { code: parseInt(bp.node.business_category), subCode: null }
      : {
          code: bp.node.business_category1
            ? parseInt(bp.node.business_category1)
            : null,
          subCode: bp.node.business_category2
            ? parseInt(bp.node.business_category2)
            : null,
        };

    return {
      group: linkingBizPlanGroup,
      mainGroup: mainGroup,
      bizPlan: {
        ...bp.node,
        business_category: linkingBusinessCategory,
      },
      bizPlanSub: linkingBizPlanSub,
      financePlan: linkingFinancePlan?.node,
      financePlanFormer: linkingFinancePlanFormer?.node,
      evaluationPlan: linkingEvaluationPlan?.node,
    };
  });

  return linkedBizPlan;
};
