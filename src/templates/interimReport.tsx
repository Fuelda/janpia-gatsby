import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import { detailAnchor, detailBody } from "../styles/detailPage";
import Seo from "../components/lauout/Seo";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import { LshapeTableRow, ScrollTable, Td, Th } from "./progressReport";
import DetailAnchor from "../components/atoms/DetailAnchor";
import { useAttachedFile } from "../hooks/useAttachedFile";
import AttachedFileLink from "../components/atoms/AttachedFileLink";
import tw from "twin.macro";
import { formatDate } from "../util/formatDate";

const InterimReport: React.FC<any> = ({ data, serverData, pageContext }) => {
  const { slug } = pageContext;
  const {
    strapiMidReport,
    strapiMidReportManualFDO,
    strapiMidReportManualADO,
  } = data;
  const insertId = strapiMidReport && strapiMidReport.insert_id;
  const { attachedFileData } = useAttachedFile(insertId);

  // SSRで取得したデータを既存の変数名で扱う
  const allStrapiMidReportSub = serverData?.ssrAllStrapiMidReportSub;

  const implementSystem =
    allStrapiMidReportSub &&
    allStrapiMidReportSub.edges.length > 0 &&
    allStrapiMidReportSub.edges
      .filter((mrs: any) => mrs.node.info_type === "10")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const output =
    allStrapiMidReportSub &&
    allStrapiMidReportSub.edges.length > 0 &&
    allStrapiMidReportSub.edges
      .filter((mrs: any) => mrs.node.info_type === "20")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const outcome =
    allStrapiMidReportSub &&
    allStrapiMidReportSub.edges.length > 0 &&
    allStrapiMidReportSub.edges
      .filter((mrs: any) => mrs.node.info_type === "21")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);

  const strapiMidReportManual =
    strapiMidReportManualFDO || strapiMidReportManualADO;

  const pdfUrl =
    strapiMidReportManual &&
    strapiMidReportManual.data &&
    `https://docs.google.com/viewer?url=${strapiMidReportManual.data.url}&embedded=true`;

  return (
    <Layout>
      <Seo title="中間評価報告 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <DetailWrapper
        category="中間評価報告"
        slug={slug}
        updatedAt={
          (strapiMidReport && strapiMidReport.updatedAt) ||
          (strapiMidReportManual && strapiMidReportManual.updatedAt)
        }
      >
        {strapiMidReport && (
          <div css={detailAnchor}>
            <DetailAnchor
              title="評価計画"
              anchor={`/result/${slug}/interim-report/#firstItem`}
            />
            <DetailAnchor
              title="事業進捗の評価"
              anchor={`/result/${slug}/interim-report/#secondItem`}
            />
            <DetailAnchor
              title="事業の改善結果"
              anchor={`/result/${slug}/interim-report/#thirdItem`}
            />
            <DetailAnchor
              title="広報に関する報告"
              anchor={`/result/${slug}/interim-report/#fourthItem`}
            />
            {attachedFileData.length > 0 && (
              <DetailAnchor
                title="添付欄"
                anchor={`/result/${slug}/interim-report/#sixthItem`}
              />
            )}
          </div>
        )}
        <div css={detailBody}>
          {strapiMidReportManual && pdfUrl && (
            <div>
              <iframe width="100%" height="500px" src={pdfUrl}></iframe>
            </div>
          )}
          {strapiMidReport && (
            <>
              <div id="firstItem">
                <h2 tw="font-bold mb-4 text-lg">評価計画</h2>
                <DetailItemWrapper itemName="中間評価の目的：事業中間時点でみえてきた事業上の課題とそれを改善するために中間評価で確認したいこと">
                  <div>
                    <table tw="lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Th tw="w-1/4">
                            事業中間時点でみえてきた事業上の課題
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.biz_task.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>
                            事業上の課題を改善するために中間評価で確認したいこと
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.check_list.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DetailItemWrapper>
              </div>
              <div>
                <DetailItemWrapper itemName="実施体制">
                  <div tw="lg:overflow-x-scroll">
                    <ScrollTable>
                      <tbody>
                        {implementSystem.map((item: any, index: number) => (
                          <>
                            <tr>
                              <Th
                                rowSpan={4}
                                key={index}
                                tw="w-[6%] text-center"
                              >
                                {index + 1}
                              </Th>
                              <Th tw="w-1/4">内部／外部</Th>
                              <Td>{item.node.str_inout}</Td>
                            </tr>
                            <tr>
                              <Th>評価担当分野</Th>
                              <Td>{item.node.str_area}</Td>
                            </tr>
                            <tr>
                              <Th>氏名</Th>
                              <Td>{item.node.str_name}</Td>
                            </tr>
                            <tr>
                              <Th>団体・役職</Th>
                              <Td>{item.node.str_post}</Td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              <div>
                <DetailItemWrapper itemName="実施状況を把握・検証するために実施する調査">
                  <div>
                    <table tw="lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Th tw="w-1/4">調査方法</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.status_res_method.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>調査実施時期</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.status_res_period.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>調査結果の検証方法</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.status_ver_method.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DetailItemWrapper>
              </div>
              <div>
                <DetailItemWrapper itemName="事業設計図の検証方法">
                  <div>
                    <table tw="lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Th tw="w-1/4">検証方法</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.plan_ver_method.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>実施時期</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.plan_ver_period.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>事業計画書や資金計画書への反映実施時期</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.plan_ref_period.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DetailItemWrapper>
              </div>
              <div id="secondItem">
                <h2 tw="font-bold mb-4 text-lg">事業進捗の評価</h2>
                <DetailItemWrapper itemName="アウトプットの実績">
                  <div tw="lg:overflow-x-scroll">
                    <ScrollTable>
                      {output.map((item: any, index: number) => (
                        <tbody>
                          <tr>
                            <Th rowSpan={7} key={index} tw="w-[6%]">
                              {index + 1}
                            </Th>
                            <Th tw="w-1/4">アウトプット</Th>
                            <Td>{item.node.op_output}</Td>
                          </tr>
                          {item.node.op_sikinteki && (
                            <tr>
                              <Th>資金支援/非資金的支援</Th>
                              <Td>{item.node.op_sikinteki}</Td>
                            </tr>
                          )}
                          <tr>
                            <Th>指標</Th>
                            <Td>{item.node.op_index}</Td>
                          </tr>
                          <tr>
                            <Th>中間評価時の値・状態</Th>
                            <Td>{item.node.op_goal_mid}</Td>
                          </tr>
                          <tr>
                            <Th>事後評価時の値・状態</Th>
                            <Td>{item.node.op_goal_aft}</Td>
                          </tr>
                          <tr>
                            <Th>現在の指標の達成状況</Th>
                            <Td>{item.node.op_achieve}</Td>
                          </tr>
                          <tr>
                            <Th>進捗状況</Th>
                            <Td>{item.node.op_progress}</Td>
                          </tr>
                        </tbody>
                      ))}
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              {strapiMidReport.oc_related_change.data.childMarkdownRemark
                .html && (
                <div>
                  <DetailItemWrapper itemName="短期アウトカムにつながりそうな、活動直後にみられた受益者、対象者、関係団体等の変化（言動）があれば記載してください。 ">
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            strapiMidReport.oc_related_change.data.childMarkdownRemark.html.replace(
                              /\n/g,
                              "<br />"
                            ),
                        }}
                        tw="py-3 px-3.5 border-gray-border border text-start break-all lg:(py-2 px-2)"
                      />
                    </div>
                  </DetailItemWrapper>
                </div>
              )}
              <div>
                <DetailItemWrapper itemName="短期アウトカムの進捗状況">
                  <div tw="lg:overflow-x-scroll">
                    <ScrollTable>
                      {outcome.map((item: any, index: number) => (
                        <tbody>
                          <tr>
                            <Th rowSpan={6} key={index} tw="w-[6%]">
                              {index + 1}
                            </Th>
                            <Th tw="w-1/4">アウトカムで捉える変化の主体</Th>
                            <Td
                              css={
                                item.node.oc_sikinteki === "非資金的支援" &&
                                tw`bg-gray-pale text-gray-black`
                              }
                            >
                              {item.node.oc_sikinteki === "非資金的支援"
                                ? ""
                                : item.node.oc_actor}
                            </Td>
                          </tr>
                          {item.node.oc_sikinteki && (
                            <tr>
                              <Th>資金支援/非資金的支援</Th>
                              <Td>{item.node.oc_sikinteki}</Td>
                            </tr>
                          )}
                          <tr>
                            <Th>指標</Th>
                            <Td>{item.node.oc_index}</Td>
                          </tr>
                          <tr>
                            <Th>中間評価時の値・状態</Th>
                            <Td>{item.node.oc_goal_mid}</Td>
                          </tr>
                          <tr>
                            <Th>事後評価時の値・状態</Th>
                            <Td>{item.node.oc_goal_aft}</Td>
                          </tr>
                          <tr>
                            <Th>
                              これまでの活動をとおして把握している変化・改善状況
                            </Th>
                            <Td>{item.node.oc_status}</Td>
                          </tr>
                        </tbody>
                      ))}
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              <div>
                <DetailItemWrapper itemName="短期アウトカムの状態の変化・改善に貢献した要因や事例">
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          strapiMidReport.oc_change_factor.data.childMarkdownRemark.html.replace(
                            /\n/g,
                            "<br />"
                          ),
                      }}
                      tw="py-3 px-3.5 border-gray-border border text-start break-all lg:(py-2 px-2)"
                    />
                  </div>
                </DetailItemWrapper>
              </div>
              <div>
                <DetailItemWrapper itemName="事前評価時には想定していなかった変化・影響">
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          strapiMidReport.unexpected_change.data.childMarkdownRemark.html.replace(
                            /\n/g,
                            "<br />"
                          ),
                      }}
                      tw="py-3 px-3.5 border-gray-border border text-start break-all lg:(py-2 px-2)"
                    />
                  </div>
                </DetailItemWrapper>
              </div>
              <div>
                <DetailItemWrapper itemName="事業進捗の評価">
                  <div tw="lg:overflow-x-scroll">
                    <ScrollTable>
                      <thead>
                        <tr>
                          <Th tw="w-1/4">評価の視点</Th>
                          <Th>自己評価（価値判断）結果</Th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <Th>
                            アウトカムが発現するための活動が適切に実施され、アウトプットは想定どおり積み上げられているか
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.eval_6a.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>
                            アウトカム発現への貢献要因や阻害要因を把握し、事業改善につなげられているか
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.eval_6b.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>
                            組織基盤強化や、事業活動が円滑に進むための環境づくりができているか。また事業終了後を見据え、活動が継続するための取り組みが進んでいるか
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.eval_6c.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              <div id="thirdItem">
                <h2 tw="font-bold mb-4 text-lg">事業の改善結果</h2>
                <DetailItemWrapper itemName="事業の改善結果">
                  <div tw="lg:overflow-x-scroll">
                    <ScrollTable>
                      <thead>
                        <tr>
                          <Th tw="w-1/4">項目</Th>
                          <Th>内容</Th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <Th>事業設計（ロジックモデル）の改善ポイント</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.res_point_design.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>事業計画書の改善ポイント</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.res_point_plan.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>その他</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiMidReport.res_point_etc.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              <div>
                <DetailItemWrapper itemName="事業で最も重視する指標・変化">
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          strapiMidReport.metrics_important.data.childMarkdownRemark.html.replace(
                            /\n/g,
                            "<br />"
                          ),
                      }}
                      tw="py-3 px-3.5 border-gray-border border text-start break-all lg:(py-2 px-2)"
                    />
                  </div>
                </DetailItemWrapper>
              </div>
              <div id="fourthItem">
                <h2 tw="font-bold mb-4 text-lg">広報に関する報告</h2>
                <DetailItemWrapper itemName="シンボルマークの活用状況">
                  <div>
                    <table tw="table-fixed lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Td>
                            <p>
                              {strapiMidReport.symbolmark_web === "1" &&
                                "自団体のウェブサイトで表示"}
                            </p>
                            <p>
                              {strapiMidReport.symbolmark_seisaku === "1" &&
                                "広報制作物に表示"}
                            </p>
                            <p>
                              {strapiMidReport.symbolmark_houkoku === "1" &&
                                "報告書に表示"}
                            </p>
                            <p>
                              {strapiMidReport.symbolmark_event === "1" &&
                                "イベント実施時に表示"}
                            </p>
                            <p>
                              {strapiMidReport.symbolmark_etc === "1" &&
                                "その他：" + strapiMidReport.etc_1_1}
                            </p>
                          </Td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DetailItemWrapper>
              </div>
              <div>
                <DetailItemWrapper itemName="広報">
                  <div tw="lg:overflow-x-scroll">
                    <ScrollTable>
                      <tbody>
                        <LshapeTableRow
                          heading="メディア掲載（TV・ラジオ・新聞・雑誌・WEB等）"
                          status={strapiMidReport.joukyou_1}
                          content={
                            strapiMidReport.naiyou_1.data.childMarkdownRemark
                              .html
                          }
                        />
                        <LshapeTableRow
                          heading="広報制作物等"
                          status={strapiMidReport.joukyou_2}
                          content={
                            strapiMidReport.naiyou_2.data.childMarkdownRemark
                              .html
                          }
                        />
                        <LshapeTableRow
                          heading="報告書等"
                          status={strapiMidReport.joukyou_3}
                          content={
                            strapiMidReport.naiyou_3.data.childMarkdownRemark
                              .html
                          }
                        />
                        <LshapeTableRow
                          heading="イベント開催等（シンポジウム、フォーラム等）"
                          status={strapiMidReport.joukyou_4}
                          content={
                            strapiMidReport.naiyou_4.data.childMarkdownRemark
                              .html
                          }
                        />
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              {attachedFileData.length > 0 && (
                <div id="sixth">
                  <DetailItemWrapper itemName="添付欄">
                    <div tw="flex gap-[5px] flex-wrap">
                      {attachedFileData.map((file) => (
                        <AttachedFileLink
                          filePath={file.url}
                          fileName={file.fileName}
                          key={file.url}
                        />
                      ))}
                    </div>
                  </DetailItemWrapper>
                </div>
              )}
            </>
          )}
        </div>
      </DetailWrapper>
    </Layout>
  );
};

