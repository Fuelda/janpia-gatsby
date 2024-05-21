import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import { detailAnchor, detailBody, detailFlex } from "../styles/detailPage";
import DetailSidebar from "../components/organisms/DetailSidebar";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailAnchor from "../components/atoms/DetailAnchor";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import {
  table,
  tableScroll,
  td,
  td3col,
  tdLshape,
  tdLshapeWrapper,
  tdScroll,
  th,
  th1_2,
  th2Sub,
  th2Sub_2,
  th2_2,
  thLshape,
  thLshapeSub,
  thScroll,
  thead,
  theadLshape,
  tr,
  trLshape,
} from "../styles/table";
import { sdgsGoalArray } from "../features/search/store/filterContents";
import { formatDate } from "../util/formatDate";
import "twin.macro";
import Seo from "../components/lauout/Seo";
import { useDetailContext } from "../context/detailContext";

const ProjectPlan: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const {
    strapiBizPlan,
    allStrapiBizPlanSub,
    strapiBizPlanManualFDO,
    strapiBizPlanManualADO,
    //サイドバーチェック用
    strapiFinancePlanFDO,
    strapiFinancePlanADO,
    strapiFinancePlanFormerFDO,
    strapiFinancePlanFormerADO,
    strapiFinancePlanManualFDO,
    strapiFinancePlanManualADO,
    strapiEvaluationPlan,
    strapiEvaluationPlanManualFDO,
    strapiEvaluationPlanManualADO,
    strapiOfferingReportManualFDO,
    strapiPreReportManualFDO,
    strapiPreReportManualADO,
    strapiMidReportManualFDO,
    strapiMidReportManualADO,
    strapiPostReportManualFDO,
    strapiPostReportManualADO,
    strapiProgressReportManualFDO,
    strapiProgressReportManualADO,
    strapiCompleteReportManualFDO,
    strapiCompleteReportManualADO,
    strapiSettleReportFDO,
    strapiSettleReportADO,
    strapiSettleReportManualFDO,
    strapiSettleReportManualADO,
  } = data;
  const {
    setWithFinance,
    setWithEval,
    setWithORM,
    setWithPreRM,
    setWithMRM,
    setWithPostRM,
    setWithProRM,
    setWithCRM,
    setWithSR,
  } = useDetailContext();

  const bizPlanManual = strapiBizPlanManualFDO || strapiBizPlanManualADO;

  const pdfUrl = bizPlanManual && bizPlanManual.data && bizPlanManual.data.url;
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`;

  const bizPlanSubSdgs =
    allStrapiBizPlanSub.edges.length !== 0 &&
    allStrapiBizPlanSub.edges
      .filter((bps: any) => bps.node.info_type === "50")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const shortOutcomeFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "11")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const shortOutcomeNonFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "12")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const shortOutcomeAdo =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "13")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const shortOutcomeCovid =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "14")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const outputFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "21")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const outputNonFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "22")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const outputAdo =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "23")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const activityFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "31")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const activityNonFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "32")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  const activityAdo =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "33")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];

  useEffect(() => {
    setWithFinance(
      strapiFinancePlanFDO ||
        strapiFinancePlanADO ||
        strapiFinancePlanFormerFDO ||
        strapiFinancePlanFormerADO ||
        strapiFinancePlanManualFDO ||
        strapiFinancePlanManualADO
    );
    setWithEval(
      strapiEvaluationPlan ||
        strapiEvaluationPlanManualFDO ||
        strapiEvaluationPlanManualADO
    );
    setWithORM(strapiOfferingReportManualFDO);
    setWithPreRM(strapiPreReportManualFDO || strapiPreReportManualADO);
    setWithMRM(strapiMidReportManualFDO || strapiMidReportManualADO);
    setWithPostRM(strapiPostReportManualFDO || strapiPostReportManualADO);
    setWithProRM(
      strapiProgressReportManualFDO || strapiProgressReportManualADO
    );
    setWithCRM(strapiCompleteReportManualFDO || strapiCompleteReportManualADO);
    setWithSR(
      strapiSettleReportFDO ||
        strapiSettleReportADO ||
        strapiSettleReportManualFDO ||
        strapiSettleReportManualADO
    );
  }, []);

  return (
    <Layout>
      <Seo title="事業計画 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <div css={detailFlex} tw="relative">
        <DetailSidebar slug={slug} />
        <DetailWrapper
          category="事業計画"
          slug={slug}
          updatedAt={
            strapiBizPlan ? strapiBizPlan.updatedAt : bizPlanManual.updatedAt
          }
        >
          {strapiBizPlan && (
            <div>
              <div css={detailAnchor}>
                <DetailAnchor
                  title="優先的に解決すべき社会課題の諸課題"
                  anchor={`/result/${slug}/project-plan/#firstItem`}
                />
                {bizPlanSubSdgs.length !== 0 && (
                  <DetailAnchor
                    title="SDGsとの関連"
                    anchor={`/result/${slug}/project-plan/#secondItem`}
                  />
                )}
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
                    {(strapiBizPlan.field3_7 === "1" ||
                      strapiBizPlan.field3_8 === "1" ||
                      strapiBizPlan.field3_9 === "1") && (
                      <div css={table}>
                        <p css={thLshape}>
                          地域社会における活力の低下その他の社会的に困難な状況に直面している地域の支援に関する活動
                        </p>
                        <div css={trLshape}>
                          <div css={thLshapeSub} />
                          <div css={tdLshapeWrapper}>
                            {strapiBizPlan.field3_7 === "1" && (
                              <p css={tdLshape}>
                                地域の働く場づくりや地域活性化などの課題解決に向けた取組の支援
                              </p>
                            )}
                            {strapiBizPlan.field3_8 === "1" && (
                              <p css={tdLshape}>
                                安心・安全に暮らせるコミュニティづくりへの支援
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {strapiBizPlan.region4 === "1" && (
                      <div css={table}>
                        <p css={thLshape}>その他</p>
                        <div css={trLshape}>
                          <div css={thLshapeSub} />
                          <div css={tdLshapeWrapper}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiBizPlan.field_other.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                              css={tdLshape}
                            />
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
                              strapiBizPlan.field_other_problem.data.childMarkdownRemark.html.replace(
                                /\n/g,
                                "<br />"
                              ),
                          }}
                          css={tdLshape}
                        />
                      </div>
                    )}
                  </DetailItemWrapper>
                </div>
                {bizPlanSubSdgs.length !== 0 && (
                  <div id="secondItem">
                    <DetailItemWrapper itemName="SDGsとの関連">
                      <div tw="overflow-scroll">
                        <table css={[table, tableScroll]}>
                          <thead css={thead}>
                            <tr css={tr}>
                              <th css={thScroll}>ゴール</th>
                              <td css={tdScroll}>ターゲット</td>
                              <td css={tdScroll}>関連性の説明</td>
                            </tr>
                          </thead>
                          <tbody>
                            {bizPlanSubSdgs &&
                              bizPlanSubSdgs.map((sdgs: any) => (
                                <tr key={sdgs}>
                                  <th css={tdScroll}>
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
                                          sdgs.node.sdgs_description.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </DetailItemWrapper>
                  </div>
                )}
                <div id="thirdItem">
                  <DetailItemWrapper itemName="団体の社会的役割">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.vision &&
                        strapiBizPlan.vision.data.childMarkdownRemark.html !==
                          "" && (
                          <div>
                            <p css={th}>団体の目的</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.vision.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.mission &&
                        strapiBizPlan.mission.data.childMarkdownRemark.html !==
                          "" && (
                          <div>
                            <p css={th}>団体の概要・活動・業務</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.mission.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.vision &&
                          strapiBizPlan.vision.data.childMarkdownRemark.html !==
                            "" && (
                            <tr css={tr}>
                              <th css={th}>団体の目的</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.vision.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.mission &&
                          strapiBizPlan.mission.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th}>団体の概要・活動・業務</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.mission.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="fourthItem">
                  <DetailItemWrapper itemName="概要">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.business_overview &&
                        strapiBizPlan.business_overview.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>事業概要</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.business_overview.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.funding_conclusion_d && (
                        <div>
                          <p css={th}>資金提供契約締結日</p>
                          <p css={td}>
                            {formatDate(strapiBizPlan.funding_conclusion_d)}
                          </p>
                        </div>
                      )}
                      {strapiBizPlan.business_period_s && (
                        <div>
                          <p css={th}>事業期間</p>
                          <div tw="flex w-full">
                            <p tw="bg-blue-base border border-gray-border text-sm w-24 py-2 px-2">
                              開始日{" "}
                            </p>
                            <p css={td} tw="text-sm">
                              {formatDate(strapiBizPlan.business_period_s)}
                            </p>
                          </div>
                          <div tw="flex w-full">
                            <p tw="bg-blue-base border border-gray-border text-sm w-24 py-2 px-2">
                              終了日{" "}
                            </p>
                            <p css={td} tw="text-sm">
                              {formatDate(strapiBizPlan.business_period_e)}
                            </p>
                          </div>
                        </div>
                      )}
                      {strapiBizPlan.target_area && (
                        <div>
                          <p css={th}>対象地域</p>
                          <p css={td}>{strapiBizPlan.target_area}</p>
                        </div>
                      )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.business_overview &&
                          strapiBizPlan.business_overview.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>事業概要</th>
                              <td colSpan={2} css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.business_overview.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.funding_conclusion_d && (
                          <tr css={tr}>
                            <th css={th}>資金提供契約締結日</th>
                            <td colSpan={2} css={td}>
                              {formatDate(strapiBizPlan.funding_conclusion_d)}
                            </td>
                          </tr>
                        )}
                        {strapiBizPlan.business_period_s && (
                          <tr css={tr}>
                            <th css={th}>事業期間</th>
                            <td css={td}>
                              開始日{" "}
                              {formatDate(strapiBizPlan.business_period_s)}
                            </td>
                            <td css={td}>
                              終了日{" "}
                              {formatDate(strapiBizPlan.business_period_e)}
                            </td>
                          </tr>
                        )}
                        {strapiBizPlan.target_area && (
                          <tr css={tr}>
                            <th css={th}>対象地域</th>
                            <td css={td} colSpan={2}>
                              {strapiBizPlan.target_area}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div tw="hidden lg:block">
                      {strapiBizPlan.direct_target_grp &&
                        strapiBizPlan.direct_target_grp.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th1_2}>直接的対象グループ</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.direct_target_grp.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.direct_target_cnt &&
                        strapiBizPlan.direct_target_cnt.data.childMarkdownRemark
                          .html !== "" && (
                          <div tw="flex w-full">
                            <p css={th2_2}>人数</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.direct_target_cnt.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.indirect_target_grp &&
                        strapiBizPlan.indirect_target_grp.data
                          .childMarkdownRemark.html !== "" && (
                          <div>
                            <p css={th1_2}>間接的対象グループ</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.indirect_target_grp.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.indirect_target_cnt &&
                        strapiBizPlan.indirect_target_cnt.data
                          .childMarkdownRemark.html !== "" && (
                          <div tw="flex w-full">
                            <p css={th2_2}>人数</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.indirect_target_cnt.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.beneficiary &&
                        strapiBizPlan.beneficiary.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th1_2}>最終受益者</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.beneficiary.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.beneficiary_cnt &&
                        strapiBizPlan.beneficiary_cnt.data.childMarkdownRemark
                          .html !== "" && (
                          <div tw="flex w-full">
                            <p css={th2_2}>人数</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.beneficiary_cnt.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.direct_target_grp &&
                          strapiBizPlan.direct_target_grp.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th1_2} colSpan={2}>
                                直接的対象グループ
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.direct_target_grp.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.direct_target_cnt &&
                          strapiBizPlan.direct_target_cnt.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th2Sub_2} rowSpan={1}></th>
                              <th css={th2_2}>人数</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.direct_target_cnt.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.indirect_target_grp &&
                          strapiBizPlan.indirect_target_grp.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th1_2} colSpan={2}>
                                間接的対象グループ
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.indirect_target_grp.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.indirect_target_cnt &&
                          strapiBizPlan.indirect_target_cnt.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th2Sub_2} rowSpan={1}></th>
                              <th css={th2_2}>人数</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.indirect_target_cnt.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.beneficiary &&
                          strapiBizPlan.beneficiary.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th1_2} colSpan={2}>
                                最終受益者
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.beneficiary.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.beneficiary_cnt &&
                          strapiBizPlan.beneficiary_cnt.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th2Sub_2} rowSpan={1}></th>
                              <th css={th2_2}>人数</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.beneficiary_cnt.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                    <div tw="hidden lg:block">
                      {strapiBizPlan.business_target_fdo &&
                        strapiBizPlan.business_target_fdo.data
                          .childMarkdownRemark.html !== "" && (
                          <div>
                            <p css={th}>
                              事業対象者（助成で見込む最終受益者）・内容
                            </p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.business_target_fdo.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.business_target_fcnt &&
                        strapiBizPlan.business_target_fcnt.data
                          .childMarkdownRemark.html !== "" && (
                          <div>
                            <p css={th}>
                              事業対象者（助成で見込む最終受益者）・人数
                            </p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.business_target_fcnt.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.business_target_ado &&
                        strapiBizPlan.business_target_ado.data
                          .childMarkdownRemark.html !== "" && (
                          <div>
                            <p css={th}>
                              事業対象者（事業で直接介入する対象者と、その他最終受益者を含む）・
                              内容
                            </p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.business_target_ado.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.business_target_acnt &&
                        strapiBizPlan.business_target_acnt.data
                          .childMarkdownRemark.html !== "" && (
                          <div>
                            <p css={th}>
                              事業対象者（事業で直接介入する対象者と、その他最終受益者を含む）・
                              人数
                            </p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.business_target_acnt.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}

                      {strapiBizPlan.buy_real_estate && (
                        <div>
                          <p css={th}>
                            本事業における、不動産（土地・建物）購入の有無
                          </p>
                          <p css={td}>
                            {strapiBizPlan.buy_real_estate === "1"
                              ? "あり"
                              : "なし"}
                          </p>
                        </div>
                      )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.business_target_fdo &&
                          strapiBizPlan.business_target_fdo.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                事業対象者（助成で見込む最終受益者）・内容
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.business_target_fdo.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.business_target_fcnt &&
                          strapiBizPlan.business_target_fcnt.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                事業対象者（助成で見込む最終受益者）・人数
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.business_target_fcnt.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.business_target_ado &&
                          strapiBizPlan.business_target_ado.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                事業対象者（事業で直接介入する対象者と、その他最終受益者を含む）・
                                内容
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.business_target_ado.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.business_target_acnt &&
                          strapiBizPlan.business_target_acnt.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                事業対象者（事業で直接介入する対象者と、その他最終受益者を含む）・
                                人数
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.business_target_acnt.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}

                        {strapiBizPlan.buy_real_estate && (
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
                        )}
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="fifthItem">
                  <DetailItemWrapper itemName="事業の背景・課題">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.social_issues &&
                        strapiBizPlan.social_issues.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>社会課題</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.social_issues.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.task_administration &&
                        strapiBizPlan.task_administration.data
                          .childMarkdownRemark.html !== "" && (
                          <div>
                            <p css={th}>
                              課題に対する行政等による既存の取組み状況
                            </p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.task_administration.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.task_request_account &&
                        strapiBizPlan.task_request_account.data
                          .childMarkdownRemark.html !== "" && (
                          <div>
                            <p css={th}>課題に対する申請団体の既存の取組状況</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.task_request_account.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.significance &&
                        strapiBizPlan.significance.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>
                              休眠預金等交付金に係わる資金の活用により本事業を実施する意義
                            </p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.significance.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.social_issues_corona &&
                        strapiBizPlan.social_issues_corona.data
                          .childMarkdownRemark.html !== "" && (
                          <div>
                            <p css={th}>
                              新型コロナウイルス感染症及び原油価格・物価高騰により深刻化した社会課題
                            </p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.social_issues_corona.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.subsidy_apply_reason &&
                        strapiBizPlan.subsidy_apply_reason.data
                          .childMarkdownRemark.html !== "" && (
                          <div>
                            <p css={th}>
                              新型コロナ及び原油価格・物価高騰対応支援枠の助成申請に至った理由
                            </p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.subsidy_apply_reason.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.social_issues &&
                          strapiBizPlan.social_issues.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th}>社会課題</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.social_issues.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.task_administration &&
                          strapiBizPlan.task_administration.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                課題に対する行政等による既存の取組み状況
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.task_administration.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.task_request_account &&
                          strapiBizPlan.task_request_account.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                課題に対する申請団体の既存の取組状況
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.task_request_account.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.significance &&
                          strapiBizPlan.significance.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                休眠預金等交付金に係わる資金の活用により本事業を実施する意義
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.significance.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.social_issues_corona &&
                          strapiBizPlan.social_issues_corona.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                新型コロナウイルス感染症及び原油価格・物価高騰により深刻化した社会課題
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.social_issues_corona.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.subsidy_apply_reason &&
                          strapiBizPlan.subsidy_apply_reason.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                新型コロナ及び原油価格・物価高騰対応支援枠の助成申請に至った理由
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.subsidy_apply_reason.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
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
                        {strapiBizPlan.midterm_biz_goals &&
                          strapiBizPlan.midterm_biz_goals.data
                            .childMarkdownRemark.html !== "" && (
                            <div css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.midterm_biz_goals.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </div>
                          )}
                      </DetailItemWrapper>
                    </div>
                    <div css={detailBody}>
                      <div id="six-secondItem">
                        {shortOutcomeFinance.length !== 0 && (
                          <DetailItemWrapper itemName="短期アウトカム (資金支援)">
                            <table css={table}>
                              {shortOutcomeFinance.map(
                                (item: any, i: number) => (
                                  <tbody key={"shortOutcomeFinance" + i}>
                                    <tr>
                                      <th css={th2Sub} rowSpan={8}>
                                        {i + 1}
                                      </th>
                                      <td css={td} colSpan={2}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.business_goals.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>

                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>モニタリング</p>
                                      <p css={td}>
                                        {item.node.goals_monitoring.data
                                          .goals_monitoring === "true"
                                          ? "はい"
                                          : "いいえ"}
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>指標</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_index.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>初期値/初期状態</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_initial.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>目標値/目標状態</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_goal.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>目標達成時期</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_achievement.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>中間評価時の値/状態</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_mid_eval.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>事後評価時の値/状態</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_aft_eval.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>

                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>モニタリング</th>
                                      <td css={td}>
                                        {item.node.goals_monitoring.data
                                          .goals_monitoring === "true"
                                          ? "はい"
                                          : "いいえ"}
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>指標</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_index.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>初期値/初期状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_initial.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>目標値/目標状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_goal.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>目標達成時期</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_achievement.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>中間評価時の値/状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_mid_eval.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>事後評価時の値/状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_aft_eval.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                )
                              )}
                            </table>
                          </DetailItemWrapper>
                        )}
                        {shortOutcomeNonFinance.length !== 0 && (
                          <DetailItemWrapper itemName="短期アウトカム (非資金支援)">
                            <table css={table}>
                              {shortOutcomeNonFinance.map(
                                (item: any, i: number) => (
                                  <tbody key={"shortOutcomeNonFinance" + i}>
                                    <tr>
                                      <th css={th2Sub} rowSpan={8}>
                                        {i + 1}
                                      </th>
                                      <td css={td} colSpan={2}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.business_goals.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>

                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>モニタリング</p>
                                      <p css={td}>
                                        {item.node.goals_monitoring.data
                                          .goals_monitoring === "true"
                                          ? "はい"
                                          : "いいえ"}
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>指標</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_index.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>初期値/初期状態</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_initial.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>目標値/目標状態</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_goal.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>目標達成時期</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_achievement.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>中間評価時の値/状態</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_mid_eval.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>事後評価時の値/状態</p>
                                      <p css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_aft_eval.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </p>
                                    </div>

                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>モニタリング</th>
                                      <td css={td}>
                                        {item.node.goals_monitoring.data
                                          .goals_monitoring === "true"
                                          ? "はい"
                                          : "いいえ"}
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>指標</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_index.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>初期値/初期状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_initial.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>目標値/目標状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_goal.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>目標達成時期</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_achievement.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>中間評価時の値/状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_mid_eval.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>事後評価時の値/状態</th>
                                      <td css={td}>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              item.node.goals_aft_eval.data.childMarkdownRemark.html.replace(
                                                /\n/g,
                                                "<br />"
                                              ),
                                          }}
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                )
                              )}
                            </table>
                          </DetailItemWrapper>
                        )}
                        {shortOutcomeAdo.length !== 0 && (
                          <DetailItemWrapper itemName="短期アウトカム (ADO)">
                            <table css={table}>
                              {shortOutcomeAdo.map((item: any, i: number) => (
                                <tbody key={"shortOutcomeAdo" + i}>
                                  <tr>
                                    <th css={th2Sub} rowSpan={8}>
                                      {i + 1}
                                    </th>
                                    <td css={td} colSpan={2}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.business_goals.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>

                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>モニタリング</p>
                                    <p css={td}>
                                      {item.node.goals_monitoring.data
                                        .goals_monitoring === "true"
                                        ? "はい"
                                        : "いいえ"}
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>指標</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_index.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>初期値/初期状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_initial.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>目標値/目標状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_goal.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>目標達成時期</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_achievement.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>中間評価時の値/状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_mid_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>事後評価時の値/状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_aft_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>

                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>モニタリング</th>
                                    <td css={td}>
                                      {item.node.goals_monitoring.data
                                        .goals_monitoring === "true"
                                        ? "はい"
                                        : "いいえ"}
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>指標</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_index.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>初期値/初期状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_initial.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>目標値/目標状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_goal.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>目標達成時期</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_achievement.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>中間評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_mid_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>事後評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_aft_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </DetailItemWrapper>
                        )}
                        {shortOutcomeCovid.length !== 0 && (
                          <DetailItemWrapper itemName="短期アウトカム (緊急支援枠)">
                            <table css={table}>
                              {shortOutcomeCovid.map((item: any, i: number) => (
                                <tbody key={"shortOutcomeCovid" + i}>
                                  <tr>
                                    <th css={th2Sub} rowSpan={8}>
                                      {i + 1}
                                    </th>
                                    <td css={td} colSpan={2}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.business_goals.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>

                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>モニタリング</p>
                                    <p css={td}>
                                      {item.node.goals_monitoring.data
                                        .goals_monitoring === "true"
                                        ? "はい"
                                        : "いいえ"}
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>
                                      実施・到達状況の目安とする指標
                                    </p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_index_arrival.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>把握方法</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_grasp.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>目標値/目標状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_goal.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>目標達成時期</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_achievement.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>

                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>モニタリング</th>
                                    <td css={td}>
                                      {item.node.goals_monitoring.data
                                        .goals_monitoring === "true"
                                        ? "はい"
                                        : "いいえ"}
                                    </td>
                                  </tr>

                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>
                                      実施・到達状況の目安とする指標
                                    </th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_index_arrival.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>

                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>把握方法</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_grasp.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>目標値/目標状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_goal.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>目標達成時期</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_achievement.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>中間評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_mid_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>事後評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.goals_aft_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </DetailItemWrapper>
                        )}
                      </div>
                      <div id="six-thirdItem">
                        {outputFinance.length !== 0 && (
                          <DetailItemWrapper itemName="アウトプット (資金支援)">
                            <table css={table}>
                              {outputFinance.map((item: any, i: number) => (
                                <tbody key={"outputFinance" + i}>
                                  <tr>
                                    <th css={th2Sub} rowSpan={12}>
                                      {i + 1}
                                    </th>
                                    <td css={td} colSpan={2}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>

                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>モニタリング</p>
                                    <p css={td}>
                                      {item.node.output_monitor.data
                                        .output_monitor === "true"
                                        ? "はい"
                                        : "いいえ"}
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>指標</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_index.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>
                                      実施・到達状況の目安とする指標
                                    </p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_index_arrival.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>把握方法</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_grasp.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>初期値/初期状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_initial.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>目標値/目標状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_goal.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>目標達成時期</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_achievement.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>活動内容</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_activity.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>活動時期</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_season.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>中間評価時の値/状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_mid_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>事後評価時の値/状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_aft_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>

                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>モニタリング</th>
                                    <td css={td}>
                                      {item.node.output_monitor.data
                                        .output_monitor === "true"
                                        ? "はい"
                                        : "いいえ"}
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>指標</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_index.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>
                                      実施・到達状況の目安とする指標
                                    </th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_index_arrival.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>把握方法</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_grasp.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>初期値/初期状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_initial.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>目標値/目標状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_goal.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>目標達成時期</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_achievement.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>活動内容</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_activity.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>活動時期</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_season.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>中間評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_mid_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>事後評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_aft_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </DetailItemWrapper>
                        )}
                        {outputNonFinance.length !== 0 && (
                          <DetailItemWrapper itemName="アウトプット (非資金支援)">
                            {outputNonFinance.length !== 0 && (
                              <table css={table}>
                                {outputNonFinance.map(
                                  (item: any, i: number) => (
                                    <tbody key={"outputNonFinance" + i}>
                                      <tr>
                                        <th css={th2Sub} rowSpan={12}>
                                          {i + 1}
                                        </th>
                                        <td css={td} colSpan={2}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </td>
                                      </tr>

                                      <div css={tr} tw="hidden lg:block">
                                        <p css={th}>モニタリング</p>
                                        <p css={td}>
                                          {item.node.output_monitor.data
                                            .output_monitor === "true"
                                            ? "はい"
                                            : "いいえ"}
                                        </p>
                                      </div>
                                      <div css={tr} tw="hidden lg:block">
                                        <p css={th}>指標</p>
                                        <p css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_index.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </p>
                                      </div>
                                      <div css={tr} tw="hidden lg:block">
                                        <p css={th}>
                                          実施・到達状況の目安とする指標
                                        </p>
                                        <p css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_index_arrival.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </p>
                                      </div>
                                      <div css={tr} tw="hidden lg:block">
                                        <p css={th}>把握方法</p>
                                        <p css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_grasp.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </p>
                                      </div>
                                      <div css={tr} tw="hidden lg:block">
                                        <p css={th}>初期値/初期状態</p>
                                        <p css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_initial.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </p>
                                      </div>
                                      <div css={tr} tw="hidden lg:block">
                                        <p css={th}>目標値/目標状態</p>
                                        <p css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_goal.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </p>
                                      </div>
                                      <div css={tr} tw="hidden lg:block">
                                        <p css={th}>目標達成時期</p>
                                        <p css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_achievement.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </p>
                                      </div>
                                      <div css={tr} tw="hidden lg:block">
                                        <p css={th}>活動内容</p>
                                        <p css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_activity.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </p>
                                      </div>
                                      <div css={tr} tw="hidden lg:block">
                                        <p css={th}>活動時期</p>
                                        <p css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_season.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </p>
                                      </div>
                                      <div css={tr} tw="hidden lg:block">
                                        <p css={th}>中間評価時の値/状態</p>
                                        <p css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_mid_eval.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </p>
                                      </div>
                                      <div css={tr} tw="hidden lg:block">
                                        <p css={th}>事後評価時の値/状態</p>
                                        <p css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_aft_eval.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </p>
                                      </div>

                                      <tr css={tr} tw="lg:hidden">
                                        <th css={th}>モニタリング</th>
                                        <td css={td}>
                                          {item.node.output_monitor.data
                                            .output_monitor === "true"
                                            ? "はい"
                                            : "いいえ"}
                                        </td>
                                      </tr>
                                      <tr css={tr} tw="lg:hidden">
                                        <th css={th}>指標</th>
                                        <td css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_index.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr css={tr} tw="lg:hidden">
                                        <th css={th}>
                                          実施・到達状況の目安とする指標
                                        </th>
                                        <td css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_index_arrival.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr css={tr} tw="lg:hidden">
                                        <th css={th}>把握方法</th>
                                        <td css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_grasp.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr css={tr} tw="lg:hidden">
                                        <th css={th}>初期値/初期状態</th>
                                        <td css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_initial.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr css={tr} tw="lg:hidden">
                                        <th css={th}>目標値/目標状態</th>
                                        <td css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_goal.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr css={tr} tw="lg:hidden">
                                        <th css={th}>目標達成時期</th>
                                        <td css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_achievement.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr css={tr} tw="lg:hidden">
                                        <th css={th}>活動内容</th>
                                        <td css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_activity.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr css={tr} tw="lg:hidden">
                                        <th css={th}>活動時期</th>
                                        <td css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_season.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr css={tr} tw="lg:hidden">
                                        <th css={th}>中間評価時の値/状態</th>
                                        <td css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_mid_eval.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr css={tr} tw="lg:hidden">
                                        <th css={th}>事後評価時の値/状態</th>
                                        <td css={td}>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                item.node.output_aft_eval.data.childMarkdownRemark.html.replace(
                                                  /\n/g,
                                                  "<br />"
                                                ),
                                            }}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  )
                                )}
                              </table>
                            )}
                          </DetailItemWrapper>
                        )}
                        {outputAdo.length !== 0 && (
                          <DetailItemWrapper itemName="アウトプット (ADO)">
                            <table css={table}>
                              {outputAdo.map((item: any, i: number) => (
                                <tbody key={"outputAdo" + i}>
                                  <tr>
                                    <th css={th2Sub} rowSpan={12}>
                                      {i + 1}
                                    </th>
                                    <td css={td} colSpan={2}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>

                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>モニタリング</p>
                                    <p css={td}>
                                      {item.node.output_monitor.data
                                        .output_monitor === "true"
                                        ? "はい"
                                        : "いいえ"}
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>指標</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_index.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>
                                      実施・到達状況の目安とする指標
                                    </p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_index_arrival.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>把握方法</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_grasp.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>初期値/初期状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_initial.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>目標値/目標状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_goal.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>目標達成時期</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_achievement.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>活動内容</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_activity.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>活動時期</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_season.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>中間評価時の値/状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_mid_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>事後評価時の値/状態</p>
                                    <p css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_aft_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </p>
                                  </div>

                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>モニタリング</th>
                                    <td css={td}>
                                      {item.node.output_monitor.data
                                        .output_monitor === "true"
                                        ? "はい"
                                        : "いいえ"}
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>指標</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_index.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>
                                      実施・到達状況の目安とする指標
                                    </th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_index_arrival.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>把握方法</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_grasp.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>初期値/初期状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_initial.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>目標値/目標状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_goal.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>目標達成時期</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_achievement.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>活動内容</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_activity.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>活動時期</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_season.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>中間評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_mid_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>事後評価時の値/状態</th>
                                    <td css={td}>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.node.output_aft_eval.data.childMarkdownRemark.html.replace(
                                              /\n/g,
                                              "<br />"
                                            ),
                                        }}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </DetailItemWrapper>
                        )}
                      </div>
                    </div>

                    {strapiBizPlan.business_org_type === "A" && (
                      <div css={detailBody}>
                        <div id="six-thirdItem" css={detailBody}></div>
                      </div>
                    )}
                  </div>
                </div>
                <div id="seventhItem">
                  <DetailItemWrapper itemName="事業活動">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.activity_0 &&
                        strapiBizPlan.activity_0.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={table} tw="bg-blue-base px-2">
                              資金支援
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_0 &&
                        strapiBizPlan.activity_0.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th1_2}>0年目</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_0.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_season_0 &&
                        strapiBizPlan.activity_season_0.data.childMarkdownRemark
                          .html !== "" && (
                          <div tw="flex">
                            <p css={th2_2}>活動時期</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_season_0.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_1 &&
                        strapiBizPlan.activity_1.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th1_2}>1年目</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_1.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_season_1 &&
                        strapiBizPlan.activity_season_1.data.childMarkdownRemark
                          .html !== "" && (
                          <div tw="flex">
                            <p css={th2_2}>活動時期</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_season_1.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_2 &&
                        strapiBizPlan.activity_2.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th1_2}>2年目</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_2.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_season_2 &&
                        strapiBizPlan.activity_season_2.data.childMarkdownRemark
                          .html !== "" && (
                          <div tw="flex">
                            <p css={th2_2}>活動時期</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_season_2.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_3 &&
                        strapiBizPlan.activity_3.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th1_2}>3年目</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_3.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_season_3 &&
                        strapiBizPlan.activity_season_3.data.childMarkdownRemark
                          .html !== "" && (
                          <div tw="flex">
                            <p css={th2_2}>活動時期</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_season_3.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_non_0 &&
                        strapiBizPlan.activity_non_0.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={table} tw="bg-blue-base px-2">
                              組織基盤強化・環境整備 (非資金的支援)
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_non_0 &&
                        strapiBizPlan.activity_non_0.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th1_2}>0年目</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_non_0.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_season_n_0 &&
                        strapiBizPlan.activity_season_n_0.data
                          .childMarkdownRemark.html !== "" && (
                          <div tw="flex">
                            <p css={th2_2}>活動時期</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_season_n_0.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_non_1 &&
                        strapiBizPlan.activity_non_1.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th1_2}>1年目</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_non_1.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_season_n_1 &&
                        strapiBizPlan.activity_season_n_1.data
                          .childMarkdownRemark.html !== "" && (
                          <div tw="flex">
                            <p css={th2_2}>活動時期</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_season_n_1.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_non_2 &&
                        strapiBizPlan.activity_non_2.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th1_2}>2年目</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_non_2.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_season_n_2 &&
                        strapiBizPlan.activity_season_n_2.data
                          .childMarkdownRemark.html !== "" && (
                          <div tw="flex">
                            <p css={th2_2}>活動時期</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_season_n_2.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_non_3 &&
                        strapiBizPlan.activity_non_3.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th1_2}>3年目</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_non_3.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.activity_season_n_3 &&
                        strapiBizPlan.activity_season_n_3.data
                          .childMarkdownRemark.html !== "" && (
                          <div tw="flex">
                            <p css={th2_2}>活動時期</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.activity_season_n_3.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.activity_0 &&
                          strapiBizPlan.activity_0.data.childMarkdownRemark
                            .html !== "" && (
                            <tr>
                              <th
                                css={table}
                                tw="bg-blue-base px-2"
                                colSpan={3}
                              >
                                資金支援
                              </th>
                            </tr>
                          )}
                        {strapiBizPlan.activity_0 &&
                          strapiBizPlan.activity_0.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th1_2} colSpan={2}>
                                0年目
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_0.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_season_0 &&
                          strapiBizPlan.activity_season_0.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th2Sub_2} rowSpan={1}></th>
                              <th css={th2_2}>活動時期</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_season_0.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_1 &&
                          strapiBizPlan.activity_1.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th1_2} colSpan={2}>
                                1年目
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_1.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_season_1 &&
                          strapiBizPlan.activity_season_1.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th2Sub_2} rowSpan={1}></th>
                              <th css={th2_2}>活動時期</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_season_1.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_2 &&
                          strapiBizPlan.activity_2.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th1_2} colSpan={2}>
                                2年目
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_2.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_season_2 &&
                          strapiBizPlan.activity_season_2.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th2Sub_2} rowSpan={1}></th>
                              <th css={th2_2}>活動時期</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_season_2.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_3 &&
                          strapiBizPlan.activity_3.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th1_2} colSpan={2}>
                                3年目
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_3.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_season_3 &&
                          strapiBizPlan.activity_season_3.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th2Sub_2} rowSpan={1}></th>
                              <th css={th2_2}>活動時期</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_season_3.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_non_0 &&
                          strapiBizPlan.activity_non_0.data.childMarkdownRemark
                            .html !== "" && (
                            <tr>
                              <th
                                css={table}
                                tw="bg-blue-base px-2"
                                colSpan={3}
                              >
                                組織基盤強化・環境整備 (非資金的支援)
                              </th>
                            </tr>
                          )}
                        {strapiBizPlan.activity_non_0 &&
                          strapiBizPlan.activity_non_0.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th1_2} colSpan={2}>
                                0年目
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_non_0.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_season_n_0 &&
                          strapiBizPlan.activity_season_n_0.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th2Sub_2} rowSpan={1}></th>
                              <th css={th2_2}>活動時期</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_season_n_0.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_non_1 &&
                          strapiBizPlan.activity_non_1.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th1_2} colSpan={2}>
                                1年目
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_non_1.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_season_n_1 &&
                          strapiBizPlan.activity_season_n_1.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th2Sub_2} rowSpan={1}></th>
                              <th css={th2_2}>活動時期</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_season_n_1.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_non_2 &&
                          strapiBizPlan.activity_non_2.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th1_2} colSpan={2}>
                                2年目
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_non_2.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_season_n_2 &&
                          strapiBizPlan.activity_season_n_2.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th2Sub_2} rowSpan={1}></th>
                              <th css={th2_2}>活動時期</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_season_n_2.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_non_3 &&
                          strapiBizPlan.activity_non_3.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th1_2} colSpan={2}>
                                3年目
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_non_3.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.activity_season_n_3 &&
                          strapiBizPlan.activity_season_n_3.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th2Sub_2} rowSpan={1}></th>
                              <th css={th2_2}>活動時期</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.activity_season_n_3.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                  {activityFinance.length !== 0 && (
                    <DetailItemWrapper itemName="活動 (資金支援)">
                      <table css={table}>
                        {activityFinance.map((item: any, i: number) => (
                          <tbody key={"activityFinance" + i}>
                            <tr tw="hidden lg:block">
                              <th css={th2Sub} rowSpan={2}>
                                {i + 1}
                              </th>
                              <td>
                                <div css={tr}>
                                  <p css={th}>活動 (内容)</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          item.node.activity.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                                <div css={tr} tw="hidden lg:block">
                                  <p css={th}>時期</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          item.node.activity_season.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                              </td>
                            </tr>

                            <tr css={tr} tw="lg:hidden">
                              <th css={th2Sub} rowSpan={2}>
                                {i + 1}
                              </th>
                              <th css={th}>活動 (内容)</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item.node.activity.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                            <tr css={tr} tw="lg:hidden">
                              <th css={th}>時期</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item.node.activity_season.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </DetailItemWrapper>
                  )}
                  {activityNonFinance.length !== 0 && (
                    <DetailItemWrapper itemName="活動 (非資金支援)">
                      <table css={table}>
                        {activityNonFinance.map((item: any, i: number) => (
                          <tbody key={"activityFinance" + i}>
                            <tr tw="hidden lg:block">
                              <th css={th2Sub} rowSpan={2}>
                                {i + 1}
                              </th>
                              <td>
                                <div css={tr}>
                                  <p css={th}>活動 (内容)</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          item.node.activity.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                                <div css={tr} tw="hidden lg:block">
                                  <p css={th}>時期</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          item.node.activity_season.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                              </td>
                            </tr>

                            <tr css={tr} tw="lg:hidden">
                              <th css={th2Sub} rowSpan={2}>
                                {i + 1}
                              </th>
                              <th css={th}>活動 (内容)</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item.node.activity.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                            <tr css={tr} tw="lg:hidden">
                              <th css={th}>時期</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item.node.activity_season.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </DetailItemWrapper>
                  )}
                  {activityAdo.length !== 0 && (
                    <DetailItemWrapper itemName="活動 (ADO)">
                      <table css={table}>
                        {activityAdo.map((item: any, i: number) => (
                          <tbody key={"activityFinance" + i}>
                            <tr tw="hidden lg:block">
                              <th css={th2Sub} rowSpan={2}>
                                {i + 1}
                              </th>
                              <td>
                                <div css={tr}>
                                  <p css={th}>活動 (内容)</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          item.node.activity.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                                <div css={tr}>
                                  <p css={th}>時期</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          item.node.activity_season.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                              </td>
                            </tr>

                            <tr css={tr} tw="lg:hidden">
                              <th css={th2Sub} rowSpan={2}>
                                {i + 1}
                              </th>
                              <th css={th}>活動 (内容)</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item.node.activity.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                            <tr css={tr} tw="lg:hidden">
                              <th css={th}>時期</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item.node.activity_season.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </DetailItemWrapper>
                  )}
                </div>
                <div id="eighthItem">
                  <DetailItemWrapper itemName="インプット">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.total_business_cost && (
                        <div>
                          <p css={th}>総事業費</p>
                          <p css={td}>
                            {strapiBizPlan.total_business_cost.toLocaleString()}
                            円
                          </p>
                        </div>
                      )}
                      {strapiBizPlan.human_resources &&
                        strapiBizPlan.human_resources.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>人材</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.human_resources.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.equipment &&
                        strapiBizPlan.equipment.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>資機材</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.equipment.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.etc_resources &&
                        strapiBizPlan.etc_resources.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>その他</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.etc_resources.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.total_business_cost && (
                          <tr css={tr}>
                            <th css={th}>総事業費</th>
                            <td css={td}>
                              {strapiBizPlan.total_business_cost.toLocaleString()}
                              円
                            </td>
                          </tr>
                        )}
                        {strapiBizPlan.human_resources &&
                          strapiBizPlan.human_resources.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th}>人材</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.human_resources.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.equipment &&
                          strapiBizPlan.equipment.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th}>資機材</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.equipment.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.etc_resources &&
                          strapiBizPlan.etc_resources.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th}>その他</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.etc_resources.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="ninthItem">
                  <DetailItemWrapper itemName="広報戦略および連携・対話戦略">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.pr_strategy &&
                        strapiBizPlan.pr_strategy.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>広報戦略</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.pr_strategy.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.dialogue_strategy &&
                        strapiBizPlan.dialogue_strategy.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>連携・対話戦略</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.dialogue_strategy.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.pr_strategy &&
                          strapiBizPlan.pr_strategy.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th}>広報戦略</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.pr_strategy.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.dialogue_strategy &&
                          strapiBizPlan.dialogue_strategy.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>連携・対話戦略</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.dialogue_strategy.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                <div id="tenthItem">
                  <DetailItemWrapper itemName="出口戦略・持続可能性について">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.sustainability1 &&
                        strapiBizPlan.sustainability1.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>持続可能性１</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.sustainability1.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.sustainability2 &&
                        strapiBizPlan.sustainability2.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>持続可能性2</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.sustainability2.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.sustainability1 &&
                          strapiBizPlan.sustainability1.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th}>持続可能性１</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.sustainability1.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.sustainability2 &&
                          strapiBizPlan.sustainability2.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th}>持続可能性2</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.sustainability2.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
                {strapiBizPlan.executive_org_cnt &&
                  strapiBizPlan.executive_org_cnt.data.childMarkdownRemark
                    .html !== "" && (
                    <div id="">
                      <DetailItemWrapper itemName="実行団体の募集">
                        <table css={table} tw="lg:hidden">
                          <tbody>
                            {strapiBizPlan.executive_org_cnt &&
                              strapiBizPlan.executive_org_cnt.data
                                .childMarkdownRemark.html !== "" && (
                                <tr css={tr}>
                                  <th css={th}>採択予定実行団体数</th>
                                  <td css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.executive_org_cnt.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </td>
                                </tr>
                              )}
                            {strapiBizPlan.executive_org_amt &&
                              strapiBizPlan.executive_org_amt.data
                                .childMarkdownRemark.html !== "" && (
                                <tr css={tr}>
                                  <th css={th}>１実行団体当たり助成金額</th>
                                  <td css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.executive_org_amt.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </td>
                                </tr>
                              )}
                            {strapiBizPlan.ingenuity &&
                              strapiBizPlan.ingenuity.data.childMarkdownRemark
                                .html !== "" && (
                                <tr css={tr}>
                                  <th css={th}>申請数確保に向けた工夫</th>
                                  <td css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.ingenuity.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </td>
                                </tr>
                              )}
                            {strapiBizPlan.examination_method &&
                              strapiBizPlan.examination_method.data
                                .childMarkdownRemark.html !== "" && (
                                <tr css={tr}>
                                  <th css={th}>
                                    予定する審査方法(審査スケジュール、審査構成、留意点等）
                                  </th>
                                  <td css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.examination_method.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </td>
                                </tr>
                              )}
                          </tbody>
                        </table>

                        <table css={table} tw="hidden lg:block">
                          <tbody>
                            {strapiBizPlan.executive_org_cnt &&
                              strapiBizPlan.executive_org_cnt.data
                                .childMarkdownRemark.html !== "" && (
                                <div>
                                  <p css={th}>採択予定実行団体数</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.executive_org_cnt.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                              )}
                            {strapiBizPlan.executive_org_amt &&
                              strapiBizPlan.executive_org_amt.data
                                .childMarkdownRemark.html !== "" && (
                                <div>
                                  <p css={th}>１実行団体当たり助成金額</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.executive_org_amt.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                              )}
                            {strapiBizPlan.ingenuity &&
                              strapiBizPlan.ingenuity.data.childMarkdownRemark
                                .html !== "" && (
                                <div>
                                  <p css={th}>申請数確保に向けた工夫</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.ingenuity.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                              )}
                            {strapiBizPlan.examination_method &&
                              strapiBizPlan.examination_method.data
                                .childMarkdownRemark.html !== "" && (
                                <div>
                                  <p css={th}>
                                    予定する審査方法(審査スケジュール、審査構成、留意点等）
                                  </p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.examination_method.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                              )}
                          </tbody>
                        </table>
                      </DetailItemWrapper>
                    </div>
                  )}
                {strapiBizPlan.member_config_role &&
                  strapiBizPlan.member_config_role.data.childMarkdownRemark
                    .html !== "" && (
                    <div id="">
                      <DetailItemWrapper itemName="事業実施体制">
                        <table css={table} tw="lg:hidden">
                          <tbody>
                            {strapiBizPlan.member_config_role &&
                              strapiBizPlan.member_config_role.data
                                .childMarkdownRemark.html !== "" && (
                                <tr css={tr}>
                                  <th css={th}>
                                    メンバー構成と各メンバーの役割
                                  </th>
                                  <td css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.member_config_role.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </td>
                                </tr>
                              )}
                            {strapiBizPlan.coordination_system &&
                              strapiBizPlan.coordination_system.data
                                .childMarkdownRemark.html !== "" && (
                                <tr css={tr}>
                                  <th css={th}>他団体との連携体制</th>
                                  <td css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.coordination_system.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </td>
                                </tr>
                              )}
                            {strapiBizPlan.risk_manage_system &&
                              strapiBizPlan.risk_manage_system.data
                                .childMarkdownRemark.html !== "" && (
                                <tr css={tr}>
                                  <th css={th}>想定されるリスクと管理体制</th>
                                  <td css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.risk_manage_system.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </td>
                                </tr>
                              )}
                          </tbody>
                        </table>

                        <table css={table} tw="hidden lg:block">
                          <tbody>
                            {strapiBizPlan.member_config_role &&
                              strapiBizPlan.member_config_role.data
                                .childMarkdownRemark.html !== "" && (
                                <div>
                                  <p css={th}>メンバー構成と各メンバーの役割</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.member_config_role.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                              )}
                            {strapiBizPlan.coordination_system &&
                              strapiBizPlan.coordination_system.data
                                .childMarkdownRemark.html !== "" && (
                                <div>
                                  <p css={th}>他団体との連携体制</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.coordination_system.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                              )}
                            {strapiBizPlan.risk_manage_system &&
                              strapiBizPlan.risk_manage_system.data
                                .childMarkdownRemark.html !== "" && (
                                <div>
                                  <p css={th}>想定されるリスクと管理体制</p>
                                  <p css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.risk_manage_system.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </p>
                                </div>
                              )}
                          </tbody>
                        </table>
                      </DetailItemWrapper>
                    </div>
                  )}

                <div id="eleventhItem">
                  <DetailItemWrapper itemName="関連する主な実績">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.subsidy_actual &&
                        strapiBizPlan.subsidy_actual.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>
                              事業対象者（助成で見込む最終受益者）・内容
                            </p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.subsidy_actual.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.org_strength &&
                        strapiBizPlan.org_strength.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>
                              申請事業に関連する調査研究、連携、マッチング、伴走支援の実績、事業事例等
                            </p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.org_strength.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.is_subsidy_distr && (
                        <div>
                          <p css={th}>
                            本事業について、コロナウイルス感染症に係る助成金や寄付等を受け助成金等を分配している(予定も含む）
                          </p>
                          <p css={td}>
                            {strapiBizPlan.is_subsidy_distr === "true"
                              ? "あり"
                              : "なし"}
                          </p>
                        </div>
                      )}
                      {strapiBizPlan.subsidy_distr_dtl &&
                        strapiBizPlan.subsidy_distr_dtl.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>内容</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.subsidy_distr_dtl.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.is_etc_subsidy_recv && (
                        <div>
                          <p css={th}>
                            本事業について、国又は地方公共団体から補助金又は貸付金（ふるさと納税を財源とする資金提供を含む）を受けていない。
                          </p>
                          <p css={td}>
                            {strapiBizPlan.is_etc_subsidy_recv === "true"
                              ? "あり"
                              : "なし"}
                          </p>
                        </div>
                      )}
                      {strapiBizPlan.is_etc_biz_distr && (
                        <div>
                          <p css={th}>
                            本事業以外の事業について、コロナウイルス感染症に係る助成金や寄付等を受け助成金等を分配している(予定も含む)
                          </p>
                          <p css={td}>
                            {strapiBizPlan.is_etc_biz_distr === "true"
                              ? "あり"
                              : "なし"}
                          </p>
                        </div>
                      )}
                      {strapiBizPlan.etc_biz_distr_dtl &&
                        strapiBizPlan.etc_biz_distr_dtl.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>内容</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.etc_biz_distr_dtl.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.other_subsidy_actual &&
                        strapiBizPlan.other_subsidy_actual.data
                          .childMarkdownRemark.html !== "" && (
                          <div>
                            <p css={th}>その他、助成金等の分配の実績</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.other_subsidy_actual.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.last_year_org_cnt &&
                        strapiBizPlan.last_year_org_cnt.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>前年度に助成した団体数</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.last_year_org_cnt.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.last_year_subsidy &&
                        strapiBizPlan.last_year_subsidy.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>前年度の助成総額</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.last_year_subsidy.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.org_strength_fdo &&
                        strapiBizPlan.org_strength_fdo.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>
                              事業に関連する調査研究、連携、マッチング、伴走支援の実績、事業事例等
                            </p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.org_strength_fdo.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                      {strapiBizPlan.org_strength_ado &&
                        strapiBizPlan.org_strength_ado.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>事業に関連する調査研究、連携の実績</p>
                            <p css={td}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiBizPlan.org_strength_ado.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </p>
                          </div>
                        )}
                    </div>

                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.subsidy_actual &&
                          strapiBizPlan.subsidy_actual.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                事業対象者（助成で見込む最終受益者）・内容
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.subsidy_actual.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.org_strength &&
                          strapiBizPlan.org_strength.data.childMarkdownRemark
                            .html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                申請事業に関連する調査研究、連携、マッチング、伴走支援の実績、事業事例等
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.org_strength.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.is_subsidy_distr && (
                          <tr css={tr}>
                            <th css={th}>
                              本事業について、コロナウイルス感染症に係る助成金や寄付等を受け助成金等を分配している(予定も含む）
                            </th>
                            <td css={td}>
                              {strapiBizPlan.is_subsidy_distr === "true"
                                ? "あり"
                                : "なし"}
                            </td>
                          </tr>
                        )}
                        {strapiBizPlan.subsidy_distr_dtl &&
                          strapiBizPlan.subsidy_distr_dtl.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>内容</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.subsidy_distr_dtl.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.is_etc_subsidy_recv && (
                          <tr css={tr}>
                            <th css={th}>
                              本事業について、国又は地方公共団体から補助金又は貸付金（ふるさと納税を財源とする資金提供を含む）を受けていない。
                            </th>
                            <td css={td}>
                              {strapiBizPlan.is_etc_subsidy_recv === "true"
                                ? "あり"
                                : "なし"}
                            </td>
                          </tr>
                        )}
                        {strapiBizPlan.is_etc_biz_distr && (
                          <tr css={tr}>
                            <th css={th}>
                              本事業以外の事業について、コロナウイルス感染症に係る助成金や寄付等を受け助成金等を分配している(予定も含む)
                            </th>
                            <td css={td}>
                              {strapiBizPlan.is_etc_biz_distr === "true"
                                ? "あり"
                                : "なし"}
                            </td>
                          </tr>
                        )}
                        {strapiBizPlan.etc_biz_distr_dtl &&
                          strapiBizPlan.etc_biz_distr_dtl.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>内容</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.etc_biz_distr_dtl.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.other_subsidy_actual &&
                          strapiBizPlan.other_subsidy_actual.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>その他、助成金等の分配の実績</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.other_subsidy_actual.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.last_year_org_cnt &&
                          strapiBizPlan.last_year_org_cnt.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>前年度に助成した団体数</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.last_year_org_cnt.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.last_year_subsidy &&
                          strapiBizPlan.last_year_subsidy.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>前年度の助成総額</th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.last_year_subsidy.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.org_strength_fdo &&
                          strapiBizPlan.org_strength_fdo.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                事業に関連する調査研究、連携、マッチング、伴走支援の実績、事業事例等
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.org_strength_fdo.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
                        {strapiBizPlan.org_strength_ado &&
                          strapiBizPlan.org_strength_ado.data
                            .childMarkdownRemark.html !== "" && (
                            <tr css={tr}>
                              <th css={th}>
                                事業に関連する調査研究、連携の実績
                              </th>
                              <td css={td}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiBizPlan.org_strength_ado.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </td>
                            </tr>
                          )}
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
      business_org_type: { eq: "F" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
      data {
        url
      }
    }
    strapiBizPlanManualADO: strapiBizPlanManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
      data {
        url
      }
    }
    strapiBizPlan(business_cd: { eq: $slug }) {
      updatedAt(formatString: "YYYY/MM/DD")
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
      is_subsidy_distr
      subsidy_distr_dtl {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      is_etc_subsidy_recv
      is_etc_biz_distr
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
          updatedAt
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
    # サイドバーチェック用
    strapiFinancePlanFDO: strapiFinancePlan(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiFinancePlanADO: strapiFinancePlan(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
    strapiFinancePlanFormerFDO: strapiFinancePlanFormer(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiFinancePlanFormerADO: strapiFinancePlanFormer(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
    strapiFinancePlanManualFDO: strapiFinancePlanManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiFinancePlanManualADO: strapiFinancePlanManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
    strapiEvaluationPlan(business_cd: { eq: $slug }) {
      id
    }
    strapiEvaluationPlanManualFDO: strapiEvaluationPlanManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiEvaluationPlanManualADO: strapiEvaluationPlanManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
    strapiOfferingReportManualFDO: strapiOfferingReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiPreReportManualFDO: strapiPreReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiPreReportManualADO: strapiPreReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
    strapiMidReportManualFDO: strapiMidReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiMidReportManualADO: strapiMidReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
    strapiPostReportManualFDO: strapiPostReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiPostReportManualADO: strapiPostReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
    strapiProgressReportManualFDO: strapiProgressReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiProgressReportManualADO: strapiProgressReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
    strapiCompleteReportManualFDO: strapiCompleteReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiCompleteReportManualADO: strapiCompleteReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
    strapiSettleReportFDO: strapiSettleReport(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiSettleReportADO: strapiSettleReport(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
    strapiSettleReportManualFDO: strapiSettleReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiSettleReportManualADO: strapiSettleReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
  }
`;
