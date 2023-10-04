import { Link, graphql } from "gatsby";
import React, { useEffect } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import DetailSidebar from "../components/organisms/DetailSidebar";
import "twin.macro";
import tw from "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import { useFilteredStrapiContext } from "../context/filteredStrapiContext";
import { businessCategoryArray } from "../features/search/store/filterContents";
import { useStrapiContext } from "../context/strapiContext";
import DetailAnchor from "../components/atoms/DetailAnchor";
import { table, td, th, tr } from "../styles/table";
import { detailAnchor, detailBody, detailFlex } from "../styles/detailPage";
import { useDetailContext } from "../context/detailContext";

const Main: React.FC<any> = ({ data, pageContext }) => {
  const filteredAllBizPlan = useFilteredStrapiContext();
  const {
    setWithORM,
    setWithPreRM,
    setWithMRM,
    setWithPostRM,
    setWithProRM,
    setWithCRM,
  } = useDetailContext();
  const { slug } = pageContext;
  const filteredSingleBizPlan = filteredAllBizPlan.find(
    (item) => item.bizPlan.business_cd === slug
  ) || { bizPlan: {}, group: [] };
  const { bizPlan, group } = filteredSingleBizPlan;
  const {
    business_name,
    business_status,
    target_area,
    business_category,
    business_type_name,
  } = bizPlan;
  const {
    strapiBizPlan,
    strapiBizPlanManualFDO,
    strapiBizPlanManualADO,
    strapiBizPlanLinkADO,
    strapiBizPlanLinkFDO,
    strapiBizPlanManualLinkADO,
    strapiBizPlanManualLinkFDO,
    allStrapiGroup,

    //サイドバーチェック用
    strapiOfferingReportManualFDO,
    strapiPreReportManualFDO,
    strapiPreReportManualADO,
    strapiMidReportManualFDO,
    strapiMidReportManualADO,
    strapiPostReportManualFDO,
    strapiPostReportManualADO,
    strapiProgressReportManualFDO,
    strapiProgressReportManualADO,
    strapiCompleteReportManualFDO,
    strapiCompleteReportManualADO,
  } = data;

  const mainGroup =
    group.length !== 0 &&
    group.find((g: any) => {
      const groupRole =
        g.business_org_type === "F" ? g.org_role_fdo : g.org_role_ado;
      return groupRole === 0 || 1;
    });
  const mainGroupName = mainGroup ? mainGroup.groupData.organization_name : "";

  let businessCategoryLabel: string | undefined = "";
  if (business_category) {
    if (business_category.code === 1) {
      businessCategoryLabel = business_category.subCode
        ? businessCategoryArray.find(
            (bcp) => business_category.subCode === bcp.subCode
          )?.label
        : "草の根活動支援事業";
    } else {
      businessCategoryLabel = businessCategoryArray.find(
        (bcp) => business_category.code === bcp.code
      )?.label;
    }
  } else {
    businessCategoryLabel = "";
  }

  let businessStatusText = "";
  if (typeof business_status === "number" && business_status === 0) {
    businessStatusText = "実施中";
  } else if (typeof business_status === "boolean" && business_status) {
    businessStatusText = "実施中";
  } else {
    businessStatusText = "終了";
  }

  const business_overview =
    (strapiBizPlan && strapiBizPlan.business_overview.data.business_overview) ||
    (strapiBizPlanManualFDO &&
      strapiBizPlanManualFDO.business_overview.data.business_overview) ||
    (strapiBizPlanManualADO &&
      strapiBizPlanManualADO.business_overview.data.business_overview);

  const linkedAdo = [
    ...strapiBizPlanLinkADO.edges,
    ...strapiBizPlanManualLinkADO.edges,
    ...strapiBizPlanLinkFDO.edges,
    ...strapiBizPlanManualLinkFDO.edges,
  ];
  const pickupLinkedAdoGroupName = (organization_cd: string) => {
    const linkedAdoGroup = allStrapiGroup.edges.find(
      (g: any) => g.node.organization_cd === organization_cd
    );
    return linkedAdoGroup ? linkedAdoGroup.node.organization_name : "";
  };

  useEffect(() => {
    setWithORM(strapiOfferingReportManualFDO);
    setWithPreRM(strapiPreReportManualFDO || strapiPreReportManualADO);
    setWithMRM(strapiMidReportManualFDO || strapiMidReportManualADO);
    setWithPostRM(strapiPostReportManualFDO || strapiPostReportManualADO);
    setWithProRM(
      strapiProgressReportManualFDO || strapiProgressReportManualADO
    );
    setWithCRM(strapiCompleteReportManualFDO || strapiCompleteReportManualADO);
  }, []);

  console.log(bizPlan);

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="事業詳細" slug={slug}>
          <div css={detailAnchor}>
            <DetailAnchor
              title="事業情報"
              anchor={`/result/${slug}/#firstItem`}
            />
            {linkedAdo.length !== 0 && (
              <DetailAnchor
                title="実行団体"
                anchor={`/result/${slug}/#secondItem`}
              />
            )}
          </div>
          <div css={detailBody}>
            <div id="firstItem">
              <DetailItemWrapper itemName="事業情報">
                <div tw="hidden lg:(block)">
                  <p css={th}>事業名</p>
                  <p css={td}>{business_name}</p>
                  <p css={th}>採択事業年度</p>
                  <p css={td}>
                    {business_type_name &&
                      (business_type_name.label || business_type_name)}
                  </p>
                  <p css={th}>採択事業年度</p>
                  <p css={td}>
                    {business_type_name &&
                      (business_type_name.label || business_type_name)}
                  </p>
                  <p css={th}>事業分類</p>
                  <p css={td}>{businessCategoryLabel}</p>
                  <p css={th}>事業対象地域</p>
                  <p css={td}>{target_area}</p>
                  <p css={th}>事業ステータス</p>
                  <p css={td}>{businessStatusText}</p>
                  <p css={th}>事業概要</p>
                  <p css={td}>{business_overview}</p>
                </div>
                <table tw="lg:hidden">
                  <tbody>
                    <tr>
                      <th css={th}>事業名</th>
                      <td css={td}>{business_name}</td>
                    </tr>
                    {mainGroup && (
                      <tr>
                        <th css={th}>団体名</th>
                        <td css={td}>{mainGroupName}</td>
                      </tr>
                    )}
                    {business_type_name && (
                      <tr>
                        <th css={th}>採択事業年度</th>
                        <td css={td}>
                          {business_type_name &&
                            (business_type_name.label || business_type_name)}
                        </td>
                      </tr>
                    )}
                    {businessCategoryLabel && (
                      <tr>
                        <th css={th}>事業分類</th>
                        <td css={td}>{businessCategoryLabel}</td>
                      </tr>
                    )}
                    {target_area && (
                      <tr>
                        <th css={th}>事業対象地域</th>
                        <td css={td}>{target_area}</td>
                      </tr>
                    )}
                    <tr>
                      <th css={th}>事業ステータス</th>
                      <td css={td}>{businessStatusText}</td>
                    </tr>
                    {business_overview && (
                      <tr>
                        <th css={th}>事業概要</th>
                        <td css={td}>{business_overview}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </DetailItemWrapper>
            </div>

            <div id="secondItem">
              {linkedAdo.length !== 0 && (
                <DetailItemWrapper itemName="実行団体">
                  <div tw="flex flex-col gap-2.5">
                    {linkedAdo.map((item, i) => (
                      <div key={i}>
                        <div tw="hidden lg:(block)">
                          <p css={th}>実行団体名</p>
                          <p css={td}>
                            {pickupLinkedAdoGroupName(
                              item.node.executive_grp_cd ||
                                item.node.fund_distr_grp_cd
                            )}
                          </p>
                          <p css={th}>事業名</p>
                          <p css={td}>
                            <Link
                              to={`/result/${
                                item.node.biz_cd_executive ||
                                item.node.biz_cd_fund_distr
                              }`}
                              tw="underline text-blue-link"
                            >
                              {item.node.business_name}
                            </Link>
                          </p>
                        </div>
                        <table tw="lg:hidden">
                          <tbody>
                            <tr>
                              <th css={th}>実行団体名</th>
                              <td css={td}>
                                {pickupLinkedAdoGroupName(
                                  item.node.executive_grp_cd ||
                                    item.node.fund_distr_grp_cd
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th css={th}>事業名</th>
                              <td css={td}>
                                <Link
                                  to={`/result/${
                                    item.node.biz_cd_executive ||
                                    item.node.biz_cd_fund_distr
                                  }`}
                                  tw="underline text-blue-link"
                                >
                                  {item.node.business_name}
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </DetailItemWrapper>
              )}
            </div>
          </div>
        </DetailWrapper>
      </div>
    </Layout>
  );
};

export default Main;

export const pageQuery = graphql`
  query MyQuery($slug: String!, $biz_cd_fund_distr: String!) {
    strapiBizPlan(business_cd: { eq: $slug }) {
      business_overview {
        data {
          business_overview
        }
      }
    }
    strapiBizPlanLinkADO: allStrapiBizPlan(
      filter: {
        biz_cd_fund_distr: { eq: $slug }
        business_org_type: { eq: "A" }
      }
    ) {
      edges {
        node {
          biz_cd_executive
          executive_grp_cd
          business_name
        }
      }
    }
    strapiBizPlanLinkFDO: allStrapiBizPlan(
      filter: {
        biz_cd_fund_distr: { eq: $biz_cd_fund_distr }
        business_org_type: { eq: "F" }
      }
    ) {
      edges {
        node {
          biz_cd_fund_distr
          fund_distr_grp_cd
          business_name
        }
      }
    }
    strapiBizPlanManualFDO: strapiBizPlanManual(
      biz_cd_fund_distr: { eq: $slug }
    ) {
      business_overview {
        data {
          business_overview
        }
      }
    }
    strapiBizPlanManualADO: strapiBizPlanManual(
      biz_cd_executive: { eq: $slug }
    ) {
      business_overview {
        data {
          business_overview
        }
      }
    }
    strapiBizPlanManualLinkADO: allStrapiBizPlanManual(
      filter: {
        biz_cd_fund_distr: { eq: $slug }
        business_org_type: { eq: "A" }
      }
    ) {
      edges {
        node {
          biz_cd_executive
          executive_grp_cd
          business_name
        }
      }
    }
    strapiBizPlanManualLinkFDO: allStrapiBizPlanManual(
      filter: {
        biz_cd_fund_distr: { eq: $biz_cd_fund_distr }
        business_org_type: { eq: "F" }
      }
    ) {
      edges {
        node {
          biz_cd_fund_distr
          fund_distr_grp_cd
          business_name
        }
      }
    }
    allStrapiGroup {
      edges {
        node {
          organization_name
          organization_cd
        }
      }
    }
    strapiOfferingReportManualFDO: strapiOfferingReportManual(
      biz_cd_fund_distr: { eq: $slug }
    ) {
      id
    }
    strapiPreReportManualFDO: strapiPreReportManual(
      biz_cd_fund_distr: { eq: $slug }
    ) {
      id
    }
    strapiPreReportManualADO: strapiPreReportManual(
      biz_cd_executive: { eq: $slug }
    ) {
      id
    }
    strapiMidReportManualFDO: strapiMidReportManual(
      biz_cd_fund_distr: { eq: $slug }
    ) {
      id
    }
    strapiMidReportManualADO: strapiMidReportManual(
      biz_cd_executive: { eq: $slug }
    ) {
      id
    }
    strapiPostReportManualFDO: strapiPostReportManual(
      biz_cd_fund_distr: { eq: $slug }
    ) {
      id
    }
    strapiPostReportManualADO: strapiPostReportManual(
      biz_cd_executive: { eq: $slug }
    ) {
      id
    }
    strapiProgressReportManualFDO: strapiProgressReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiProgressReportManualADO: strapiProgressReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
    strapiCompleteReportManualFDO: strapiCompleteReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiCompleteReportManualADO: strapiCompleteReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
  }
`;
