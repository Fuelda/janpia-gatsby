import { Link, graphql } from "gatsby";
import React from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import DetailSidebar from "../components/organisms/DetailSidebar";
import { detailAnchor, detailBody, detailFlex } from "../styles/detailPage";
import DetailAnchor from "../components/atoms/DetailAnchor";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import { table, td, th, thead, tr } from "../styles/table";
import AttachedFileLink from "../components/atoms/AttachedFileLink";
import "twin.macro";

const EvaluationPlan: React.FC<any> = ({ data, pageContext }) => {
  const {
    strapiEvaluationPlan,
    allStrapiEvaluationPlanSub,
    allStrapiAttachedFile,
  } = data;

  const { slug, insert_id } = pageContext;
  console.log(insert_id);

  const evaluationFile = allStrapiAttachedFile.edges.filter(
    (af: any) => af.node.item_id === "attach_fileupload_item2"
  );

  console.log(data);

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="評価計画">
          <div css={detailAnchor}>
            <DetailAnchor
              title="評価スケジュール・実施体制"
              anchor={`/result/${slug}/evaluation-plan/#firstItem`}
            />
            {evaluationFile.length !== 0 && (
              <DetailAnchor
                title="事業設計図"
                anchor={`/result/${slug}/evaluation-plan/#secondItem`}
              />
            )}
          </div>
          <div css={detailBody}>
            <div id="firstItem">
              <DetailItemWrapper itemName="評価スケジュール・実施体制">
                <table css={table}>
                  <thead css={thead}>
                    <tr css={tr}>
                      <th css={th}>申請種別</th>
                      <td css={td}>中間評価</td>
                      <td css={td}>事後評価</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr css={tr}>
                      <th css={th}>評価計画の見直し時期</th>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.mid_rethink_season}
                      </td>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.after_rethink_season}
                      </td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>実施時期</th>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.mid_imple_priod}
                      </td>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.after_imple_priod}
                      </td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>提出時期</th>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.mid_submit_priod}
                      </td>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.after_submit_priod}
                      </td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>実施体制</th>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.mid_imple_system}
                      </td>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.after_imple_system}
                      </td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>資金分配団体の伴走支援内容</th>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.mid_escort_support}
                      </td>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.after_escort_support}
                      </td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>評価関連経費（金額）</th>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.mid_expenses}
                      </td>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.after_expenses}
                      </td>
                    </tr>

                    <tr css={tr}>
                      <th css={th}>評価関連経費の使用方法</th>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.mid_expenses_usage}
                      </td>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.after_expenses_usage}
                      </td>
                    </tr>
                    <tr css={tr}>
                      <th css={th}>
                        評価関連経費を使用することで、どのように評価の質を上げることを目指しますか
                      </th>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.mid_improving_mh}
                      </td>
                      <td css={td}>
                        {strapiEvaluationPlan &&
                          strapiEvaluationPlan.after_improving_mh}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </DetailItemWrapper>
            </div>
            {evaluationFile.length !== 0 && (
              <div id="secondItem">
                <DetailItemWrapper itemName="事業設計図">
                  <div tw="flex gap-[5px] flex-wrap">
                    {evaluationFile.map((ef: any) => (
                      <AttachedFileLink
                        filePath={ef.node.data.url}
                        fileName={ef.node.file_name}
                        key={ef.node.data.url}
                      />
                    ))}
                  </div>
                </DetailItemWrapper>
              </div>
            )}
          </div>
        </DetailWrapper>
      </div>
    </Layout>
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
          item_id
          file_name
          data {
            url
          }
        }
      }
    }
  }
`;
