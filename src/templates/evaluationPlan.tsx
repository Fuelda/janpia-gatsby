import { Link, graphql } from "gatsby";
import React from "react";

const EvaluationPlan: React.FC<any> = ({ data }) => {
  console.log(data);

  return (
    <div>
      <p>評価計画</p>
    </div>
  );
};

export default EvaluationPlan;

export const pageQuery = graphql`
  query MyQuery($slug: String!, $insert_id: [String]) {
    strapiEvaluationPlan(business_cd: { eq: $slug }) {
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
    allStrapiEvaluationPlanSub(filter: { business_cd: { eq: $slug } }) {
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
  }
`;
