import { graphql, useStaticQuery } from "gatsby";
import React, { FC, ReactNode, createContext, useContext } from "react";

const contextQuery = graphql`
  query ContextQuery {
    allStrapiBizPlan {
      edges {
        node {
          business_cd
          business_name
          target_area
          business_category
          business_category1
          business_category2
          business_org_type
          business_type_name
          business_status
          region1
          region2
          region3
          region4
          field1_1
          field1_2
          field1_3
          field1_9
          field2_4
          field2_5
          field2_6
          field2_9
          field3_7
          field3_8
          field3_9
        }
      }
    }
    allStrapiBizPlanSub {
      edges {
        node {
          business_cd
          sdgs_goal
        }
      }
    }
    allStrapiBizPlanGroup {
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
    allStrapiFinancePlan {
      edges {
        node {
          business_org_type
          biz_cd_executive
          biz_cd_fund_distr
          sum_subidy
        }
      }
    }
    allStrapiFinancePlanFormer {
      edges {
        node {
          business_org_type
          biz_cd_executive
          biz_cd_fund_distr
          abc_ttl
        }
      }
    }
    allStrapiGroup {
      edges {
        node {
          organization_cd
          legal_personality
          organization_type_cd
          organization_name
          prefectures
          insert_id
        }
      }
    }
    allStrapiEvaluationPlan {
      edges {
        node {
          business_cd
          insert_id
        }
      }
    }
    allStrapiBizPlanManual {
      edges {
        node {
          business_org_type
          biz_cd_executive
          biz_cd_fund_distr
          business_name
          business_type_name {
            label
          }
          business_category {
            code
            subCode
          }
          business_status
          target_area
          subsidy_amount {
            amount
          }
          topic_keywords {
            label
          }
          field1_1
          field1_2
          field1_3
          field2_4
          field2_5
          field2_6
          field3_7
          field3_8
          sdgs_goals {
            value
          }
        }
      }
    }
    allStrapiBizPlanGroupManual {
      edges {
        node {
          business_org_type
          biz_cd_fund_distr
          biz_cd_executive
          fund_distr_grp_cd
          executive_grp_cd
          org_role_fdo
          org_role_ado
        }
      }
    }
  }
`;

const defaultState: Queries.ContextQueryQuery = {
  //事業計画
  allStrapiBizPlan: { edges: [] },
  allStrapiBizPlanSub: { edges: [] },
  //資金計画
  allStrapiFinancePlan: { edges: [] },
  allStrapiFinancePlanFormer: { edges: [] },
  //団体
  allStrapiGroup: { edges: [] },
  allStrapiBizPlanGroup: { edges: [] },
  //評価計画
  allStrapiEvaluationPlan: { edges: [] },
  //手動入力
  allStrapiBizPlanManual: { edges: [] },
  allStrapiBizPlanGroupManual: { edges: [] },
};

const StrapiContext = createContext(defaultState);

const StrapiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const strapiData = useStaticQuery(contextQuery);
  const value = strapiData;
  return (
    <StrapiContext.Provider value={value}>{children}</StrapiContext.Provider>
  );
};

export function useStrapiContext() {
  return useContext(StrapiContext);
}

export default StrapiProvider;
