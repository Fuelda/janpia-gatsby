import { Link, graphql } from "gatsby";
import React from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import DetailSidebar from "../components/organisms/DetailSidebar";
import { detailAnchor, detailBody, detailFlex } from "../styles/detailPage";
import DetailAnchor from "../components/atoms/DetailAnchor";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import {
  table,
  td,
  tdScroll,
  th,
  th2Sub,
  thForCircle,
  thLong,
  thScroll,
  thead,
  tr,
} from "../styles/table";
import AttachedFileLink from "../components/atoms/AttachedFileLink";
import "twin.macro";
import {
  evaluationFactorArray,
  evaluationMethodArray,
  evaluationRequiredArray,
  evaluationSeasonArray,
} from "../features/search/store/filterContents";
import EvaluationShortOutcome from "../components/organisms/EvaluationShortOutcome";

const EvaluationPlan: React.FC<any> = ({ data, pageContext }) => {
  const {
    strapiEvaluationPlan,
    allStrapiEvaluationPlanSub,
    allStrapiAttachedFile,
    evaluationPlanManualFDO,
    evaluationPlanManualADO,
  } = data;

  const { slug } = pageContext;
  const evaluationPlanManual =
    evaluationPlanManualFDO || evaluationPlanManualADO;
  const pdfUrl = evaluationPlanManual && evaluationPlanManual.data.url;
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`;
  const evaluationFile = allStrapiAttachedFile.edges.filter(
    (af: any) => af.node.item_id === "attach_fileupload_item2"
  );

  const evaluationTable =
    allStrapiEvaluationPlanSub.edges.length !== 0
      ? allStrapiEvaluationPlanSub.edges
          .filter((eps: any) => eps.node.info_type === 10)
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const shortOutcome =
    allStrapiEvaluationPlanSub.edges.length !== 0
      ? allStrapiEvaluationPlanSub.edges
          .filter((eps: any) => eps.node.info_type === 20)
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const outputFinance =
    allStrapiEvaluationPlanSub.edges.length !== 0
      ? allStrapiEvaluationPlanSub.edges
          .filter((eps: any) => eps.node.info_type === 21)
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const outputNonFinance =
    allStrapiEvaluationPlanSub.edges.length !== 0
      ? allStrapiEvaluationPlanSub.edges
          .filter((eps: any) => eps.node.info_type === 22)
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const outputAdo =
    allStrapiEvaluationPlanSub.edges.length !== 0
      ? allStrapiEvaluationPlanSub.edges
          .filter((eps: any) => eps.node.info_type === 23)
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];

  console.log(data);

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="評価計画" slug={slug}>
          {evaluationPlanManual && (
            <div>
              <iframe
                width="100%"
                height="500px"
                src={googleDocsViewerUrl}
              ></iframe>
            </div>
          )}
          {strapiEvaluationPlan && (
            <div>
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
                    <div tw="lg:overflow-scroll">
                      <table css={table} tw="lg:w-[780px]">
                        <thead css={thead}>
                          <tr css={tr}>
                            <th css={thScroll}></th>
                            <td css={thScroll}>事前評価</td>
                            <td css={thScroll}>中間評価</td>
                            <td css={thScroll}>事後評価</td>
                          </tr>
                        </thead>
                        <tbody>
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.apply_type_name && (
                              <tr>
                                <th css={thScroll}>申請種別</th>
                                <td css={tdScroll} colSpan={3}>
                                  {strapiEvaluationPlan.apply_type_name}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            (strapiEvaluationPlan.mid_rethink_season ||
                              strapiEvaluationPlan.after_rethink_season) && (
                              <tr css={tr}>
                                <th css={thScroll}>評価計画の見直し時期</th>
                                <td css={tdScroll}></td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan &&
                                    strapiEvaluationPlan.mid_rethink_season}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan &&
                                    strapiEvaluationPlan.after_rethink_season}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.prior_imple_priod && (
                              <tr css={tr}>
                                <th css={thScroll}>実施時期</th>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.prior_imple_priod &&
                                    strapiEvaluationPlan.prior_imple_priod}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.mid_imple_priod &&
                                    strapiEvaluationPlan.mid_imple_priod}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.after_imple_priod &&
                                    strapiEvaluationPlan.after_imple_priod}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.prior_submit_priod && (
                              <tr css={tr}>
                                <th css={thScroll}>提出時期</th>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.prior_submit_priod &&
                                    strapiEvaluationPlan.prior_submit_priod}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.mid_submit_priod &&
                                    strapiEvaluationPlan.mid_submit_priod}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.after_submit_priod &&
                                    strapiEvaluationPlan.after_submit_priod}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.prior_imple_system && (
                              <tr css={tr}>
                                <th css={thScroll}>実施体制</th>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.prior_imple_system &&
                                    strapiEvaluationPlan.prior_imple_system}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.mid_imple_system &&
                                    strapiEvaluationPlan.mid_imple_system}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.after_imple_system &&
                                    strapiEvaluationPlan.after_imple_system}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            (strapiEvaluationPlan.mid_escort_support ||
                              strapiEvaluationPlan.after_escort_support) && (
                              <tr css={tr}>
                                <th css={thScroll}>
                                  資金分配団体の伴走支援内容
                                </th>
                                <td></td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan &&
                                    strapiEvaluationPlan.mid_escort_support}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan &&
                                    strapiEvaluationPlan.after_escort_support}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.prior_investigation && (
                              <tr css={tr}>
                                <th css={thScroll}>必要な調査</th>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.prior_investigation &&
                                    strapiEvaluationPlan.prior_investigation}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.mid_investigation &&
                                    strapiEvaluationPlan.mid_investigation}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.after_investigation &&
                                    strapiEvaluationPlan.after_investigation}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.prior_expenses && (
                              <tr css={tr}>
                                <th css={thScroll}>評価関連経費（金額）</th>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.prior_expenses &&
                                    strapiEvaluationPlan.prior_expenses}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.mid_expenses &&
                                    strapiEvaluationPlan.mid_expenses}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.after_expenses &&
                                    strapiEvaluationPlan.after_expenses}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            (strapiEvaluationPlan.mid_expenses_usage ||
                              strapiEvaluationPlan.after_expenses_usage) && (
                              <tr css={tr}>
                                <th css={thScroll}>評価関連経費の使用方法</th>
                                <td></td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan &&
                                    strapiEvaluationPlan.mid_expenses_usage}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan &&
                                    strapiEvaluationPlan.after_expenses_usage}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            (strapiEvaluationPlan.mid_improving_mh ||
                              strapiEvaluationPlan.after_improving_mh) && (
                              <tr css={tr}>
                                <th css={thScroll}>
                                  評価関連経費を使用することで、どのように評価の質を上げることを目指しますか
                                </th>
                                <td></td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan &&
                                    strapiEvaluationPlan.mid_improving_mh}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan &&
                                    strapiEvaluationPlan.after_improving_mh}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.prior_comm_expenses && (
                              <tr css={tr}>
                                <th css={thScroll}>内) 外部委託費</th>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.prior_comm_expenses &&
                                    strapiEvaluationPlan.prior_comm_expenses}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.mid_comm_expenses &&
                                    strapiEvaluationPlan.mid_comm_expenses}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.after_comm_expenses &&
                                    strapiEvaluationPlan.after_comm_expenses}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.prior_consign_detail && (
                              <tr css={tr}>
                                <th css={thScroll}>外部委託内容</th>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.prior_consign_detail &&
                                    strapiEvaluationPlan.prior_consign_detail}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.mid_consign_detail &&
                                    strapiEvaluationPlan.mid_consign_detail}
                                </td>
                                <td css={tdScroll}>
                                  {strapiEvaluationPlan.after_consign_detail &&
                                    strapiEvaluationPlan.after_consign_detail}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.other_title_1 && (
                              <tr css={tr}>
                                <th css={thScroll}>タイトル1</th>
                                <td css={tdScroll} colSpan={3}>
                                  {strapiEvaluationPlan.other_title_1}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.other_content_1 && (
                              <tr css={tr}>
                                <th css={thScroll}>内容1</th>
                                <td css={tdScroll} colSpan={3}>
                                  {strapiEvaluationPlan.other_content_1}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.other_title_2 && (
                              <tr css={tr}>
                                <th css={thScroll}>タイトル2</th>
                                <td css={tdScroll} colSpan={3}>
                                  {strapiEvaluationPlan.other_title_2}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.other_content_2 && (
                              <tr css={tr}>
                                <th css={thScroll}>内容2</th>
                                <td css={tdScroll} colSpan={3}>
                                  {strapiEvaluationPlan.other_content_2}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.other_title_3 && (
                              <tr css={tr}>
                                <th css={thScroll}>タイトル3</th>
                                <td css={tdScroll} colSpan={3}>
                                  {strapiEvaluationPlan.other_title_3}
                                </td>
                              </tr>
                            )}
                          {strapiEvaluationPlan &&
                            strapiEvaluationPlan.other_content_3 && (
                              <tr css={tr}>
                                <th css={thScroll}>内容3</th>
                                <td css={tdScroll} colSpan={3}>
                                  {strapiEvaluationPlan.other_content_3}
                                </td>
                              </tr>
                            )}
                        </tbody>
                      </table>
                    </div>
                  </DetailItemWrapper>
                </div>
                <div id="">
                  {evaluationTable.length !== 0 && (
                    <DetailItemWrapper itemName="評価表">
                      <div tw="lg:overflow-scroll">
                        <table css={table} tw="lg:w-[780px]">
                          {evaluationTable.map((item: any, i: number) => (
                            <tbody key={"evaluationTable" + i}>
                              <tr>
                                <th css={th2Sub} rowSpan={9}>
                                  {i + 1}
                                </th>
                                <th css={th}>評価の要素</th>
                                <td css={td}>
                                  {
                                    evaluationFactorArray.find(
                                      (ef) => ef.code === item.node.eval_factors
                                    )?.label
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th css={th}>評価項目</th>
                                <td css={td}>{item.node.eval_item}</td>
                              </tr>
                              <tr>
                                <th css={th}>評価小項目</th>
                                <td css={td}>{item.node.eval_sub_item}</td>
                              </tr>
                              <tr>
                                <th css={th}>評価基準・判断方法（指標など）</th>
                                <td css={td}>{item.node.criteria_method}</td>
                              </tr>
                              <tr>
                                <th css={th}>
                                  評価基準・判断基準値（目標値/状態など）
                                </th>
                                <td css={td}>{item.node.criteria_st_value}</td>
                              </tr>
                              <tr>
                                <th css={th}>測定方法・必要なデータ</th>
                                <td css={td}>
                                  {
                                    evaluationRequiredArray.find(
                                      (er) =>
                                        er.code === item.node.mm_required_data
                                    )?.label
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th css={th}>測定方法・情報源</th>
                                <td css={td}>{item.node.mm_if_source}</td>
                              </tr>
                              <tr>
                                <th css={th}>測定方法・データ収集方法</th>
                                <td css={td}>
                                  {
                                    evaluationMethodArray.find(
                                      (em) =>
                                        em.code === item.node.mm_col_method
                                    )?.label
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th css={th}>評価時期</th>
                                <td css={td}>
                                  {
                                    evaluationSeasonArray.find(
                                      (es) => es.code === item.node.eval_season
                                    )?.label
                                  }
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      </div>
                    </DetailItemWrapper>
                  )}
                </div>
                <div id="">
                  {shortOutcome.length !== 0 && (
                    <DetailItemWrapper itemName="短期アウトカム">
                      <div>
                        <EvaluationShortOutcome data={shortOutcome} />
                      </div>
                    </DetailItemWrapper>
                  )}
                </div>
                <div id="">
                  {outputFinance.length !== 0 && (
                    <DetailItemWrapper itemName="アウトプット (資金支援)">
                      <div>
                        <EvaluationShortOutcome data={outputFinance} />
                      </div>
                    </DetailItemWrapper>
                  )}
                </div>
                <div id="">
                  {outputNonFinance.length !== 0 && (
                    <DetailItemWrapper itemName="アウトプット (非資金的支援)">
                      <div>
                        <EvaluationShortOutcome data={outputNonFinance} />
                      </div>
                    </DetailItemWrapper>
                  )}
                </div>
                <div id="">
                  {outputAdo.length !== 0 && (
                    <DetailItemWrapper itemName="アウトプット (ADO)">
                      <div>
                        <EvaluationShortOutcome data={outputAdo} />
                      </div>
                    </DetailItemWrapper>
                  )}
                </div>
                {(strapiEvaluationPlan.biz_design_chk_list1 ||
                  strapiEvaluationPlan.biz_design_chk_list2 ||
                  strapiEvaluationPlan.biz_design_chk_list3 ||
                  strapiEvaluationPlan.biz_design_chk_list4 ||
                  strapiEvaluationPlan.biz_design_chk_list5) && (
                  <div id="">
                    <DetailItemWrapper itemName="事業設計図作成のためのチェックリスト">
                      <div>
                        <table css={table}>
                          <tr>
                            <th css={thForCircle}>
                              採択後の実行団体の事業計画を反映した
                            </th>
                            <td css={td}>
                              {strapiEvaluationPlan.biz_design_chk_list1 === "1"
                                ? "○"
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <th css={thForCircle}>
                              資金分配団体の活動(伴走支援)を実行団体の状況やニーズを踏まえて検討・更新した
                            </th>
                            <td css={td}>
                              {strapiEvaluationPlan.biz_design_chk_list2 === "1"
                                ? "○"
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <th css={thForCircle}>
                              活動が今回の事業実行を通じた目標に繋がっていることを確認した
                            </th>
                            <td css={td}>
                              {strapiEvaluationPlan.biz_design_chk_list3 === "1"
                                ? "○"
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <th css={thForCircle}>
                              作成した事業設計図を最終受益者に見せた
                            </th>
                            <td css={td}>
                              {strapiEvaluationPlan.biz_design_chk_list4 === "1"
                                ? "○"
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <th css={thForCircle}>
                              改めて最終受益者の声を聞き課題やニーズを確認した
                            </th>
                            <td css={td}>
                              {strapiEvaluationPlan.biz_design_chk_list5 === "1"
                                ? "○"
                                : ""}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </DetailItemWrapper>
                  </div>
                )}
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
            </div>
          )}
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
      biz_design_chk_list1
      biz_design_chk_list2
      biz_design_chk_list3
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
    evaluationPlanManualFDO: strapiEvaluationPlanManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      data {
        url
      }
    }
    evaluationPlanManualADO: strapiEvaluationPlanManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      data {
        url
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
