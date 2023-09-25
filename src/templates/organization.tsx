import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import { detailAnchor, detailBody, detailFlex } from "../styles/detailPage";
import DetailSidebar from "../components/organisms/DetailSidebar";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailAnchor from "../components/atoms/DetailAnchor";
import "twin.macro";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import { table, td, th, tr } from "../styles/table";
import { legalPersonalityArray } from "../features/search/store/filterContents";

const Organization: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const {
    allStrapiBizPlanGroup,
    allStrapiBizPlanGroupManualADO,
    allStrapiBizPlanGroupManualFDO,
    allStrapiGroup,
  } = data;

  const bizPlanGroupArray = [
    ...allStrapiBizPlanGroup.edges,
    ...allStrapiBizPlanGroupManualFDO.edges,
    ...allStrapiBizPlanGroupManualADO.edges,
  ];
  const mainBizPlanGroup = bizPlanGroupArray.find((bpg) => {
    const groupRole =
      bpg.node.business_org_type === "F"
        ? bpg.node.org_role_fdo
        : bpg.node.org_role_ado;
    return groupRole === 1;
  });
  const mainBizPlanGroupCd = mainBizPlanGroup
    ? mainBizPlanGroup.node.organization_cd
    : "";
  const mainGroup = allStrapiGroup.edges.find(
    (g: any) => g.node.organization_cd === mainBizPlanGroupCd
  ) || { node: {} };

  const legalPersonality = legalPersonalityArray.find(
    (lp) =>
      mainGroup.node.legal_personality &&
      mainGroup.node.legal_personality === String(lp.code)
  );

  console.log(data);
  console.log(mainGroup);
  console.log(legalPersonality);

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar />
        <DetailWrapper category="団体情報">
          <div css={detailAnchor}>
            <DetailAnchor title="団体組織情報" anchor="" />
            <DetailAnchor title="代表者情報" anchor="" />
            <DetailAnchor title="役員" anchor="" />
            <DetailAnchor title="職員・従業員" anchor="" />
            <DetailAnchor title="組織評価" anchor="" />
            <DetailAnchor title="定款" anchor="" />
            <DetailAnchor title="諸規定" anchor="" />
          </div>
          <div css={detailBody}>
            <div id="firstItem">
              <DetailItemWrapper itemName="団体組織情報">
                <table css={table}>
                  <tbody>
                    <tr css={tr}>
                      <th css={th}>法人格</th>
                      <td css={td}>{legalPersonality?.label}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>団体種別</th>
                      <td css={td}>
                        {mainGroup.node.organization_type_cd === "F"
                          ? "資金分配団体"
                          : "実行団体"}
                      </td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>団体名</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>郵便番号</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>都道府県</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>市区町村</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>番地等</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>電話番号</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>団体Webサイト</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>その他のWebサイト</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>設立年月日</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>法人格取得年月日</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>団体の目的</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>団体の概要・活動・業務</th>
                      <td css={td}>{mainGroup.node.organization_name}</td>
                    </tr>
                  </tbody>
                </table>
              </DetailItemWrapper>
            </div>
          </div>
        </DetailWrapper>
      </div>
    </Layout>
  );
};

export default Organization;

export const pageQuery = graphql`
  query MyQuery(
    $slug: String!
    $insert_id: [String]
    $organization_cd: [String]
  ) {
    # strapiBizPlan(business_cd: { eq: $slug }) {
    #   business_org_type
    #   executive_grp_cd
    #   fund_distr_grp_cd
    # }
    allStrapiBizPlanGroup(filter: { business_cd: { eq: $slug } }) {
      edges {
        node {
          business_cd
          organization_cd
          business_org_type
          org_role_fdo
          org_role_ado
        }
      }
    }
    allStrapiBizPlanGroupManualFDO: allStrapiBizPlanGroupManual(
      filter: { biz_cd_fund_distr: { eq: $slug } }
    ) {
      edges {
        node {
          biz_cd_executive
          biz_cd_fund_distr
          business_org_type
          executive_grp_cd
          fund_distr_grp_cd
          org_role_ado
          org_role_fdo
        }
      }
    }
    allStrapiBizPlanGroupManualADO: allStrapiBizPlanGroupManual(
      filter: { biz_cd_executive: { eq: $slug } }
    ) {
      edges {
        node {
          biz_cd_executive
          biz_cd_fund_distr
          business_org_type
          executive_grp_cd
          fund_distr_grp_cd
          org_role_ado
          org_role_fdo
        }
      }
    }
    allStrapiAttachedFile(filter: { insert_id: { in: $insert_id } }) {
      edges {
        node {
          insert_id
          id
          file_name
          item_id
          notes
          file_id
          create_date
          data {
            name
          }
        }
      }
    }
    allStrapiGroup(filter: { organization_cd: { in: $organization_cd } }) {
      edges {
        node {
          insert_id
          legal_personality
          organization_type_cd
          organization_type
          post_code
          prefectures
          city
          address
          tel
          group_web_url
          etc_web_url1
          etc_web_url2
          etc_web_url3
          etc_web_url4
          foundation_date(formatString: "yyyy/mm/dd")
          legal_personality_d(formatString: "yyyy/mm/dd")
          representative_kana
          representative_name
          representative_kana2
          representative_name2
          representative_post
          representative_post2
          number_of_officers
          people_director
          councilor
          auditor_people
          number_of_employees
          fulltime_employees
          fulltime_paid
          fulltime_unpaid
          parttime_employees
          parttime_paid
          parttime_unpaid
          organization_measure
          certification_body
          organization_cd
          organization_name
        }
      }
    }
  }
`;
