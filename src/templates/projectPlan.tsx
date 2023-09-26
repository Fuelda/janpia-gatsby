import { graphql } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import { detailAnchor, detailBody, detailFlex } from "../styles/detailPage";
import DetailSidebar from "../components/organisms/DetailSidebar";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailAnchor from "../components/atoms/DetailAnchor";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import {
  table,
  td,
  td3col,
  tdLshape,
  tdLshapeWrapper,
  th,
  th1,
  th1_2,
  th2,
  th2Sub,
  th2Sub_2,
  th2_2,
  thLshape,
  thLshapeSub,
  thead,
  theadLshape,
  tr,
  trLshape,
} from "../styles/table";
import { sdgsGoalArray } from "../features/search/store/filterContents";
import { formatDate } from "../util/formatDate";
import "twin.macro";
import { hCenter } from "../styles/base";

const ProjectPlan: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const {
    strapiBizPlan,
    allStrapiBizPlanSub,
    strapiBizPlanManualFDO,
    strapiBizPlanManualADO,
  } = data;
  const bizPlanManual = strapiBizPlanManualFDO || strapiBizPlanManualADO;

  const encodeUrl = bizPlanManual && bizPlanManual.data.url;
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeUrl}&embedded=true`;

  const bizPlanSubSdgs =
    allStrapiBizPlanSub.edges.length !== 0 &&
    allStrapiBizPlanSub.edges
      .filter((bps: any) => bps.node.info_type === "50")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const shortOutcomeFinance =
    allStrapiBizPlanSub.edges.length !== 0 &&
    allStrapiBizPlanSub.edges
      .filter((bps: any) => bps.node.info_type === "11")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const shortOutcomeNonFinance =
    allStrapiBizPlanSub.edges.length !== 0 &&
    allStrapiBizPlanSub.edges
      .filter((bps: any) => bps.node.info_type === "12")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const shortOutcomeAdo =
    allStrapiBizPlanSub.edges.length !== 0 &&
    allStrapiBizPlanSub.edges
      .filter((bps: any) => bps.node.info_type === "13")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const shortOutcomeCovid =
    allStrapiBizPlanSub.edges.length !== 0 &&
    allStrapiBizPlanSub.edges
      .filter((bps: any) => bps.node.info_type === "14")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const outputFinance =
    allStrapiBizPlanSub.edges.length !== 0 &&
    allStrapiBizPlanSub.edges
      .filter((bps: any) => bps.node.info_type === "21")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const outputNonFinance =
    allStrapiBizPlanSub.edges.length !== 0 &&
    allStrapiBizPlanSub.edges
      .filter((bps: any) => bps.node.info_type === "22")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const outputAdo =
    allStrapiBizPlanSub.edges.length !== 0 &&
    allStrapiBizPlanSub.edges
      .filter((bps: any) => bps.node.info_type === "23")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);

  console.log(data);
  console.log(shortOutcomeFinance);

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex} tw="relative">
        <DetailSidebar slug={slug} />
        <DetailWrapper category="事業計画">
          {strapiBizPlan && (
            <div>
              <div css={detailAnchor}>
                <DetailAnchor
                  title="優先的に解決すべき社会課題の諸課題"
                  anchor={`/result/${slug}/project-plan/#firstItem`}
                />
                <DetailAnchor
                  title="SDGsとの関連"
                  anchor={`/result/${slug}/project-plan/#secondItem`}
                />
                <DetailAnchor
                  title="団体の社会的役割"
                  anchor={`/result/${slug}/project-plan/#thirdItem`}
                />
                <DetailAnchor
                  title="概要"
                  anchor={`/result/${slug}/project-plan/#fourthItem`}
                />
                <DetailAnchor
                  title="事業の背景・課題"
                  anchor={`/result/${slug}/project-plan/#fifthItem`}
                />
                <DetailAnchor
                  title="事業設計"
                  anchor={`/result/${slug}/project-plan/#sixthItem`}
                />
                <DetailAnchor
                  title="事業活動"
                  anchor={`/result/${slug}/project-plan/#seventhItem`}
                />
                <DetailAnchor
                  title="インプット"
                  anchor={`/result/${slug}/project-plan/#eighthItem`}
                />
                <DetailAnchor
                  title="広報戦略および連携・対話戦略"
                  anchor={`/result/${slug}/project-plan/#ninthItem`}
                />
                <DetailAnchor
                  title="出口戦略・持続可能性について"
                  anchor={`/result/${slug}/project-plan/#tenthItem`}
                />
                <DetailAnchor
                  title="関連する主な実績"
                  anchor={`/result/${slug}/project-plan/#eleventhItem`}
                />
              </div>
              <div css={detailBody}>
                <div id="firstItem">
                  <DetailItemWrapper itemName="優先的に解決すべき社会の諸課題">
                    <p css={theadLshape}>領域 / 分野</p>
                    {(strapiBizPlan.field1_1 === "1" ||
                      strapiBizPlan.field1_2 === "1" ||
                      strapiBizPlan.field1_3 === "1") && (
                      <div css={table}>
                        <p css={thLshape}>子ども及び若者の支援に係る活動</p>
                        <div css={trLshape}>
                          <div css={thLshapeSub} />
                          <div css={tdLshapeWrapper}>
                            {strapiBizPlan.field1_1 === "1" && (
                              <p css={tdLshape}>
                                経済的困窮など、家庭内に課題を抱える子どもの支援
                              </p>
                            )}
                            {strapiBizPlan.field1_2 === "1" && (
                              <p css={tdLshape}>
                                日常生活や成長に困難を抱える子どもと若者の育成支援
                              </p>
                            )}
                            {strapiBizPlan.field1_3 === "1" && (
                              <p css={tdLshape}>
                                社会的課題の解決を担う若者の能力開発支援
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {(strapiBizPlan.field2_4 === "1" ||
                      strapiBizPlan.field2_5 === "1" ||
                      strapiBizPlan.field2_6 === "1") && (
                      <div css={table}>
                        <p css={thLshape}>
                          日常生活又は社会生活を営む上での困難を有する者の支援に係る活動
                        </p>
                        <div css={trLshape}>
                          <div css={thLshapeSub} />
                          <div css={tdLshapeWrapper}>
                            {strapiBizPlan.field2_4 === "1" && (
                              <p css={tdLshape}>働くことが困難な人への支援</p>
                            )}
                            {strapiBizPlan.field2_5 === "1" && (
                              <p css={tdLshape}>
                                孤独・孤立や社会的差別の解消に向けた支援
                              </p>
                            )}
                            {strapiBizPlan.field2_6 === "1" && (
                              <p css={tdLshape}>女性の経済的自立への支援</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {(strapiBizPlan.field3_8 === "1" ||
                      strapiBizPlan.field3_9 === "1") && (
                      <div css={table}>
                        <p css={thLshape}>
                          地域社会における活力の低下その他の社会的に困難な状況に直面している地域の支援に関する活動
                        </p>
                        <div css={trLshape}>
                          <div css={thLshapeSub} />
                          <div css={tdLshapeWrapper}>
                            {strapiBizPlan.field3_8 === "1" && (
                              <p css={tdLshape}>
                                地域の働く場づくりや地域活性化などの課題解決に向けた取組の支援
                              </p>
                            )}
                            {strapiBizPlan.field3_9 === "1" && (
                              <p css={tdLshape}>
                                安心・安全に暮らせるコミュニティづくりへの支援
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {strapiBizPlan.other_problem === "1" && (
                      <div css={table}>
                        <p css={thLshape}>その他の解決すべき社会の課題</p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              strapiBizPlan.field_other_problem.data
                                .childMarkdownRemark.html,
                          }}
                          css={tdLshape}
                        />
                      </div>
                    )}
                  </DetailItemWrapper>
                </div>
                <div id="secondItem">
                  <DetailItemWrapper itemName="SDGsとの関連">
                    <table css={table}>
                      <thead css={thead}>
                        <tr css={tr}>
                          <th css={th}>ゴール</th>
                          <td css={td}>ターゲット</td>
                          <td css={td}>関連性の説明</td>
                        </tr>
                      </thead>
                      <tbody>
                        {bizPlanSubSdgs &&
                          bizPlanSubSdgs.map((sdgs: any) => (
                            <tr key={sdgs}>
                              <th css={td}>
                                {
                                  sdgsGoalArray.find(
                                    (sg) => sg.code === sdgs.node.sdgs_goal
                                  )?.label
                                }
                              </th>
                              <td css={td3col}>{sdgs.node.sdgs_target}</td>
                              <td css={td3col}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      sdgs.node.sdgs_description.data
                                        .childMarkdownRemark.html,
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="thirdItem">
                  <DetailItemWrapper itemName="団体の社会的役割">
                    <table css={table}>
                      <tbody>
                        <tr css={tr}>
                          <th css={th}>団体の役割</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.vision.data.childMarkdownRemark
                                    .html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>団体の概要・活動・業務</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.mission.data.childMarkdownRemark
                                    .html,
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="fourthItem">
                  <DetailItemWrapper itemName="概要">
                    <table css={table}>
                      <tbody>
                        <tr css={tr}>
                          <th css={th}>事業概要</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.business_overview.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>事業期間</th>
                          <td tw="flex">
                            <p css={td} tw="w-1/2">
                              開始日{" "}
                              {formatDate(strapiBizPlan.business_period_s)}
                            </p>
                            <p css={td} tw="w-1/2">
                              終了日{" "}
                              {formatDate(strapiBizPlan.business_period_e)}
                            </p>
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>対象地域</th>
                          <td css={td}>{strapiBizPlan.target_area}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table css={table}>
                      <tbody>
                        <tr css={tr}>
                          <th css={th1_2} colSpan={2}>
                            直接的対象グループ
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.direct_target_grp.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th2Sub_2} rowSpan={1}></th>
                          <th css={th2_2}>人数</th>
                          <td css={[td, hCenter]}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.direct_target_cnt.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                            名
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th1_2} colSpan={2}>
                            最終受益者
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.beneficiary.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th2Sub_2} rowSpan={1}></th>
                          <th css={th2_2}>人数</th>
                          <td css={[td, hCenter]}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.beneficiary_cnt.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                            名
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table css={table}>
                      <tbody>
                        <tr css={tr}>
                          <th css={th}>
                            事業対象者（助成で見込む最終受益者）・内容
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.business_target_fdo.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>
                            事業対象者（事業で直接介入する対象者と、その他最終受益者を含む）・
                            内容
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.business_target_ado.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>
                            本事業における、不動産（土地・建物）購入の有無
                          </th>
                          <td css={td}>
                            {strapiBizPlan.buy_real_estate === "1"
                              ? "あり"
                              : "なし"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="fifthItem">
                  <DetailItemWrapper itemName="事業の背景・課題">
                    <table css={table}>
                      <tbody>
                        <tr css={tr}>
                          <th css={th}>社会課題</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.social_issues.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>
                            課題に対する行政等による既存の取組み状況
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.task_administration.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>課題に対する申請団体の既存の取組状況</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.task_request_account.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>
                            休眠預金等交付金に係わる資金の活用により本事業を実施する意義
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.significance.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="sixthItem">
                  <DetailItemWrapper itemName="事業設計">
                    <div css={detailAnchor}>
                      <DetailAnchor
                        title="中長期アウトカム"
                        anchor={`/result/${slug}/project-plan/#six-firstItem`}
                      />
                      <DetailAnchor
                        title="短期アウトカム"
                        anchor={`/result/${slug}/project-plan/#six-secondItem`}
                      />
                      <DetailAnchor
                        title="アウトプット"
                        anchor={`/result/${slug}/project-plan/#six-thirdItem`}
                      />
                    </div>
                  </DetailItemWrapper>
                  <div css={detailBody}>
                    <div id="six-firstItem">
                      <DetailItemWrapper itemName="中期アウトカム">
                        <div css={td}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                strapiBizPlan.midterm_biz_goals.data
                                  .childMarkdownRemark.html,
                            }}
                          />
                        </div>
                      </DetailItemWrapper>
                    </div>
                    {strapiBizPlan.business_org_type && (
                      <div css={detailBody}>
                        <div id="six-secondItem">
                          <DetailItemWrapper itemName="短期アウトカム (資金支援)">
                            <table css={table}>
                              {shortOutcomeFinance.map(
                                (item: any, i: number) => (
                                  <tbody key={item}>
                                    <tr>
                                      <th css={th2Sub} rowSpan={6}>
                                        {i}
                                      </th>
                                      <td css={td} colSpan={2}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.business_goals.data
                                                .childMarkdownRemark.html,
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr}>
                                      <th css={th}>モニタリング</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_monitoring.data
                                                .childMarkdownRemark.html,
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr}>
                                      <th css={th}>初期値/初期状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_initial.data
                                                .childMarkdownRemark.html,
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr}>
                                      <th css={th}>中間評価時の値/状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_mid_eval.data
                                                .childMarkdownRemark.html,
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr}>
                                      <th css={th}>事後評価時の値/状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_aft_eval.data
                                                .childMarkdownRemark.html,
                                          }}
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                )
                              )}
                            </table>
                          </DetailItemWrapper>
                          <DetailItemWrapper itemName="短期アウトカム (非資金支援)">
                            <table css={table}>
                              {shortOutcomeNonFinance.map(
                                (item: any, i: number) => (
                                  <tbody key={item}>
                                    <tr>
                                      <th css={th2Sub} rowSpan={6}>
                                        {i}
                                      </th>
                                      <td css={td} colSpan={2}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.business_goals.data
                                                .childMarkdownRemark.html,
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr}>
                                      <th css={th}>モニタリング</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_monitoring.data
                                                .childMarkdownRemark.html,
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr}>
                                      <th css={th}>初期値/初期状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_initial.data
                                                .childMarkdownRemark.html,
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr}>
                                      <th css={th}>中間評価時の値/状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_mid_eval.data
                                                .childMarkdownRemark.html,
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr}>
                                      <th css={th}>事後評価時の値/状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_aft_eval.data
                                                .childMarkdownRemark.html,
                                          }}
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                )
                              )}
                            </table>
                          </DetailItemWrapper>
                        </div>
                        <div id="six-thirdItem" css={detailBody}>
                          <DetailItemWrapper itemName="アウトプット (資金支援)">
                            <table css={table}>
                              {outputFinance.map((item: any, i: number) => (
                                <tbody key={item}>
                                  <tr>
                                    <th css={th2Sub} rowSpan={6}>
                                      {i}
                                    </th>
                                    <td css={td} colSpan={2}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output.data
                                              .childMarkdownRemark.html,
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr}>
                                    <th css={th}>モニタリング</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_monitor.data
                                              .childMarkdownRemark.html,
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr}>
                                    <th css={th}>初期値/初期状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_initial.data
                                              .childMarkdownRemark.html,
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr}>
                                    <th css={th}>中間評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_mid_eval.data
                                              .childMarkdownRemark.html,
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr}>
                                    <th css={th}>事後評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_aft_eval.data
                                              .childMarkdownRemark.html,
                                        }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </DetailItemWrapper>
                          <DetailItemWrapper itemName="アウトプット (非資金支援)">
                            <table css={table}>
                              {outputNonFinance.map((item: any, i: number) => (
                                <tbody key={item}>
                                  <tr>
                                    <th css={th2Sub} rowSpan={6}>
                                      {i}
                                    </th>
                                    <td css={td} colSpan={2}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output.data
                                              .childMarkdownRemark.html,
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr}>
                                    <th css={th}>モニタリング</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_monitor.data
                                              .childMarkdownRemark.html,
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr}>
                                    <th css={th}>初期値/初期状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_initial.data
                                              .childMarkdownRemark.html,
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr}>
                                    <th css={th}>中間評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_mid_eval.data
                                              .childMarkdownRemark.html,
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr}>
                                    <th css={th}>事後評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_aft_eval.data
                                              .childMarkdownRemark.html,
                                        }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </DetailItemWrapper>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div id="seventhItem">
                  <DetailItemWrapper itemName="事業活動">
                    <table css={table}>
                      <tbody>
                        <tr css={tr}>
                          <th css={th1_2} colSpan={2}>
                            0年目
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.activity_0.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th2Sub_2} rowSpan={1}></th>
                          <th css={th2_2}>活動時期</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.activity_season_0.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th1_2} colSpan={2}>
                            1年目
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.activity_1.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th2Sub_2} rowSpan={1}></th>
                          <th css={th2_2}>活動時期</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.activity_season_1.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th1_2} colSpan={2}>
                            2年目
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.activity_2.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th2Sub_2} rowSpan={1}></th>
                          <th css={th2_2}>活動時期</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.activity_season_2.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th1_2} colSpan={2}>
                            3年目
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.activity_3.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th2Sub_2} rowSpan={1}></th>
                          <th css={th2_2}>活動時期</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.activity_season_3.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="eighthItem">
                  <DetailItemWrapper itemName="インプット">
                    <table css={table}>
                      <tbody>
                        <tr css={tr}>
                          <th css={th}>総事業費</th>
                          <td css={td}>
                            {strapiBizPlan.total_business_cost}円
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>人材</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.human_resources.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>資機材</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.equipment.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>その他</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.etc_resources.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="ninthItem">
                  <DetailItemWrapper itemName="広報戦略および連携・対話戦略">
                    <table css={table}>
                      <tbody>
                        <tr css={tr}>
                          <th css={th}>広報戦略</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.pr_strategy.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>連携・対話戦略</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.dialogue_strategy.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="tenthItem">
                  <DetailItemWrapper itemName="出口戦略・持続可能性について">
                    <table css={table}>
                      <tbody>
                        <tr css={tr}>
                          <th css={th}>持続可能性１</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.sustainability1.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>持続可能性2</th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.sustainability2.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="eleventhItem">
                  <DetailItemWrapper itemName="助成事業の実績と成果">
                    <table css={table}>
                      <tbody>
                        <tr css={tr}>
                          <th css={th}>
                            事業対象者（助成で見込む最終受益者）・内容
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.subsidy_actual.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                        <tr css={tr}>
                          <th css={th}>
                            申請事業に関連する調査研究、連携、マッチング、伴走支援の実績、事業事例等
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.org_strength.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>

                {/* お手本 */}
                <div id="fifthItem">
                  <DetailItemWrapper itemName="事業の背景・課題">
                    <table css={table}>
                      <tbody>
                        <tr css={tr}>
                          <th css={th}>
                            事業対象者（助成で見込む最終受益者）・内容
                          </th>
                          <td css={td}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.business_target_fdo.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
              </div>
            </div>
          )}
          {bizPlanManual && googleDocsViewerUrl && (
            <div>
              <iframe
                width="100%"
                height="500px"
                src={googleDocsViewerUrl}
              ></iframe>
            </div>
          )}
        </DetailWrapper>
      </div>
    </Layout>
  );
};

export default ProjectPlan;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiBizPlanManualFDO: strapiBizPlanManual(
      biz_cd_fund_distr: { eq: $slug }
    ) {
      data {
        url
      }
    }
    strapiBizPlanManualADO: strapiBizPlanManual(
      biz_cd_executive: { eq: $slug }
    ) {
      data {
        url
      }
    }
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
      buy_real_estate
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
      total_business_cost
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
