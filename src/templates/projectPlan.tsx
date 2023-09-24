import { graphql } from "gatsby";
import React from "react";

const ProjectPlan: React.FC<any> = ({ data }) => {
  console.log(data);

  return (
    <div>
      <p>Project plan</p>
    </div>
  );
};

export default ProjectPlan;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiBizPlan(business_cd: { eq: $slug }) {
      business_cd
      business_org_type
      biz_cd_fund_distr
      fund_distr_grp_cd
      biz_cd_executive
      executive_grp_cd
      business_type_cd
      business_type_name
      business_name
      business_name_sub
      business_category
      business_category2
      business_category3
      business_category4
      region1
      region2
      region3
      field1_1
      field1_2
      field1_3
      field2_4
      field2_5
      field2_6
      field2_9
      field3_8
      field3_9
      field_other {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      other_problem
      field_other_problem {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      vision {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      mission {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      funding_conclusion_d
      business_period_s
      business_period_e
      target_area
      direct_target_grp {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      direct_target_cnt {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      indirect_target_cnt {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      indirect_target_grp {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      beneficiary {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      beneficiary_cnt {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      business_target_fdo {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      business_target_fcnt {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      business_target_ado {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      business_target_acnt {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      business_overview {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      social_issues_corona {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      subsidy_apply_reason {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      social_issues {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      task_administration {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      task_request_account {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      significance {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      midterm_biz_goals {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_0 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_1 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_2 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_3 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_season_0 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_season_1 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_season_2 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_season_3 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_non_0 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_non_1 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_non_2 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_non_3 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_season_n_0 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_season_n_1 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_season_n_2 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      activity_season_n_3 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      human_resources {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      equipment {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      etc_resources {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      sustainability1 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      sustainability2 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      pr_strategy {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      dialogue_strategy {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      exit_strategy_ado {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      exit_strategy_fdo {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      subsidy_actual {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      org_strength {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      supplement_contents1 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      supplement_contents2 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      supplement_contents3 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      supplement_title1 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      supplement_title2 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      supplement_title3 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      executive_org_amt {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      executive_org_cnt {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      ingenuity {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      examination_method {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      member_config_role {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      coordination_system {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      risk_manage_system {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      subsidy_distr_dtl {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      etc_biz_distr_dtl {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      other_subsidy_actual {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      last_year_org_cnt {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      last_year_subsidy {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      org_strength_ado {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      org_strength_fdo {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      create_date
      insert_id
      org_role_ado
      org_role_fdo
    }
    allStrapiBizPlanSub(filter: { business_cd: { eq: $slug } }) {
      edges {
        node {
          business_cd
          business_org_type
          biz_cd_fund_distr
          biz_cd_executive
          row_no
          info_type
          business_goals {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          goals_monitoring {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          goals_index {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          goals_index_arrival {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          goals_grasp {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          goals_initial {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          goals_goal {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          goals_achievement {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          goals_mid_eval {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          goals_aft_eval {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output_monitor {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output_index {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output_index_arrival {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output_grasp {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output_initial {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output_goal {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output_achievement {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output_activity {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output_season {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output_mid_eval {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          output_aft_eval {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          activity {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          activity_season {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          sdgs_goal
          sdgs_target
          sdgs_description {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          create_date(formatString: "yyyy/mm/dd")
          insert_id
        }
      }
    }
  }
`;
