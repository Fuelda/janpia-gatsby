const path = require("path");
const nodeQuery = require("./src/gatsby/nodeQuery.ts");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const groupQuery = await graphql(nodeQuery.group);
  const bizPlanQuery = await graphql(nodeQuery.bizPlan);
  const bizPlanGroupQuery = await graphql(nodeQuery.bizPlanGroup);
  const bizPlanManualQuery = await graphql(nodeQuery.bizPlanManual);
  const bizPlanGroupManualQuery = await graphql(nodeQuery.bizPlanGroupManual);
  const newsQuery = await graphql(nodeQuery.news);

  const group = groupQuery.data.allStrapiGroup.edges;
  const bizPlan = bizPlanQuery.data.allStrapiBizPlan.edges;
  const bizPlanGroup = bizPlanGroupQuery.data.allStrapiBizPlanGroup.edges;
  const bizPlanManual = bizPlanManualQuery.data.allStrapiBizPlanManual.edges;
  const bizPlanGroupManual =
    bizPlanGroupManualQuery.data.allStrapiBizPlanGroupManual.edges;
  const news = newsQuery.data.allStrapiNew.edges;

  news.forEach((newsItem) => {
    const newsId = newsItem.node.id;
    createPage({
      path: `/news/${newsId}/`,
      component: path.resolve("./src/templates/newsPage.tsx"),
      context: { slug: newsId },
    });
  });

  bizPlan.forEach((bizPlanItem) => {
    const business_cd = bizPlanItem.node.business_cd;
    const biz_cd_fund_distr = bizPlanItem.node.biz_cd_fund_distr;
    const direct_organization_cd =
      bizPlanItem.node.business_org_type === "F"
        ? bizPlanItem.node.fund_distr_grp_cd
        : bizPlanItem.node.executive_grp_cd;
    const insert_id_bizplan = bizPlanItem.node.insert_id;

    const bizPlanGroupArray = bizPlanGroup.filter(
      (item) => item.node.business_cd === business_cd
    );
    const organization_cd = bizPlanGroupArray.map(
      (item) => item.node.organization_cd
    );
    organization_cd.push(direct_organization_cd);
    const insert_id_group = organization_cd.map((code) => {
      const groupItem = group.find(
        (item) => item.node.organization_cd === code
      );
      return groupItem ? groupItem.node.insert_id : "";
    });

    createPage({
      path: `/result/${business_cd}/`,
      component: path.resolve("./src/templates/main.tsx"),
      context: {
        slug: business_cd,
        organization_cd: organization_cd,
        biz_cd_fund_distr: biz_cd_fund_distr,
      },
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
      path: `/result/${business_cd}/selected-project`,
      component: path.resolve("./src/templates/selectedProject.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/project-plan`,
      component: path.resolve("./src/templates/projectPlan.tsx"),
      context: { slug: business_cd, insert_id: insert_id_bizplan },
    });
    createPage({
      path: `/result/${business_cd}/evaluation-plan`,
      component: path.resolve("./src/templates/evaluationPlan.tsx"),
      context: {
        slug: business_cd,
      },
    });
    createPage({
      path: `/result/${business_cd}/financial-plan`,
      component: path.resolve("./src/templates/financialPlan.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/exante-evaluation-report`,
      component: path.resolve("./src/templates/exanteEvaluationReport.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/progress-report`,
      component: path.resolve("./src/templates/progressReport.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/interim-report`,
      component: path.resolve("./src/templates/interimReport.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/expost-evaluation-report`,
      component: path.resolve("./src/templates/expostEvaluationReport.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/financial-report`,
      component: path.resolve("./src/templates/financialReport.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/completion-report`,
      component: path.resolve("./src/templates/completionReport.tsx"),
      context: { slug: business_cd },
    });
  });

  bizPlanManual.forEach((bizPlanManualItem) => {
    const business_cd =
      bizPlanManualItem.node.business_org_type === "F"
        ? bizPlanManualItem.node.biz_cd_fund_distr
        : bizPlanManualItem.node.biz_cd_executive;
    const biz_cd_fund_distr = bizPlanManualItem.node.biz_cd_fund_distr;
    const direct_organization_cd =
      bizPlanManualItem.node.business_org_type === "F"
        ? bizPlanManualItem.node.fund_distr_grp_cd
        : bizPlanManualItem.node.executive_grp_cd;

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
    organization_cd.push(direct_organization_cd);
    const insert_id_group = organization_cd.map((code) => {
      const groupItem = group.find(
        (item) => item.node.organization_cd === code
      );
      return groupItem ? groupItem.node.insert_id : "";
    });

    createPage({
      path: `/result/${business_cd}/`,
      component: path.resolve("./src/templates/main.tsx"),
      context: {
        slug: business_cd,
        organization_cd: organization_cd,
        biz_cd_fund_distr: biz_cd_fund_distr,
      },
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
      path: `/result/${business_cd}/selected-project`,
      component: path.resolve("./src/templates/selectedProject.tsx"),
      context: { slug: business_cd },
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
    createPage({
      path: `/result/${business_cd}/exante-evaluation-report`,
      component: path.resolve("./src/templates/exanteEvaluationReport.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/progress-report`,
      component: path.resolve("./src/templates/progressReport.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/interim-report`,
      component: path.resolve("./src/templates/interimReport.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/expost-evaluation-report`,
      component: path.resolve("./src/templates/expostEvaluationReport.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/financial-report`,
      component: path.resolve("./src/templates/financialReport.tsx"),
      context: { slug: business_cd },
    });
    createPage({
      path: `/result/${business_cd}/completion-report`,
      component: path.resolve("./src/templates/completionReport.tsx"),
      context: { slug: business_cd },
    });
  });
};
