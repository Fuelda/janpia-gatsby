import { graphql } from "gatsby";
import React from "react";

const Organization: React.FC<any> = ({ data }) => {
  console.log(data);
  return (
    <div>
      <p>Organization</p>
    </div>
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
