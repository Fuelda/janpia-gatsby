const allQuery = {
  attachedFiles: `{
    allStrapiAttachedFile {
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
  }`,
  bizPlan: `{
    allStrapiBizPlan {
      edges {
        node {
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
      }
    }
  }`,
  bizPlanGroup: `{
    allStrapiBizPlanGroup {
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
  }`,
  group: `{
    allStrapiGroup {
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
  }`,
  bizPlanSub: `{
    allStrapiBizPlanSub {
      edges {
        node {
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
          business_cd
        }
      }
    }
  }`,
  financePlan: `{
    allStrapiFinancePlan {
      edges {
        node {
          financing_plan_no
          business_org_type
          biz_cd_fund_distr
          fund_distr_grp_cd
          biz_cd_executive
          executive_grp_cd
          business_type_cd
          business_type_name
          insert_id
          financing_pln_type
          bis_sum
          bis_a
          bis_b
          bis_ado
          bis_a_ado
          bis_b_ado_sum
          bis_ado_direct
          bis_a_ado_direct
          bis_b_ado_sum_direct
          bis_manage_sum
          bis_a_manage_sum
          bis_b_manage_sum
          po_sum_sum
          po_c_sum
          eval_sum_sum
          eval_sum
          eval_fdo_sum_sum
          eval_fdo_sum
          eval_ado_sum_sum
          eval_ado_sum
          sum_sum
          sum_subidy
          sum_own_funds
          create_date(formatString: "yyyy/mm/dd")
        }
      }
    }
  }`,
  financePlanFormer: `{
    allStrapiFinancePlanFormer {
      edges {
        node {
          financing_plan_no
          business_org_type
          biz_cd_fund_distr
          fund_distr_grp_cd
          biz_cd_executive
          executive_grp_cd
          business_type_cd
          business_type_name
          financing_pln_type
          a_plus_b_2020
          a_plus_b_2021
          a_plus_b_2022
          a_plus_b_2023
          a_plus_b_2024
          a_plus_b_ttl
          subsidy_2020
          subsidy_2021
          subsidy_2022
          subsidy_2023
          subsidy_2024
          subsidy_ttl
          own_funds_2020
          own_funds_2021
          own_funds_2022
          own_funds_2023
          own_funds_2024
          own_funds_ttl
          subsidy_rate_2020
          subsidy_rate_2021
          subsidy_rate_2022
          subsidy_rate_2023
          subsidy_rate_2024
          subsidy_rate_ttl
          exception_request
          po_2020
          po_2021
          po_2022
          po_2023
          po_2024
          po_ttl
          eval_fdo_2020
          eval_fdo_2021
          eval_fdo_2022
          eval_fdo_2023
          eval_fdo_2024
          eval_ttl
          eval_2020
          eval_2021
          eval_2022
          eval_2023
          eval_2024
          eval_fdo_ttl
          eval_fdo_percent
          eval_ado_2020
          eval_ado_2021
          eval_ado_2022
          eval_ado_2023
          eval_ado_2024
          eval_ado_percent
          eval_ado_ttl
          abc_2020
          abc_2021
          abc_2022
          abc_2023
          abc_2024
          abc_ttl
          all_2020
          all_2021
          all_2022
          all_2023
          all_2024
          all_ttl
          a_ttl
          dct_pj_cost_a_ttl
          dct_pj_cost_a_ttl_ado
          mg_cost_a_ttl
          pct_mg_cost_a_ttl
          b_ttl
          dct_pj_cost_b_ttl
          dct_pj_cost_b_ttl_ado
          mg_cost_b_ttl
          pct_mg_cost_b_ttl
          create_date(formatString: "yyyy/mm/dd")
          insert_id
        }
      }
    }
  }`,
  evaluationPlan: `{
    allStrapiEvaluationPlan {
      edges {
        node {
          business_cd
          business_org_type
          biz_cd_fund_distr
          fund_distr_grp_cd
          biz_cd_executive
          executive_grp_cd
          business_type_cd
          business_type_name
          apply_type
          apply_type_name
          insert_id
          mid_rethink_season
          after_rethink_season
          prior_imple_priod
          mid_imple_priod
          after_imple_priod
          prior_submit_priod
          mid_submit_priod
          after_submit_priod
          prior_imple_system
          mid_imple_system
          after_imple_system
          mid_escort_support
          after_escort_support
          prior_investigation
          mid_investigation
          after_investigation
          prior_expenses
          mid_expenses
          after_expenses
          after_expenses_usage
          mid_expenses_usage
          mid_improving_mh
          after_improving_mh
          prior_comm_expenses
          mid_comm_expenses
          after_comm_expenses
          prior_consign_detail
          mid_consign_detail
          after_consign_detail
          other_content_1
          other_content_2
          other_content_3
          other_title_1
          other_title_2
          other_title_3
          biz_design_chk_list4
          biz_design_chk_list5
          create_date(formatString: "yyyy/mm/dd")
        }
      }
    }
  }`,
  evaluationPlanSub: `{
    allStrapiEvaluationPlanSub {
      edges {
        node {
          business_cd
          business_org_type
          biz_cd_fund_distr
          biz_cd_executive
          insert_id
          row_no
          info_type
          eval_factors
          eval_item
          eval_sub_item
          criteria_method
          criteria_st_value
          mm_required_data
          mm_if_source
          mm_col_method
          eval_season
          index_business_goals
          index_output
          index_monitoring
          index_index
          index_grasp
          index_goal
          index_achievement
          create_date(formatString: "yyyy/mm/dd")
        }
      }
    }
  }`,
};

// export default allQuery;
module.exports = allQuery;
