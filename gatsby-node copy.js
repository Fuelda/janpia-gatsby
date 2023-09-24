const path = require("path");
const nodeQuery = require("./src/gatsby/nodeQuery.ts");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // const attachedFilesQuery = await graphql(nodeQuery.attachedFiles);
  const groupQuery = await graphql(nodeQuery.group);
  const bizPlanQuery = await graphql(nodeQuery.bizPlan);
  // const bizPlanSubQuery = await graphql(nodeQuery.bizPlanSub);
  const bizPlanGroupQuery = await graphql(nodeQuery.bizPlanGroup);
  // const financePlanQuery = await graphql(nodeQuery.financePlan);
  // const financePlanFormerQuery = await graphql(nodeQuery.financePlanFormer);
  const evaluationPlanQuery = await graphql(nodeQuery.evaluationPlan);
  // const evaluationPlanSubQuery = await graphql(nodeQuery.evaluationPlanSub);

  // const attachedFiles = attachedFilesQuery.data.allStrapiAttachedFile.edges;
  const group = groupQuery.data.allStrapiGroup.edges;
  const bizPlan = bizPlanQuery.data.allStrapiBizPlan.edges;
  // const bizPlanSub = bizPlanSubQuery.data.allStrapiBizPlanSub.edges;
  const bizPlanGroup = bizPlanGroupQuery.data.allStrapiBizPlanGroup.edges;
  // const financePlan = financePlanQuery.data.allStrapiFinancePlan.edges;
  // const financePlanFormer =
  //   financePlanFormerQuery.data.allStrapiFinancePlanFormer.edges;
  const evaluationPlan = evaluationPlanQuery.data.allStrapiEvaluationPlan.edges;
  // const evaluationPlanSub =
  //   evaluationPlanSubQuery.data.allStrapiEvaluationPlanSub.edges;

  // const linkedGroup = group.map((g) => {
  //   const linkingAttachedFile = attachedFiles.filter(
  //     (item) => item.node.insert_id === g.node.insert_id
  //   );
  //   const articleOfIncorporation = linkingAttachedFile.filter(
  //     (item) => item.node.item_id === "articles_of_incorporation"
  //   );
  //   const regulations = linkingAttachedFile.filter(
  //     (item) => item.node.item_id === "regulations"
  //   );
  //   return {
  //     ...g.node,
  //     articleOfIncorporation: articleOfIncorporation,
  //     regulations: regulations,
  //   };
  // });

  // const linkedBizPlanGroup = bizPlanGroup.map((bpg) => {
  //   const linkingGroup = linkedGroup.find((item) =>
  //     bpg.node.business_org_type === "F"
  //       ? item.organization_cd === bpg.node.organization_cd
  //       : item.organization_cd === bpg.node.organization_cd
  //   );
  //   return {
  //     ...bpg.node,
  //     groupData: linkingGroup,
  //   };
  // });

  // const linkedEvaluationPlan = evaluationPlan.map((ep) => {
  //   const linkingEvaluationPlanSub = evaluationPlanSub.filter(
  //     (item) => item.node.business_cd === ep.node.business_cd
  //   );
  //   return { ...ep.node, evaluationPlanSub: linkingEvaluationPlanSub };
  // });

  // const linkedBizPlan = bizPlan.map((bp) => {
  //   const linkingBizPlanSub = bizPlanSub.filter(
  //     (item) => item.node.business_cd === bp.node.business_cd
  //   );
  //   const linkingMainGroup = linkedGroup.find((item) =>
  //     bp.node.business_org_type === "F"
  //       ? item.organization_cd === bp.node.fund_distr_grp_cd
  //       : item.organization_cd === bp.node.executive_grp_cd
  //   );
  //   const linkingSubGroup = linkedBizPlanGroup.filter(
  //     (item) => item.business_cd === bp.node.business_cd
  //   );
  //   const linkingFinancePlan = financePlan.find((item) =>
  //     bp.node.business_org_type === "F"
  //       ? item.node.biz_cd_fund_distr === bp.node.business_cd
  //       : item.node.biz_cd_executive === bp.node.business_cd
  //   );
  //   const linkingFinancePlanFormer = financePlanFormer.find((item) =>
  //     bp.node.business_org_type === "F"
  //       ? item.node.biz_cd_fund_distr === bp.node.business_cd
  //       : item.node.biz_cd_executive === bp.node.business_cd
  //   );
  //   const linkingEvaluationPlan = linkedEvaluationPlan.find(
  //     (item) => item.business_cd === bp.node.business_cd
  //   );
  //   return {
  //     bizPlan: { ...bp.node, bizPlanSub: linkingBizPlanSub },
  //     mainGroup: linkingMainGroup,
  //     subGroup: linkingSubGroup,
  //     financePlan: linkingFinancePlan || linkingFinancePlanFormer,
  //     evaluationPlan: linkingEvaluationPlan,
  //   };
  // });

  bizPlan.forEach((bizPlanItem) => {
    const business_cd = bizPlanItem.node.business_cd;
    const bizPlanGroupArray = bizPlanGroup.filter(
      (item) => item.node.business_cd === business_cd
    );
    const organization_cd = bizPlanGroupArray.map(
      (item) => item.node.organization_cd
    );
    const insert_id_group = organization_cd.map((code) => {
      const groupItem = group.find(
        (item) => item.node.organization_cd === code
      );
      return groupItem ? groupItem.node.insert_id : "";
    });
    const evaluationPlanItem = evaluationPlan.find(
      (item) => item.node.business_cd === business_cd
    );
    const insert_id_evaluationPlan = evaluationPlanItem
      ? evaluationPlanItem.node.insert_id
      : "";

    createPage({
      path: `/result/${business_cd}/`,
      component: path.resolve("./src/templates/main.tsx"),
      context: { slug: business_cd, organization_cd: organization_cd },
    });
    createPage({
      path: `/result/${business_cd}/organization`,
      component: path.resolve("./src/templates/organization.tsx"),
      context: {
        slug: business_cd,
        organization_cd: organization_cd,
        insert_id: insert_id_group,
      },
    });
    createPage({
      path: `/result/${business_cd}/project-plan`,
      component: path.resolve("./src/templates/projectPlan.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/evaluation-plan`,
      component: path.resolve("./src/templates/evaluationPlan.tsx"),
      context: {
        slug: business_cd,
        insert_id: insert_id_evaluationPlan,
      },
    });
    createPage({
      path: `/result/${business_cd}/financial-plan`,
      component: path.resolve("./src/templates/financialPlan.tsx"),
      context: { slug: business_cd },
    });
  });
};
