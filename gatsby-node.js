const path = require("path");
const nodeQuery = require("./src/gatsby/nodeQuery.ts");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const groupQuery = await graphql(nodeQuery.group);
  const bizPlanQuery = await graphql(nodeQuery.bizPlan);
  const bizPlanGroupQuery = await graphql(nodeQuery.bizPlanGroup);
  const evaluationPlanQuery = await graphql(nodeQuery.evaluationPlan);
  const bizPlanManualQuery = await graphql(nodeQuery.bizPlanManual);
  const bizPlanGroupManualQuery = await graphql(nodeQuery.bizPlanGroupManual);

  const group = groupQuery.data.allStrapiGroup.edges;
  const bizPlan = bizPlanQuery.data.allStrapiBizPlan.edges;
  const bizPlanGroup = bizPlanGroupQuery.data.allStrapiBizPlanGroup.edges;
  const evaluationPlan = evaluationPlanQuery.data.allStrapiEvaluationPlan.edges;
  const bizPlanManual = bizPlanManualQuery.data.allStrapiBizPlanManual.edges;
  const bizPlanGroupManual =
    bizPlanGroupManualQuery.data.allStrapiBizPlanGroupManual.edges;

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

  bizPlanManual.forEach((bizPlanManualItem) => {
    const business_cd =
      bizPlanManualItem.node.business_org_type === "F"
        ? bizPlanManualItem.node.biz_cd_fund_distr
        : bizPlanManualItem.node.biz_cd_executive;
    const bizPlanGroupManualArray = bizPlanGroupManual.filter((item) => {
      const business_cd_manual =
        item.node.business_org_type === "F"
          ? item.node.biz_cd_fund_distr
          : item.node.biz_cd_executive;
      return business_cd_manual === business_cd;
    });
    const organization_cd = bizPlanGroupManualArray.map((item) =>
      item.node.business_org_type === "F"
        ? item.node.fund_distr_grp_cd
        : item.node.executive_grp_cd
    );

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
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/financial-plan`,
      component: path.resolve("./src/templates/financialPlan.tsx"),
      context: { slug: business_cd },
    });
  });
};
