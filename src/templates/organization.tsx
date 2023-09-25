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

const Organization: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  console.log(data);
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
        </DetailWrapper>
      </div>
      <div css={detailBody}>
        <div id="firstItem">
          <DetailItemWrapper itemName="団体組織情報">
            <table css={table}>
              <tbody>
                {/* <tr css={tr}>
                      <th css={th}>事業名</th>
                      <td css={td}>{business_name}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>団体名</th>
                      <td css={td}>{mainGroupName}</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>採択事業年度</th>
                      <td css={td}>まだ</td>
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
                    </tr> */}
              </tbody>
            </table>
          </DetailItemWrapper>
        </div>
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
    allStrapiBizPlanGroup(filter: { business_cd: { eq: $slug } }) {
      edges {
        node {
          business_cd
          organization_cd
          business_org_type
          biz_cd_fund_distr
          fund_distr_grp_cd
          org_role_fdo
          biz_cd_executive
          executive_grp_cd
          org_role_ado
          create_date
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
