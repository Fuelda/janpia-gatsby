import { useStrapiContext } from "../context/strapiContext";

export const linkCollectionTypesManual = () => {
  const allStrapiData = useStrapiContext();

  const allBizPlanManual = allStrapiData.allStrapiBizPlanManual.edges;
  const allBizPlanGroupManual = allStrapiData.allStrapiBizPlanGroupManual.edges;
  const allGroup = allStrapiData.allStrapiGroup.edges;
  const allBizPlanGroup = allStrapiData.allStrapiBizPlanGroup.edges;

  const linkedBizPlanGroup = allBizPlanGroupManual.map((bpgm) => {
    const business_cd =
      bpgm.node.business_org_type === "F"
        ? bpgm.node.biz_cd_fund_distr
        : bpgm.node.biz_cd_executive;
    const organization_cd =
      bpgm.node.business_org_type === "F"
        ? bpgm.node.fund_distr_grp_cd
        : bpgm.node.executive_grp_cd;
    const linkingGroup = allGroup.find(
      (g) => g.node.organization_cd === organization_cd
    );
    return {
      business_cd: business_cd,
      organization_cd: organization_cd,
      business_org_type: bpgm.node.business_org_type,
      org_role_fdo: bpgm.node.org_role_fdo,
      org_role_ado: bpgm.node.org_role_ado,
      groupData: linkingGroup?.node,
    };
  });

  const linkedBizPlanManual = allBizPlanManual.map((bpm) => {
    const business_cd =
      bpm.node.business_org_type === "F"
        ? bpm.node.biz_cd_fund_distr
        : bpm.node.biz_cd_executive;

    const linkingBizPlanGroup = linkedBizPlanGroup.filter(
      (lbpg) => lbpg.business_cd === business_cd
    );

    const organization_cd =
      bpm.node.business_org_type === "F"
        ? bpm.node.fund_distr_grp_cd
        : bpm.node.executive_grp_cd;
    const mainGroup = allGroup.find(
      (g) => g.node.organization_cd === organization_cd
    );

    return {
      group: linkingBizPlanGroup,
      mainGroup: mainGroup,
      bizPlan: { ...bpm.node, business_cd: business_cd },
    };
  });

  return linkedBizPlanManual;
};