export default InterimReport;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiMidReport(business_cd: { eq: $slug }) {
      biz_cd_executive
      biz_cd_fund_distr
      biz_task {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      business_cd
      business_org_type
      business_type_cd
      business_type_name
      check_list {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      etc_1_1
      eval_6a {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      eval_6b {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      eval_6c {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      executive_grp_cd
      fund_distr_grp_cd
      insert_id
      joukyou_1
      joukyou_2
      joukyou_3
      joukyou_4
      metrics_important {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_1 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_2 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_3 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_4 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      oc_change_factor {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      oc_related_change {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      plan_ref_period {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      plan_ver_method {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      plan_ver_period {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      res_point_design {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      res_point_etc {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      res_point_plan {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      select_bp
      status_res_method {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      status_res_period {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      status_ver_method {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      symbolmark_etc
      symbolmark_event
      symbolmark_houkoku
      symbolmark_seisaku
      symbolmark_web
      unexpected_change {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      updatedAt(formatString: "YYYY/MM/DD")
    }
    strapiMidReportManualFDO: strapiMidReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
      biz_cd_executive
      biz_cd_fund_distr
      business_org_type
      data {
        url
      }
    }
    strapiMidReportManualADO: strapiMidReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
      biz_cd_executive
      biz_cd_fund_distr
      business_org_type
      data {
        url
      }
    }
  }
`;

export async function getServerData(props: any): Promise<any> {
  const slug = props.params.slug;
  const apiUrl = process.env.STRAPI_API_URL;
  const token = process.env.STRAPI_TOKEN;

  if (!apiUrl || !token || !slug) {
    console.error("Missing Strapi API URL, Token, or slug for SSR");
    return {
      status: 500,
      props: {
        ssrAllStrapiMidReportSub: { edges: [] },
      },
    };
  }

  const strapiApiEndpoint = `${apiUrl}/api/mid-report-subs?filters[business_cd][$eq]=${slug}&populate=*`;

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
    const rawData = json.data;

    const formattedData: any = {
      edges: rawData.map((item: any) => {
        const attributes = item.attributes;
        const nodeData: any = { ...attributes };
        // updatedAtのフォーマット
        if (nodeData.updatedAt) {
          nodeData.updatedAt = formatDate(nodeData.updatedAt);
        }
        return { node: nodeData };
      }),
    };

    return {
      props: {
        ssrAllStrapiMidReportSub: formattedData,
      },
    };
  } catch (error) {
    console.error("Error fetching Strapi data in getServerData:", error);
    return {
      status: 500,
      props: {
        ssrAllStrapiMidReportSub: { edges: [] },
      },
    };
  }
}
