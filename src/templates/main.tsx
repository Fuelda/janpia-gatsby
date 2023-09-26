import { Link, graphql } from "gatsby";
import React from "react";
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

const Main: React.FC<any> = ({ data, pageContext }) => {
  const filteredAllBizPlan = useFilteredStrapiContext();
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
    strapiBizPlanManualLinkADO,
    allStrapiGroup,
  } = data;

  const businessCategoryProperty = businessCategoryArray;

  const mainGroup =
    group.length !== 0 &&
    group.find((g: any) => {
      const groupRole =
        g.business_org_type === "F" ? g.org_role_fdo : g.org_role_ado;
      return groupRole === 1;
    });
  const mainGroupName = mainGroup ? mainGroup.groupData.organization_name : "";

  let businessCategoryLabel: string | undefined = "";
  if (business_category) {
    if (business_category.code === 1) {
      businessCategoryLabel = business_category.subCode
        ? businessCategoryProperty.find(
            (bcp) => business_category.subCode === bcp.subCode
          )?.label
        : "草の根活動支援事業";
    } else {
      businessCategoryLabel = businessCategoryProperty.find(
        (bcp) => business_category.code === bcp.code
      )?.label;
    }
  } else {
    businessCategoryLabel = "";
  }

  let businessStatusText = "";
  if (typeof business_status === "string" && business_status === "1") {
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
  ];
  const pickupLinkedAdoGroupName = (organization_cd: string) => {
    const linkedAdoGroup = allStrapiGroup.edges.find(
      (g: any) => g.node.organization_cd === organization_cd
    );
    return linkedAdoGroup ? linkedAdoGroup.node.organization_name : "";
  };

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="事業詳細">
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
                <table css={table}>
                  <tbody>
                    <tr css={tr}>
                      <th css={th}>事業名</th>
                      <td css={td}>{business_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>団体名</th>
                      <td css={td}>{mainGroupName}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>採択事業年度</th>
                      <td css={td}>
                        {business_type_name &&
                          (business_type_name.label || business_type_name)}
                      </td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>事業分類</th>
                      <td css={td}>{businessCategoryLabel}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>事業対象地域</th>
                      <td css={td}>{target_area}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>事業ステータス</th>
                      <td css={td}>{businessStatusText}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>事業概要</th>
                      <td css={td}>{business_overview}</td>
                    </tr>
                  </tbody>
                </table>
              </DetailItemWrapper>
            </div>

            <div id="secondItem">
              {linkedAdo.length !== 0 && (
                <DetailItemWrapper itemName="実行団体">
                  <div tw="flex flex-col gap-2.5">
                    {linkedAdo.map((item) => (
                      <table key={item}>
                        <tbody>
                          <tr css={tr}>
                            <th css={th}>実行団体名</th>
                            <td css={td}>
                              {pickupLinkedAdoGroupName(
                                item.node.executive_grp_cd
                              )}
                            </td>
                          </tr>
                          <tr css={tr}>
                            <th css={th}>事業名</th>
                            <td css={td}>
                              <Link
                                to={`/result/${item.node.biz_cd_executive}`}
                                tw="underline text-blue-link"
                              >
                                {item.node.business_name}
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
  query MyQuery($slug: String!) {
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
    allStrapiGroup {
      edges {
        node {
          organization_name
          organization_cd
        }
      }
    }
  }
`;
