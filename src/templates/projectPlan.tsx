import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import { detailAnchor, detailBody } from "../styles/detailPage";
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
import { useBasicInfo } from "../hooks/useBasicInfo";
import { isActivitySupportGroup } from "../util/businessTypeNameChecker";
import {
  isEmergencySupportGroup,
  isSpecificBusinessTypeNameYear,
} from "../util/businessTypeNameChecker";
import AttachedFileLink from "../components/atoms/AttachedFileLink";

// PagePropsにanyを適用
type ProjectPlanProps = any;

const ProjectPlan: React.FC<any> = ({
  data,
  serverData, // serverDataを受け取る
  pageContext,
}: any) => {
  const { slug } = pageContext;
  // SSRデータを既存の変数名で扱えるようにする
  const allStrapiBizPlanSub = serverData.ssrAllStrapiBizPlanSub;
  const {
    strapiBizPlan,
    strapiBizPlanManualFDO,
    strapiBizPlanManualADO,
    allStrapiAttachedFile,
  } = data;
  const [updatedAt, setUpdatedAt] = useState("");
  const { business_type_name, business_org_type } = useBasicInfo(slug);
  const isActivitySupport = isActivitySupportGroup(business_type_name || "");
  const isSupportTarget = isActivitySupport && business_org_type === "A";
  const projectPlanLabel = isSupportTarget ? "支援対象活動計画書" : "事業計画";

  const bizPlanManual = strapiBizPlanManualFDO || strapiBizPlanManualADO;

  const pdfUrl =
    bizPlanManual &&
    bizPlanManual.data &&
    `https://docs.google.com/viewer?url=${bizPlanManual.data.url}&embedded=true`;

  // 活動支援プログラムの目的（活動支援団体用）
  const activitySupportPurpose =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "01")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // SDGs
  const bizPlanSubSdgs =
    allStrapiBizPlanSub.edges.length !== 0 &&
    allStrapiBizPlanSub.edges
      .filter((bps: any) => bps.node.info_type === "50")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  // 短期アウトカム・資金支援（FDO用）
  const shortOutcomeFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "11")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // 短期アウトカム・非資金支援（FDO用）
  const shortOutcomeNonFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "12")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // 短期アウトカム（ADO用）
  const shortOutcomeAdo =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "13")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // 短期アウトカム（コロナ対応）
  const shortOutcomeCovid =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "14")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // 短期アウトカム（活動支援団体用）
  const shortOutcomeActivitySupport =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "15")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // アウトプット・資金支援（FDO用）
  const outputFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "21")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // アウトプット・非資金支援（FDO用）
  const outputNonFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "22")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // アウトプット（ADO用）
  const outputAdo =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "23")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // アウトプット（活動支援団体用）
  const outputActivitySupport =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "24")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // 活動・資金支援（FDO用）
  const activityFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "31")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // 活動・非資金支援（FDO用）
  const activityNonFinance =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "32")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // 活動（ADO用）
  const activityAdo =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "33")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];
  // 活動（活動支援団体用）
  const activityActivitySupport =
    allStrapiBizPlanSub.edges.length !== 0
      ? allStrapiBizPlanSub.edges
          .filter((bps: any) => bps.node.info_type === "34")
          .sort((a: any, b: any) => a.node.row_no - b.node.row_no)
      : [];

  // 添付ファイル
  const keikaushoFile = allStrapiAttachedFile.edges.filter(
    (af: any) => af.node.item_id === "activity_plan"
  );

  useEffect(() => {
    strapiBizPlan && setUpdatedAt(strapiBizPlan.updatedAt);
    bizPlanManual && setUpdatedAt(bizPlanManual.updatedAt);
  }, [strapiBizPlan, bizPlanManual]);

  return (
    <Layout>
      <Seo title={`${projectPlanLabel} | 休眠預金活用事業 情報公開サイト`} />
      <DetailHeader business_cd={slug} />
      <DetailWrapper
        category={projectPlanLabel}
        slug={slug}
        updatedAt={updatedAt}
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
                title={isActivitySupport ? "団体概要" : "団体の社会的役割"}
                anchor={`/result/${slug}/project-plan/#thirdItem`}
              />
              <DetailAnchor
                title="概要"
                anchor={`/result/${slug}/project-plan/#fourthItem`}
              />
              {!isSupportTarget && (
                <>
                  <DetailAnchor
                    title="事業の背景・課題"
                    anchor={`/result/${slug}/project-plan/#fifthItem`}
                  />
                  <DetailAnchor
                    title="事業設計"
                    anchor={`/result/${slug}/project-plan/#sixthItem`}
                  />
                  {!isActivitySupport && (
                    <DetailAnchor
                      title="事業活動"
                      anchor={`/result/${slug}/project-plan/#seventhItem`}
                    />
                  )}
                  {(strapiBizPlan.total_business_cost ||
                    strapiBizPlan.human_resources.data.childMarkdownRemark
                      .html !== "" ||
                    strapiBizPlan.equipment.data.childMarkdownRemark.html !==
                      "") && (
                    <DetailAnchor
                      title="インプット"
                      anchor={`/result/${slug}/project-plan/#eighthItem`}
                    />
                  )}
                </>
              )}
              {!isActivitySupport && (
                <>
                  {((strapiBizPlan.pr_strategy &&
                    strapiBizPlan.pr_strategy.data.childMarkdownRemark.html !==
                      "") ||
                    (strapiBizPlan.dialogue_strategy &&
                      strapiBizPlan.dialogue_strategy.data.childMarkdownRemark
                        .html !== "")) && (
                    <DetailAnchor
                      title="広報戦略および連携・対話戦略"
                      anchor={`/result/${slug}/project-plan/#ninthItem`}
                    />
                  )}
                  {((strapiBizPlan.sustainability1 &&
                    strapiBizPlan.sustainability1.data.childMarkdownRemark
                      .html !== "") ||
                    (strapiBizPlan.sustainability2 &&
                      strapiBizPlan.sustainability2.data.childMarkdownRemark
                        .html !== "") ||
                    (strapiBizPlan.exit_strategy_fdo &&
                      strapiBizPlan.exit_strategy_fdo.data.childMarkdownRemark
                        .html !== "") ||
                    (strapiBizPlan.exit_strategy_ado &&
                      strapiBizPlan.exit_strategy_ado.data.childMarkdownRemark
                        .html !== "")) && (
                    <DetailAnchor
                      title="出口戦略・持続可能性について"
                      anchor={`/result/${slug}/project-plan/#tenthItem`}
                    />
                  )}
                  <DetailAnchor
                    title="関連する主な実績"
                    anchor={`/result/${slug}/project-plan/#eleventhItem`}
                  />
                </>
              )}
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
                  {strapiBizPlan.field_other_problem.data.childMarkdownRemark
                    .html && (
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
                <DetailItemWrapper
                  itemName={isActivitySupport ? "団体概要" : "団体の社会的役割"}
                >
                  <div tw="hidden lg:block">
                    {strapiBizPlan.vision &&
                      strapiBizPlan.vision.data.childMarkdownRemark.html !==
                        "" && (
                        <div>
                          <p css={th}>
                            {isActivitySupport
                              ? "設立目的・理念"
                              : "団体の目的"}
                          </p>
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
                          <p css={th}>
                            {isActivitySupport
                              ? "団体の主な活動"
                              : "団体の概要・活動・業務"}
                          </p>
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
                            <th css={th}>
                              {isActivitySupport
                                ? "設立目的・理念"
                                : "団体の目的"}
                            </th>
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
                        strapiBizPlan.mission.data.childMarkdownRemark.html !==
                          "" && (
                          <tr css={tr}>
                            <th css={th}>
                              {isActivitySupport
                                ? "団体の主な活動"
                                : "団体の概要・活動・業務"}
                            </th>
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
                        <p css={th}>
                          {isActivitySupport
                            ? "契約締結日"
                            : "資金提供契約締結日"}
                        </p>
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
                        strapiBizPlan.business_overview.data.childMarkdownRemark
                          .html !== "" && (
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
                          <th css={th}>
                            {isActivitySupport
                              ? "契約締結日"
                              : "資金提供契約締結日"}
                          </th>
                          <td colSpan={2} css={td}>
                            {formatDate(strapiBizPlan.funding_conclusion_d)}
                          </td>
                        </tr>
                      )}
                      {strapiBizPlan.business_period_s && (
                        <tr css={tr}>
                          <th css={th}>事業期間</th>
                          <td css={td}>
                            開始日 {formatDate(strapiBizPlan.business_period_s)}
                          </td>
                          <td css={td}>
                            終了日 {formatDate(strapiBizPlan.business_period_e)}
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
                      strapiBizPlan.indirect_target_grp.data.childMarkdownRemark
                        .html !== "" && (
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
                      strapiBizPlan.indirect_target_cnt.data.childMarkdownRemark
                        .html !== "" && (
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
                        strapiBizPlan.direct_target_grp.data.childMarkdownRemark
                          .html !== "" && (
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
                        strapiBizPlan.direct_target_cnt.data.childMarkdownRemark
                          .html !== "" && (
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
                      strapiBizPlan.business_target_fdo.data.childMarkdownRemark
                        .html !== "" && (
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
                      strapiBizPlan.business_target_ado.data.childMarkdownRemark
                        .html !== "" && (
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
              {!isSupportTarget && (
                <div id="fifthItem">
                  <DetailItemWrapper itemName="事業の背景・課題">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.social_issues &&
                        strapiBizPlan.social_issues.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>
                              {isActivitySupport
                                ? "支援対象団体が抱える事業実施上、組織上の課題とその背景"
                                : "社会課題"}
                            </p>
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
                              {isActivitySupport
                                ? "課題に対する行政や中間支援団体等による既存の取組み状況"
                                : "課題に対する行政等による既存の取組み状況"}
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
                              {isSpecificBusinessTypeNameYear(
                                strapiBizPlan.business_type_name,
                                2024
                              ) &&
                              isEmergencySupportGroup(
                                strapiBizPlan.business_type_name
                              )
                                ? "物価高騰及び子育て支援枠の助成申請に至った理由"
                                : "新型コロナ及び原油価格・物価高騰対応支援枠の助成申請に至った理由"}
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
                              <th css={th}>
                                {isActivitySupport
                                  ? "支援対象団体が抱える事業実施上、組織上の課題とその背景"
                                  : "社会課題"}
                              </th>
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
                                {isActivitySupport
                                  ? "課題に対する行政や中間支援団体等による既存の取組み状況"
                                  : "課題に対する行政等による既存の取組み状況"}
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
                                {isSpecificBusinessTypeNameYear(
                                  strapiBizPlan.business_type_name,
                                  2024
                                ) &&
                                isEmergencySupportGroup(
                                  strapiBizPlan.business_type_name
                                )
                                  ? "物価高騰及び子育て支援枠の助成申請に至った理由"
                                  : "新型コロナ及び原油価格・物価高騰対応支援枠の助成申請に至った理由"}
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
              )}
              {strapiBizPlan.org_num && (
                <div id="">
                  <DetailItemWrapper itemName="活動支援プログラムの内容">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.org_num && (
                        <div>
                          <p css={th}>支援対象団体数</p>
                          <p css={td}>{strapiBizPlan.org_num}</p>
                        </div>
                      )}
                      {strapiBizPlan.org_area && (
                        <div>
                          <p css={th}>支援対象団体の活動地域・分野・内容</p>
                          <p css={td}>{strapiBizPlan.org_area}</p>
                        </div>
                      )}
                      {strapiBizPlan.org_scale && (
                        <div>
                          <p css={th}>支援対象団体の組織形態・規模</p>
                          <p css={td}>{strapiBizPlan.org_scale}</p>
                        </div>
                      )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.org_num && (
                          <tr css={tr}>
                            <th css={th}>支援対象団体数</th>
                            <td css={td}>{strapiBizPlan.org_num}</td>
                          </tr>
                        )}
                        {strapiBizPlan.org_area && (
                          <tr css={tr}>
                            <th css={th}>支援対象団体の活動地域・分野・内容</th>
                            <td css={td}>{strapiBizPlan.org_area}</td>
                          </tr>
                        )}
                        {strapiBizPlan.org_scale && (
                          <tr css={tr}>
                            <th css={th}>支援対象団体の組織形態・規模</th>
                            <td css={td}>{strapiBizPlan.org_scale}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
              )}
              {!isSupportTarget && (
                <div id="sixthItem">
                  <DetailItemWrapper itemName="事業設計">
                    <div css={detailAnchor}>
                      {strapiBizPlan.midterm_biz_goals &&
                        strapiBizPlan.midterm_biz_goals.data.childMarkdownRemark
                          .html !== "" && (
                          <DetailAnchor
                            title="中長期アウトカム"
                            anchor={`/result/${slug}/project-plan/#six-firstItem`}
                          />
                        )}
                      {strapiBizPlan.org_impact && (
                        <DetailAnchor
                          title="中長期アウトカム"
                          anchor={`/result/${slug}/project-plan/#six-fifthItem`}
                        />
                      )}
                      {activitySupportPurpose.length !== 0 && (
                        <DetailAnchor
                          title="活動支援プログラムの目的"
                          anchor={`/result/${slug}/project-plan/#six-fourthItem`}
                        />
                      )}
                      {(shortOutcomeFinance.length !== 0 ||
                        shortOutcomeNonFinance.length !== 0 ||
                        shortOutcomeAdo.length !== 0 ||
                        shortOutcomeCovid.length !== 0 ||
                        shortOutcomeActivitySupport.length !== 0) && (
                        <DetailAnchor
                          title="短期アウトカム"
                          anchor={`/result/${slug}/project-plan/#six-secondItem`}
                        />
                      )}
                      {(outputFinance.length !== 0 ||
                        outputNonFinance.length !== 0 ||
                        outputAdo.length !== 0 ||
                        outputActivitySupport.length !== 0) && (
                        <DetailAnchor
                          title="アウトプット"
                          anchor={`/result/${slug}/project-plan/#six-thirdItem`}
                        />
                      )}
                    </div>
                  </DetailItemWrapper>
                  <div css={detailBody}>
                    {strapiBizPlan.midterm_biz_goals &&
                      strapiBizPlan.midterm_biz_goals.data.childMarkdownRemark
                        .html !== "" && (
                        <div id="six-firstItem">
                          <DetailItemWrapper itemName="中長期アウトカム">
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
                          </DetailItemWrapper>
                        </div>
                      )}
                    {strapiBizPlan.org_impact && (
                      <div id="six-fifthItem">
                        <DetailItemWrapper itemName="中長期アウトカム">
                          <div tw="hidden lg:block">
                            <div>
                              <p css={th}>
                                活動支援プログラムによって支援を受けた団体が社会にもたらす変化/インパクト(中長期アウトカム)
                              </p>
                              <p css={td}>{strapiBizPlan.org_impact}</p>
                            </div>
                          </div>
                          <table css={table} tw="lg:hidden">
                            <tbody>
                              <tr css={tr}>
                                <th css={th}>
                                  活動支援プログラムによって支援を受けた団体が社会にもたらす変化/インパクト(中長期アウトカム)
                                </th>
                                <td css={td}>{strapiBizPlan.org_impact}</td>
                              </tr>
                            </tbody>
                          </table>
                        </DetailItemWrapper>
                      </div>
                    )}
                    {activitySupportPurpose.length !== 0 && (
                      <div id="six-fourthItem">
                        <DetailItemWrapper itemName="活動支援プログラムの目的">
                          <table css={table}>
                            {activitySupportPurpose.map(
                              (item: any, i: number) => (
                                <tbody key={"activitySupportPurpose" + i}>
                                  <tr>
                                    <th css={th2Sub} rowSpan={5}>
                                      {i + 1}
                                    </th>
                                    <td css={td} colSpan={2}>
                                      {item.node.purpose}
                                    </td>
                                  </tr>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>指標</p>
                                    <p css={td}>{item.node.purpose_index}</p>
                                  </div>
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>初期値/初期状態</p>
                                    <p css={td}>{item.node.purpose_initial}</p>
                                  </div>
                                  {item.node.purpose_mid_eval && (
                                    <div css={tr} tw="hidden lg:block">
                                      <p css={th}>中間評価時の値/状態</p>
                                      <p css={td}>
                                        {item.node.purpose_mid_eval}
                                      </p>
                                    </div>
                                  )}
                                  <div css={tr} tw="hidden lg:block">
                                    <p css={th}>
                                      目標値/目標状態（目標達成時期）
                                    </p>
                                    <p css={td}>{item.node.purpose_aft_eval}</p>
                                  </div>

                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>指標</th>
                                    <td css={td}>{item.node.purpose_index}</td>
                                  </tr>
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>初期値/初期状態</th>
                                    <td css={td}>
                                      {item.node.purpose_initial}
                                    </td>
                                  </tr>
                                  {item.node.purpose_mid_eval && (
                                    <tr css={tr} tw="lg:hidden">
                                      <th css={th}>中間評価時の値/状態</th>
                                      <td css={td}>
                                        {item.node.purpose_mid_eval}
                                      </td>
                                    </tr>
                                  )}
                                  <tr css={tr} tw="lg:hidden">
                                    <th css={th}>
                                      目標値/目標状態（目標達成時期）
                                    </th>
                                    <td css={td}>
                                      {item.node.purpose_aft_eval}
                                    </td>
                                  </tr>
                                </tbody>
                              )
                            )}
                          </table>
                        </DetailItemWrapper>
                      </div>
                    )}
                    <div id="six-secondItem" tw="flex flex-col gap-4">
                      {shortOutcomeFinance.length !== 0 && (
                        <ShortOutcome
                          shortOutcome={shortOutcomeFinance}
                          name="短期アウトカム (資金支援)"
                        />
                      )}
                      {shortOutcomeNonFinance.length !== 0 && (
                        <ShortOutcome
                          shortOutcome={shortOutcomeNonFinance}
                          name="短期アウトカム (非資金支援)"
                        />
                      )}
                      {shortOutcomeAdo.length !== 0 && (
                        <ShortOutcome
                          shortOutcome={shortOutcomeAdo}
                          name="短期アウトカム"
                        />
                      )}
                      {shortOutcomeCovid.length !== 0 && (
                        <ShortOutcome
                          shortOutcome={shortOutcomeCovid}
                          name="短期アウトカム"
                        />
                      )}
                      {shortOutcomeActivitySupport.length !== 0 && (
                        <ShortOutcome
                          shortOutcome={shortOutcomeActivitySupport}
                          name="短期アウトカム"
                        />
                      )}
                    </div>
                    <div id="six-thirdItem" tw="flex flex-col gap-4">
                      {outputFinance.length !== 0 && (
                        <Output
                          output={outputFinance}
                          name="アウトプット (資金支援)"
                        />
                      )}
                      {outputNonFinance.length !== 0 && (
                        <Output
                          output={outputNonFinance}
                          name="アウトプット (非資金支援)"
                        />
                      )}
                      {outputAdo.length !== 0 && (
                        <Output output={outputAdo} name="アウトプット" />
                      )}
                      {outputActivitySupport.length !== 0 && (
                        <Output
                          output={outputActivitySupport}
                          name="アウトプット"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {!isSupportTarget && (
                <div id="seventhItem">
                  {!isActivitySupport && (
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
                          strapiBizPlan.activity_season_0.data
                            .childMarkdownRemark.html !== "" && (
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
                          strapiBizPlan.activity_season_1.data
                            .childMarkdownRemark.html !== "" && (
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
                          strapiBizPlan.activity_season_2.data
                            .childMarkdownRemark.html !== "" && (
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
                          strapiBizPlan.activity_season_3.data
                            .childMarkdownRemark.html !== "" && (
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
                            strapiBizPlan.activity_non_0.data
                              .childMarkdownRemark.html !== "" && (
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
                            strapiBizPlan.activity_non_0.data
                              .childMarkdownRemark.html !== "" && (
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
                            strapiBizPlan.activity_non_1.data
                              .childMarkdownRemark.html !== "" && (
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
                            strapiBizPlan.activity_non_2.data
                              .childMarkdownRemark.html !== "" && (
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
                            strapiBizPlan.activity_non_3.data
                              .childMarkdownRemark.html !== "" && (
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
                  )}
                  {activityFinance.length !== 0 && (
                    <Activity
                      activity={activityFinance}
                      name="活動 (資金支援)"
                    />
                  )}
                  {activityNonFinance.length !== 0 && (
                    <Activity
                      activity={activityNonFinance}
                      name="活動 (非資金支援)"
                    />
                  )}
                  {activityAdo.length !== 0 && (
                    <Activity activity={activityAdo} name="活動" />
                  )}
                  {activityActivitySupport.length !== 0 && (
                    <Activity activity={activityActivitySupport} name="活動" />
                  )}
                </div>
              )}
              {(strapiBizPlan.total_business_cost ||
                strapiBizPlan.human_resources.data.childMarkdownRemark.html !==
                  "" ||
                strapiBizPlan.equipment.data.childMarkdownRemark.html !==
                  "") && (
                <div id="eighthItem">
                  <DetailItemWrapper itemName="インプット">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.total_business_cost && (
                        <div>
                          <p css={th}>総事業費</p>
                          <p css={td}>
                            {strapiBizPlan.total_business_cost == null
                              ? ""
                              : `${strapiBizPlan.total_business_cost.toLocaleString()}円`}
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
                              {strapiBizPlan.total_business_cost == null
                                ? ""
                                : `${strapiBizPlan.total_business_cost.toLocaleString()}円`}
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
              )}
              {!isActivitySupport && (
                <>
                  {((strapiBizPlan.pr_strategy &&
                    strapiBizPlan.pr_strategy.data.childMarkdownRemark.html !==
                      "") ||
                    (strapiBizPlan.dialogue_strategy &&
                      strapiBizPlan.dialogue_strategy.data.childMarkdownRemark
                        .html !== "")) && (
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
                            strapiBizPlan.dialogue_strategy.data
                              .childMarkdownRemark.html !== "" && (
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
                  )}
                </>
              )}
              {!isActivitySupport && (
                <>
                  {((strapiBizPlan.sustainability1 &&
                    strapiBizPlan.sustainability1.data.childMarkdownRemark
                      .html !== "") ||
                    (strapiBizPlan.sustainability2 &&
                      strapiBizPlan.sustainability2.data.childMarkdownRemark
                        .html !== "") ||
                    (strapiBizPlan.exit_strategy_fdo &&
                      strapiBizPlan.exit_strategy_fdo.data.childMarkdownRemark
                        .html !== "") ||
                    (strapiBizPlan.exit_strategy_ado &&
                      strapiBizPlan.exit_strategy_ado.data.childMarkdownRemark
                        .html !== "")) && (
                    <div id="tenthItem">
                      <DetailItemWrapper itemName="出口戦略・持続可能性について">
                        <div tw="hidden lg:block">
                          {strapiBizPlan.sustainability1 &&
                            strapiBizPlan.sustainability1.data
                              .childMarkdownRemark.html !== "" && (
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
                            strapiBizPlan.sustainability2.data
                              .childMarkdownRemark.html !== "" && (
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
                          {strapiBizPlan.exit_strategy_fdo &&
                            strapiBizPlan.exit_strategy_fdo.data
                              .childMarkdownRemark.html !== "" && (
                              <div>
                                <p css={th}>資金分配団体</p>
                                <p css={td}>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        strapiBizPlan.exit_strategy_fdo.data.childMarkdownRemark.html.replace(
                                          /\n/g,
                                          "<br />"
                                        ),
                                    }}
                                  />
                                </p>
                              </div>
                            )}
                          {strapiBizPlan.exit_strategy_ado &&
                            strapiBizPlan.exit_strategy_ado.data
                              .childMarkdownRemark.html !== "" && (
                              <div>
                                <p css={th}>実行団体</p>
                                <p css={td}>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        strapiBizPlan.exit_strategy_ado.data.childMarkdownRemark.html.replace(
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
                              strapiBizPlan.sustainability1.data
                                .childMarkdownRemark.html !== "" && (
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
                              strapiBizPlan.sustainability2.data
                                .childMarkdownRemark.html !== "" && (
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
                            {strapiBizPlan.exit_strategy_fdo &&
                              strapiBizPlan.exit_strategy_fdo.data
                                .childMarkdownRemark.html !== "" && (
                                <tr css={tr}>
                                  <th css={th}>資金分配団体</th>
                                  <td css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.exit_strategy_fdo.data.childMarkdownRemark.html.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                      }}
                                    />
                                  </td>
                                </tr>
                              )}
                            {strapiBizPlan.exit_strategy_ado &&
                              strapiBizPlan.exit_strategy_ado.data
                                .childMarkdownRemark.html !== "" && (
                                <tr css={tr}>
                                  <th css={th}>実行団体</th>
                                  <td css={td}>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          strapiBizPlan.exit_strategy_ado.data.childMarkdownRemark.html.replace(
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
                  )}
                </>
              )}
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
                          {strapiBizPlan.ado_image && (
                            <tr css={tr}>
                              <th css={th}>実行団体のイメージ</th>
                              <td css={td}>{strapiBizPlan.ado_image}</td>
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
                                <th css={th}>
                                  {isSpecificBusinessTypeNameYear(
                                    strapiBizPlan.business_type_name,
                                    2024
                                  )
                                    ? "案件発掘の工夫"
                                    : "申請数確保に向けた工夫"}
                                </th>
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
                                <p css={th}>
                                  {isSpecificBusinessTypeNameYear(
                                    strapiBizPlan.business_type_name,
                                    2024
                                  )
                                    ? "案件発掘の工夫"
                                    : "申請数確保に向けた工夫"}
                                </p>
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
                                  {isSpecificBusinessTypeNameYear(
                                    strapiBizPlan.business_type_name,
                                    2024
                                  ) &&
                                  isEmergencySupportGroup(
                                    strapiBizPlan.business_type_name
                                  )
                                    ? "事業実施体制、メンバー構成と各メンバーの役割"
                                    : "メンバー構成と各メンバーの役割"}
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
                                <th css={th}>
                                  {isSpecificBusinessTypeNameYear(
                                    strapiBizPlan.business_type_name,
                                    2024
                                  ) &&
                                  isEmergencySupportGroup(
                                    strapiBizPlan.business_type_name
                                  )
                                    ? "ガバナンス・コンプライアンス体制"
                                    : "想定されるリスクと管理体制"}
                                </th>
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
                                <p css={th}>
                                  {isSpecificBusinessTypeNameYear(
                                    strapiBizPlan.business_type_name,
                                    2024
                                  ) &&
                                  isEmergencySupportGroup(
                                    strapiBizPlan.business_type_name
                                  )
                                    ? "事業実施体制、メンバー構成と各メンバーの役割"
                                    : "メンバー構成と各メンバーの役割"}
                                </p>
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
                                <p css={th}>
                                  {isSpecificBusinessTypeNameYear(
                                    strapiBizPlan.business_type_name,
                                    2024
                                  ) &&
                                  isEmergencySupportGroup(
                                    strapiBizPlan.business_type_name
                                  )
                                    ? "ガバナンス・コンプライアンス体制"
                                    : "想定されるリスクと管理体制"}
                                </p>
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

              {!isActivitySupport && (
                <div id="eleventhItem">
                  <DetailItemWrapper itemName="関連する主な実績">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.subsidy_actual &&
                        strapiBizPlan.subsidy_actual.data.childMarkdownRemark
                          .html !== "" && (
                          <div>
                            <p css={th}>助成事業の実績と成果</p>
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
                            {isSpecificBusinessTypeNameYear(
                              strapiBizPlan.business_type_name,
                              2024
                            ) &&
                            isEmergencySupportGroup(
                              strapiBizPlan.business_type_name
                            )
                              ? "本申請事業について、助成金や寄付等を受け助成金等を分配している(予定を含む)"
                              : "本事業について、コロナウイルス感染症に係る助成金や寄付等を受け助成金等を分配している(予定も含む)"}
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
                            {isSpecificBusinessTypeNameYear(
                              strapiBizPlan.business_type_name,
                              2024
                            ) &&
                            isEmergencySupportGroup(
                              strapiBizPlan.business_type_name
                            )
                              ? "本申請事業以外の事業について、助成金や寄付等を受け助成金等を分配している(予定も含む)"
                              : "本事業以外の事業について、コロナウイルス感染症に係る助成金や寄付等を受け助成金等を分配している(予定も含む)"}
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
                              <th css={th}>助成事業の実績と成果</th>
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
                              {isSpecificBusinessTypeNameYear(
                                strapiBizPlan.business_type_name,
                                2024
                              ) &&
                              isEmergencySupportGroup(
                                strapiBizPlan.business_type_name
                              )
                                ? "本申請事業について、助成金や寄付等を受け助成金等を分配している(予定を含む)"
                                : "本事業について、コロナウイルス感染症に係る助成金や寄付等を受け助成金等を分配している(予定も含む)"}
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
                              {isSpecificBusinessTypeNameYear(
                                strapiBizPlan.business_type_name,
                                2024
                              ) &&
                              isEmergencySupportGroup(
                                strapiBizPlan.business_type_name
                              )
                                ? "本申請事業以外の事業について、助成金や寄付等を受け助成金等を分配している(予定も含む)"
                                : "本事業以外の事業について、コロナウイルス感染症に係る助成金や寄付等を受け助成金等を分配している(予定も含む)"}
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
              )}
              {strapiBizPlan.recruit_ingenuity && (
                <div id="">
                  <DetailItemWrapper itemName="支援対象団体の募集/選定">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.recruit_ingenuity && (
                        <div>
                          <p css={th}>募集方法や案件発掘の工夫</p>
                          <p css={td}>{strapiBizPlan.recruit_ingenuity}</p>
                        </div>
                      )}
                      {strapiBizPlan.issue_consideration && (
                        <div>
                          <p css={th}>
                            支援対象団体が抱える課題の検証方法（組織診断方法等）
                          </p>
                          <p css={td}>{strapiBizPlan.issue_consideration}</p>
                        </div>
                      )}
                      {strapiBizPlan.transparency && (
                        <div>
                          <p css={th}>
                            休眠預金等活用事業に係る既存関係先との透明性確保
                          </p>
                          <p css={td}>{strapiBizPlan.transparency}</p>
                        </div>
                      )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.recruit_ingenuity && (
                          <tr css={tr}>
                            <th css={th}>募集方法や案件発掘の工夫</th>
                            <td css={td}>{strapiBizPlan.recruit_ingenuity}</td>
                          </tr>
                        )}
                        {strapiBizPlan.issue_consideration && (
                          <tr css={tr}>
                            <th css={th}>
                              支援対象団体が抱える課題の検証方法（組織診断方法等）
                            </th>
                            <td css={td}>
                              {strapiBizPlan.issue_consideration}
                            </td>
                          </tr>
                        )}
                        {strapiBizPlan.transparency && (
                          <tr css={tr}>
                            <th css={th}>
                              休眠預金等活用事業に係る既存関係先との透明性確保
                            </th>
                            <td css={td}>{strapiBizPlan.transparency}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
              )}
              {strapiBizPlan.expertise && (
                <div id="">
                  <DetailItemWrapper itemName="主な実績と実施体制">
                    <div tw="hidden lg:block">
                      {strapiBizPlan.expertise && (
                        <div>
                          <p css={th}>専門性・強み</p>
                          <p css={td}>{strapiBizPlan.expertise}</p>
                        </div>
                      )}
                    </div>
                    <table css={table} tw="lg:hidden">
                      <tbody>
                        {strapiBizPlan.expertise && (
                          <tr css={tr}>
                            <th css={th}>専門性・強み</th>
                            <td css={td}>{strapiBizPlan.expertise}</td>
                          </tr>
                        )}
                        {strapiBizPlan.achievements && (
                          <tr css={tr}>
                            <th css={th}>支援実績と成果</th>
                            <td css={td}>{strapiBizPlan.achievements}</td>
                          </tr>
                        )}
                        {strapiBizPlan.knowhow && (
                          <tr css={tr}>
                            <th css={th}>支援ノウハウ</th>
                            <td css={td}>{strapiBizPlan.knowhow}</td>
                          </tr>
                        )}
                        {strapiBizPlan.exec_structure && (
                          <tr css={tr}>
                            <th css={th}>実施体制</th>
                            <td css={td}>{strapiBizPlan.exec_structure}</td>
                          </tr>
                        )}
                        {strapiBizPlan.conso_exist && (
                          <tr css={tr}>
                            <th css={th}>コンソーシアム利用有無</th>
                            <td css={td}>
                              {strapiBizPlan.conso_exist === "1"
                                ? "あり"
                                : "なし"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </DetailItemWrapper>
                </div>
              )}
              {strapiBizPlan.governance_structure && (
                <div id="">
                  <DetailItemWrapper itemName="ガバナンス・コンプライアンス体制">
                    <p css={td}>{strapiBizPlan.governance_structure}</p>
                  </DetailItemWrapper>
                </div>
              )}
              {keikaushoFile.length !== 0 && (
                <div id="">
                  <DetailItemWrapper itemName="支援対象活動計画書">
                    <div tw="flex gap-[5px] flex-wrap">
                      {keikaushoFile.map((tf: any) => (
                        <AttachedFileLink
                          filePath={tf.node.data.url}
                          fileName={tf.node.file_name}
                          key={tf.node.data.url}
                        />
                      ))}
                    </div>
                  </DetailItemWrapper>
                </div>
              )}
            </div>
          </div>
        )}
        {bizPlanManual && pdfUrl && (
          <div>
            <iframe width="100%" height="500px" src={pdfUrl}></iframe>
          </div>
        )}
      </DetailWrapper>
    </Layout>
  );
};

export default ProjectPlan;

const ShortOutcome = ({
  shortOutcome,
  name,
}: {
  shortOutcome: any;
  name: string;
}) => {
  return (
    <DetailItemWrapper itemName={name}>
      <table css={table}>
        {shortOutcome.map((item: any, i: number) => (
          <tbody key={name + i}>
            <tr>
              <th css={th2Sub} rowSpan={10}>
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
                {item.node.goals_monitoring.data.goals_monitoring === "true" ||
                item.node.goals_monitoring.data.goals_monitoring === "1"
                  ? "はい"
                  : "いいえ"}
              </p>
            </div>
            {item.node.goals_index.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.goals_index_arrival.data.childMarkdownRemark.html !==
              "" && (
              <div css={tr} tw="hidden lg:block">
                <p css={th}>実施・到達状況の目安とする指標</p>
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
            )}
            {item.node.goals_grasp.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.goals_initial.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.goals_goal.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.goals_achievement.data.childMarkdownRemark.html !==
              "" && (
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
            )}
            {item.node.goals_mid_eval.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.goals_aft_eval.data.childMarkdownRemark.html !== "" && (
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
            )}

            <tr css={tr} tw="lg:hidden">
              <th css={th}>モニタリング</th>
              <td css={td}>
                {item.node.goals_monitoring.data.goals_monitoring === "true" ||
                item.node.goals_monitoring.data.goals_monitoring === "1"
                  ? "はい"
                  : "いいえ"}
              </td>
            </tr>
            {item.node.goals_index.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.goals_index_arrival.data.childMarkdownRemark.html !==
              "" && (
              <tr css={tr} tw="lg:hidden">
                <th css={th}>実施・到達状況の目安とする指標</th>
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
            )}
            {item.node.goals_grasp.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.goals_initial.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.goals_goal.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.goals_achievement.data.childMarkdownRemark.html !==
              "" && (
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
            )}
            {item.node.goals_mid_eval.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.goals_aft_eval.data.childMarkdownRemark.html !== "" && (
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
            )}
          </tbody>
        ))}
      </table>
    </DetailItemWrapper>
  );
};

const Output = ({ output, name }: { output: any; name: string }) => {
  return (
    <DetailItemWrapper itemName={name}>
      <table css={table}>
        {output.map((item: any, i: number) => (
          <tbody key={name + i}>
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
                {item.node.output_monitor.data.output_monitor === "true" ||
                item.node.output_monitor.data.output_monitor === "1"
                  ? "はい"
                  : "いいえ"}
              </p>
            </div>
            {item.node.output_index.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_index_arrival.data.childMarkdownRemark.html !==
              "" && (
              <div css={tr} tw="hidden lg:block">
                <p css={th}>実施・到達状況の目安とする指標</p>
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
            )}
            {item.node.output_grasp.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_initial.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_goal.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_achievement.data.childMarkdownRemark.html !==
              "" && (
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
            )}
            {item.node.output_activity.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_season.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_mid_eval.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_aft_eval.data.childMarkdownRemark.html !== "" && (
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
            )}

            <tr css={tr} tw="lg:hidden">
              <th css={th}>モニタリング</th>
              <td css={td}>
                {item.node.output_monitor.data.output_monitor === "true" ||
                item.node.output_monitor.data.output_monitor === "1"
                  ? "はい"
                  : "いいえ"}
              </td>
            </tr>
            {item.node.output_index.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_index_arrival.data.childMarkdownRemark.html !==
              "" && (
              <tr css={tr} tw="lg:hidden">
                <th css={th}>実施・到達状況の目安とする指標</th>
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
            )}
            {item.node.output_grasp.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_initial.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_goal.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_achievement.data.childMarkdownRemark.html !==
              "" && (
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
            )}
            {item.node.output_activity.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_season.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_mid_eval.data.childMarkdownRemark.html !== "" && (
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
            )}
            {item.node.output_aft_eval.data.childMarkdownRemark.html !== "" && (
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
            )}
          </tbody>
        ))}
      </table>
    </DetailItemWrapper>
  );
};

const Activity = ({ activity, name }: { activity: any; name: string }) => {
  return (
    <DetailItemWrapper itemName={name}>
      <table css={table}>
        {activity.map((item: any, i: number) => (
          <tbody key={name + i}>
            <tr tw="hidden lg:table-row">
              <th css={th2Sub} rowSpan={2}>
                {i + 1}
              </th>
              <td>
                <div>
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
              </td>
            </tr>
            {item.node.activity_season.data.childMarkdownRemark.html !== "" && (
              <tr tw="hidden lg:table-row">
                <td>
                  <div>
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
            )}

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
            {item.node.activity_season.data.childMarkdownRemark.html !== "" && (
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
            )}
          </tbody>
        ))}
      </table>
    </DetailItemWrapper>
  );
};

export const pageQuery = graphql`
  query MyQuery($slug: String!, $insert_id: String!) {
    strapiBizPlanManualFDO: strapiBizPlanManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      data {
        url
      }
      updatedAt(formatString: "YYYY/MM/DD")
    }
    strapiBizPlanManualADO: strapiBizPlanManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      data {
        url
      }
      updatedAt(formatString: "YYYY/MM/DD")
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
      support_category
      org_num
      org_area
      org_scale
      org_impact
      recruit_ingenuity
      issue_consideration
      transparency
      expertise
      achievements
      knowhow
      exec_structure
      conso_exist
      governance_structure
      kokugaikatudou
      ado_image
    }
    allStrapiAttachedFile(filter: { insert_id: { eq: $insert_id } }) {
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

// getServerData関数を追加
export async function getServerData(props: any): Promise<any> {
  const slug = props.params.slug;
  const apiUrl = process.env.STRAPI_API_URL;
  const token = process.env.STRAPI_TOKEN;

  if (!apiUrl || !token || !slug) {
    console.error("Missing Strapi API URL, Token, or slug for SSR");
    return {
      status: 500,
      props: {
        ssrAllStrapiBizPlanSub: { edges: [] }, // エラー時は空データを返す
      },
    };
  }

  // Strapi APIからbiz-plan-subsを取得 (フィルタリングと必要なフィールドを指定)
  // 注意: Strapiのフィルタリング構文に合わせてください。下記は例です。
  // populate=* で全ての関連データを取得するか、必要なフィールドを明示的に指定します。
  // レスポンス形式に合わせてデータ整形が必要です。
  const strapiApiEndpoint = `${apiUrl}/api/biz-plan-subs?filters[business_cd][$eq]=${slug}&populate=*`; // populateは必要に応じて調整

  try {
    const response = await fetch(strapiApiEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Strapi data: ${response.statusText}`);
    }

    const json = await response.json();
    const rawData = json.data; // Strapiのレスポンス構造に合わせて調整

    // Strapi APIのレスポンスをGraphQLの { edges: [{ node: ... }] } 形式に整形
    const formattedData: any = {
      edges: rawData.map((item: any) => ({
        node: {
          ...item.attributes,
          business_goals: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.business_goals || "",
              },
            },
          },
          goals_monitoring: {
            data: { goals_monitoring: item.attributes.goals_monitoring || "" },
          },
          goals_index: {
            data: {
              childMarkdownRemark: { html: item.attributes.goals_index || "" },
            },
          },
          goals_index_arrival: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.goals_index_arrival || "",
              },
            },
          },
          goals_grasp: {
            data: {
              childMarkdownRemark: { html: item.attributes.goals_grasp || "" },
            },
          },
          goals_initial: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.goals_initial || "",
              },
            },
          },
          goals_goal: {
            data: {
              childMarkdownRemark: { html: item.attributes.goals_goal || "" },
            },
          },
          goals_achievement: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.goals_achievement || "",
              },
            },
          },
          goals_mid_eval: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.goals_mid_eval || "",
              },
            },
          },
          goals_aft_eval: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.goals_aft_eval || "",
              },
            },
          },
          output: {
            data: {
              childMarkdownRemark: { html: item.attributes.output || "" },
            },
          },
          output_monitor: {
            data: { output_monitor: item.attributes.output_monitor || "" },
          },
          output_index: {
            data: {
              childMarkdownRemark: { html: item.attributes.output_index || "" },
            },
          },
          output_index_arrival: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.output_index_arrival || "",
              },
            },
          },
          output_grasp: {
            data: {
              childMarkdownRemark: { html: item.attributes.output_grasp || "" },
            },
          },
          output_initial: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.output_initial || "",
              },
            },
          },
          output_goal: {
            data: {
              childMarkdownRemark: { html: item.attributes.output_goal || "" },
            },
          },
          output_achievement: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.output_achievement || "",
              },
            },
          },
          output_activity: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.output_activity || "",
              },
            },
          },
          output_season: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.output_season || "",
              },
            },
          },
          output_mid_eval: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.output_mid_eval || "",
              },
            },
          },
          output_aft_eval: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.output_aft_eval || "",
              },
            },
          },
          activity: {
            data: {
              childMarkdownRemark: { html: item.attributes.activity || "" },
            },
          },
          activity_season: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.activity_season || "",
              },
            },
          },
          sdgs_description: {
            data: {
              childMarkdownRemark: {
                html: item.attributes.sdgs_description || "",
              },
            },
          },
        },
      })),
    };

    return {
      props: {
        ssrAllStrapiBizPlanSub: formattedData,
      },
    };
  } catch (error) {
    console.error("Error fetching Strapi data in getServerData:", error);
    return {
      status: 500,
      props: {
        ssrAllStrapiBizPlanSub: { edges: [] }, // エラー時は空データを返す
      },
    };
  }
}
