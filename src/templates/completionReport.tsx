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
import useStrapiPdf from "../hooks/useStrapiPdf";
import { formatAndConvertNextDate } from "../util/formatDate";

const CompletionReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const {
    strapiCompleteReport,
    allStrapiCompleteReportSub,
    strapiCompleteReportManualFDO,
    strapiCompleteReportManualADO,
  } = data;
  const insertId = strapiCompleteReport && strapiCompleteReport.insert_id;
  const { attachedFileData } = useAttachedFile(insertId);

  const outcome =
    allStrapiCompleteReportSub.edges.length > 0 &&
    allStrapiCompleteReportSub.edges
      .filter((mrs: any) => mrs.node.info_type === "10")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const output =
    allStrapiCompleteReportSub.edges.length > 0 &&
    allStrapiCompleteReportSub.edges
      .filter((mrs: any) => mrs.node.info_type === "11")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const activity =
    allStrapiCompleteReportSub.edges.length > 0 &&
    allStrapiCompleteReportSub.edges
      .filter((mrs: any) => mrs.node.info_type === "12")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const work =
    allStrapiCompleteReportSub.edges.length > 0 &&
    allStrapiCompleteReportSub.edges
      .filter((mrs: any) => mrs.node.info_type === "20")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const performance =
    allStrapiCompleteReportSub.edges.length > 0 &&
    allStrapiCompleteReportSub.edges
      .filter((mrs: any) => mrs.node.info_type === "30")
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);

  const strapiCompleteReportManual =
    strapiCompleteReportManualFDO || strapiCompleteReportManualADO;
  const { pdfUrl, isPdfLoading } = useStrapiPdf(
    slug,
    "complete-report-manuals"
  );

  return (
    <Layout>
      <Seo title="事業完了報告 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <DetailWrapper
        category="事業完了報告"
        slug={slug}
        updatedAt={
          (strapiCompleteReport && strapiCompleteReport.updatedAt) ||
          (strapiCompleteReportManual && strapiCompleteReportManual.updatedAt)
        }
      >
        {strapiCompleteReport && (
          <div css={detailAnchor}>
            <DetailAnchor
              title="事業概要"
              anchor={`/result/${slug}/completion-report/#firstItem`}
            />
            {strapiCompleteReport.soukatsu.data.childMarkdownRemark.html && (
              <DetailAnchor
                title="事業総括"
                anchor={`/result/${slug}/completion-report/#thirdItem`}
              />
            )}
            {strapiCompleteReport.kadai.data.childMarkdownRemark.html && (
              <DetailAnchor
                title="課題・事業設計の振返り"
                anchor={`/result/${slug}/completion-report/#fourthItem`}
              />
            )}
            {outcome.length > 0 && (
              <DetailAnchor
                title="今回の事業実施で達成される状態"
                anchor={`/result/${slug}/completion-report/#eleventhItem`}
              />
            )}
            {work.length > 0 && (
              <DetailAnchor
                title="資金分配団体としての非資金的支援の取り組み総括"
                anchor={`/result/${slug}/completion-report/#twelfthItem`}
              />
            )}
            {strapiCompleteReport.unexp_outcome.data.childMarkdownRemark
              .html && (
              <DetailAnchor
                title="想定外のアウトカム、活動、波及効果など"
                anchor={`/result/${slug}/completion-report/#fifthItem`}
              />
            )}
            {strapiCompleteReport.task_change.data.childMarkdownRemark.html && (
              <DetailAnchor
                title="事業終了時の課題を取り巻く環境や対象者の変化と次の活動"
                anchor={`/result/${slug}/completion-report/#sixthItem`}
              />
            )}
            {performance.length > 0 && (
              <DetailAnchor
                title="外部との連携実績"
                anchor={`/result/${slug}/completion-report/#thirteenthItem`}
              />
            )}
            <DetailAnchor
              title="広報実績"
              anchor={`/result/${slug}/completion-report/#secondItem`}
            />
            <DetailAnchor
              title="ガバナンス・コンプライアンス実績"
              anchor={`/result/${slug}/completion-report/#seventhItem`}
            />
            {strapiCompleteReport.etc.data.childMarkdownRemark.html && (
              <DetailAnchor
                title="その他"
                anchor={`/result/${slug}/completion-report/#eighthItem`}
              />
            )}
            {attachedFileData.length > 0 && (
              <DetailAnchor
                title="添付欄"
                anchor={`/result/${slug}/completion-report/#tenthItem`}
              />
            )}
          </div>
        )}
        <div css={detailBody}>
          {strapiCompleteReportManual && pdfUrl && (
            <div>
              {isPdfLoading ? (
                <p>Loading...</p>
              ) : (
                <iframe width="100%" height="500px" src={pdfUrl}></iframe>
              )}
            </div>
          )}
          {strapiCompleteReport && (
            <>
              <div id="firstItem">
                <DetailItemWrapper itemName="事業概要">
                  <div>
                    <table>
                      <tr>
                        <Th tw="w-[25%]">実施時期</Th>
                        <Td>
                          開始日{" "}
                          {formatAndConvertNextDate(
                            strapiCompleteReport.business_period_s
                          )}
                        </Td>
                        <Td>
                          終了日{" "}
                          {formatAndConvertNextDate(
                            strapiCompleteReport.business_period_e
                          )}
                        </Td>
                      </tr>
                      <tr>
                        <Th>対象地域</Th>
                        <Td colSpan={2}>{strapiCompleteReport.taisyoutiiki}</Td>
                      </tr>
                      <tr>
                        <Th>事業対象者</Th>
                        <Td colSpan={2}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                strapiCompleteReport.jigyoutaisyousya.data.childMarkdownRemark.html.replace(
                                  /\n/g,
                                  "<br />"
                                ),
                            }}
                          />
                        </Td>
                      </tr>
                      <tr>
                        <Th>事業対象者人数</Th>
                        <Td colSpan={2}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                strapiCompleteReport.jigyoutaisyousya_n.data.childMarkdownRemark.html.replace(
                                  /\n/g,
                                  "<br />"
                                ),
                            }}
                          />
                        </Td>
                      </tr>
                      <tr>
                        <Th>事業概要</Th>
                        <Td colSpan={2}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                strapiCompleteReport.jigyougaiyou.data.childMarkdownRemark.html.replace(
                                  /\n/g,
                                  "<br />"
                                ),
                            }}
                          />
                        </Td>
                      </tr>
                      {strapiCompleteReport.ado_count && (
                        <tr>
                          <Th>実行団体数</Th>
                          <Td colSpan={2}>{strapiCompleteReport.ado_count}</Td>
                        </tr>
                      )}
                    </table>
                  </div>
                </DetailItemWrapper>
              </div>
              {strapiCompleteReport.soukatsu.data.childMarkdownRemark.html && (
                <div id="thirdItem">
                  <DetailItemWrapper itemName="事業の総括およびその価値">
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            strapiCompleteReport.soukatsu.data.childMarkdownRemark.html.replace(
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
              {strapiCompleteReport.kadai.data.childMarkdownRemark.html && (
                <div id="fourthItem">
                  <DetailItemWrapper itemName="課題設定、事業設計に関する振返り">
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            strapiCompleteReport.kadai.data.childMarkdownRemark.html.replace(
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
              {outcome.length > 0 && (
                <div id="eleventhItem">
                  <DetailItemWrapper itemName="今回の事業実施で達成される状態">
                    <p tw="font-bold mb-4">短期アウトカム</p>
                    <div tw="lg:overflow-x-scroll">
                      <ScrollTable>
                        <tbody>
                          {outcome.map((item: any, index: number) => (
                            <>
                              <tr>
                                <Th rowSpan={5} key={index} tw="w-[6%]">
                                  {index + 1}
                                </Th>
                                <Td colSpan={2}>{item.node.oc_outcome}</Td>
                              </tr>
                              {item.node.oc_index && (
                                <tr>
                                  <Th tw="w-1/4">指標</Th>
                                  <Td>{item.node.oc_index}</Td>
                                </tr>
                              )}
                              {item.node.oc_goal && (
                                <tr>
                                  <Th>目標値・目標状態</Th>
                                  <Td>{item.node.oc_goal}</Td>
                                </tr>
                              )}
                              <tr>
                                <Th>アウトカム結果</Th>
                                <Td>{item.node.oc_result}</Td>
                              </tr>
                              <tr>
                                <Th>アウトカム考察</Th>
                                <Td>{item.node.oc_consider}</Td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </ScrollTable>
                    </div>
                  </DetailItemWrapper>
                </div>
              )}
              {output.length > 0 && (
                <div>
                  <DetailItemWrapper itemName="アウトプット">
                    <div tw="lg:overflow-x-scroll">
                      <ScrollTable>
                        <tbody>
                          {output.map((item: any, index: number) => (
                            <>
                              <tr>
                                <Th rowSpan={6} key={index} tw="w-[6%]">
                                  {index + 1}
                                </Th>
                                <Td colSpan={2}>{item.node.op_output}</Td>
                              </tr>
                              {item.node.op_sikinteki && (
                                <tr>
                                  <Th tw="w-1/4">資金支援/非資金的支援</Th>
                                  <Td>{item.node.op_sikinteki}</Td>
                                </tr>
                              )}
                              <tr>
                                <Th tw="w-1/4">指標</Th>
                                <Td>{item.node.op_index}</Td>
                              </tr>
                              <tr>
                                <Th>目標値・目標状態</Th>
                                <Td>{item.node.op_goal}</Td>
                              </tr>
                              <tr>
                                <Th>アウトプット結果</Th>
                                <Td>{item.node.op_result}</Td>
                              </tr>
                              <tr>
                                <Th>アウトプット考察</Th>
                                <Td>{item.node.op_consider}</Td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </ScrollTable>
                    </div>
                  </DetailItemWrapper>
                </div>
              )}
              {activity.length > 0 && (
                <div>
                  <DetailItemWrapper itemName="活動">
                    <div tw="lg:overflow-x-scroll">
                      <ScrollTable>
                        <tbody>
                          {activity.map((item: any, index: number) => (
                            <>
                              <tr>
                                <Th rowSpan={4} key={index} tw="w-[6%]">
                                  {index + 1}
                                </Th>
                                <Td colSpan={2}>{item.node.act_activity}</Td>
                              </tr>
                              {item.node.act_sikinteki && (
                                <tr>
                                  <Th tw="w-1/4">資金支援/非資金的支援</Th>
                                  <Td>{item.node.act_sikinteki}</Td>
                                </tr>
                              )}
                              <tr>
                                <Th tw="w-1/4">活動結果</Th>
                                <Td>{item.node.act_sintyoku}</Td>
                              </tr>
                              <tr>
                                <Th>概要</Th>
                                <Td>{item.node.act_gaiyou}</Td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </ScrollTable>
                    </div>
                  </DetailItemWrapper>
                </div>
              )}
              {work.length > 0 && (
                <div id="twelfthItem">
                  <DetailItemWrapper itemName="資金分配団体としての非資金的支援の取り組み総括">
                    <div tw="lg:overflow-x-scroll">
                      <ScrollTable>
                        <tbody>
                          {work.map((item: any, index: number) => (
                            <>
                              <tr>
                                <Th rowSpan={4} key={index} tw="w-[6%]">
                                  {index + 1}
                                </Th>
                                <Th tw="w-1/4">取り組み</Th>
                                <Td>{item.node.work_attempt}</Td>
                              </tr>
                              <tr>
                                <Th tw="w-1/4">取り組み分類</Th>
                                <Td>{item.node.work_class}</Td>
                              </tr>
                              <tr>
                                <Th>到達度</Th>
                                <Td>{item.node.work_degree}</Td>
                              </tr>
                              <tr>
                                <Th>概要および考察</Th>
                                <Td>{item.node.work_overview}</Td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </ScrollTable>
                    </div>
                  </DetailItemWrapper>
                </div>
              )}
              {strapiCompleteReport.unexp_outcome.data.childMarkdownRemark
                .html && (
                <div id="fifthItem">
                  <DetailItemWrapper itemName="想定外のアウトカム、活動、波及効果など">
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            strapiCompleteReport.unexp_outcome.data.childMarkdownRemark.html.replace(
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
              {strapiCompleteReport.task_change.data.childMarkdownRemark
                .html && (
                <div id="sixthItem">
                  <DetailItemWrapper itemName="事業終了時の課題を取り巻く環境や対象者の変化と次の活動">
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <Th tw="w-1/4">課題を取り巻く変化</Th>
                            <Td>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    strapiCompleteReport.task_change.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </Td>
                          </tr>
                          {strapiCompleteReport.major_change.data
                            .childMarkdownRemark.html && (
                            <tr>
                              <Th>
                                本事業を行なっている中で生じた実行団体や受益者のもっとも重要な変化だと感じた点
                              </Th>
                              <Td>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      strapiCompleteReport.major_change.data.childMarkdownRemark.html.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </Td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </DetailItemWrapper>
                </div>
              )}
              {performance.length > 0 && (
                <div id="thirteenthItem">
                  <DetailItemWrapper itemName="外部との連携実績">
                    <div tw="lg:overflow-x-scroll">
                      <ScrollTable>
                        <tbody>
                          {performance.map((item: any, index: number) => (
                            <>
                              <tr>
                                <Th rowSpan={3} key={index} tw="w-[6%]">
                                  {index + 1}
                                </Th>
                                <Th tw="w-1/4">活動</Th>
                                <Td>{item.node.res_activity}</Td>
                              </tr>
                              <tr>
                                <Th tw="w-1/4">実施内容</Th>
                                <Td>{item.node.res_contents}</Td>
                              </tr>
                              <tr>
                                <Th>結果・成果・影響等</Th>
                                <Td>{item.node.res_result}</Td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </ScrollTable>
                    </div>
                  </DetailItemWrapper>
                </div>
              )}
              <div id="secondItem">
                <DetailItemWrapper itemName="広報実績">
                  <div tw="lg:overflow-x-scroll">
                    <ScrollTable>
                      <tbody>
                        <LshapeTableRow
                          heading="シンボルマークの活用状況									"
                          status={strapiCompleteReport.joukyou_9_1}
                          content={
                            strapiCompleteReport.naiyou_9_1.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="メディア掲載（TV・ラジオ・新聞・雑誌・WEB等）"
                          status={strapiCompleteReport.joukyou_9_2}
                          content={
                            strapiCompleteReport.naiyou_9_2.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="広報制作物等"
                          status={strapiCompleteReport.joukyou_9_3}
                          content={
                            strapiCompleteReport.naiyou_9_3.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="報告書等"
                          status={strapiCompleteReport.joukyou_9_4}
                          content={
                            strapiCompleteReport.naiyou_9_4.data
                              .childMarkdownRemark.html
                          }
                        />
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              <div id="seventhItem">
                <DetailItemWrapper itemName="ガバナンス・コンプライアンス実績">
                  <p tw="font-bold mb-4">規程類の整備状況</p>
                  <div tw="lg:overflow-x-scroll">
                    <ScrollTable>
                      <tbody>
                        <LshapeTableRow
                          heading="事業期間に整備が求められている規程類の整備は完了しましたか。									"
                          status={strapiCompleteReport.joukyou_10_1_1}
                          content={
                            strapiCompleteReport.naiyou_10_1_1.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="整備が完了した規程類を自団体のwebサイト上で広く一般公開していますか。"
                          status={strapiCompleteReport.joukyou_10_1_2}
                          content={
                            strapiCompleteReport.naiyou_10_1_2.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="変更があった規程類に関して報告しましたか。"
                          status={strapiCompleteReport.joukyou_10_1_3}
                          content={
                            strapiCompleteReport.naiyou_10_1_3.data
                              .childMarkdownRemark.html
                          }
                        />
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              <div id="ninthItem">
                <DetailItemWrapper itemName="ガバナンス・コンプライアンス体制">
                  <div tw="lg:overflow-x-scroll">
                    <ScrollTable>
                      <tbody>
                        <LshapeTableRow
                          heading="社員総会、評議会、株主総会、理事会、取締役会などは定款の定める通りに開催されていますか。"
                          status={strapiCompleteReport.joukyou_10_2_1}
                          content={
                            strapiCompleteReport.naiyou_10_2_1.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="内部通報制度は整備されていますか。"
                          status={strapiCompleteReport.joukyou_10_2_2}
                          content={
                            strapiCompleteReport.naiyou_10_2_2.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="利益相反防止のための自己申告を定期的に行っていますか。"
                          status={strapiCompleteReport.joukyou_10_2_4}
                          content={
                            strapiCompleteReport.naiyou_10_2_4.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="コンプライアンス委員会またはコンプライアンス責任者を設置していましたか。"
                          status={strapiCompleteReport.joukyou_10_2_5}
                          content={
                            strapiCompleteReport.naiyou_10_2_5.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="ガバナンス・コンプライアンスの整備や強化施策を検討・実施しましたか。"
                          status={strapiCompleteReport.joukyou_10_2_6}
                          content={
                            strapiCompleteReport.naiyou_10_2_6.data
                              .childMarkdownRemark.html
                          }
                        />
                        {strapiCompleteReport.joukyou_10_2_7_saisyuu && (
                          <LshapeTableRow
                            heading="団体の決算書類に対する会計監査はどのように実施しましたか。本事業の最終年度の状況を選択してください。（実施予定の場合含む）"
                            status={strapiCompleteReport.joukyou_10_2_7_saisyuu}
                            content={
                              strapiCompleteReport.naiyou_10_2_7_saisyuu.data
                                .childMarkdownRemark.html
                            }
                          />
                        )}
                        {strapiCompleteReport.joukyou_10_2_7_houkoku && (
                          <LshapeTableRow
                            heading="報告年度の会計監査はどのように実施しましたか。（実施予定の場合含む）"
                            status={strapiCompleteReport.joukyou_10_2_7_houkoku}
                            content={
                              strapiCompleteReport.naiyou_10_2_7_houkoku.data
                                .childMarkdownRemark.html
                            }
                          />
                        )}
                        {strapiCompleteReport.joukyou_10_2_8 && (
                          <LshapeTableRow
                            heading="事業完了した実行団体へ事業完了時監査を行いましたか。"
                            status={strapiCompleteReport.joukyou_10_2_8}
                            content={
                              strapiCompleteReport.naiyou_10_2_8.data
                                .childMarkdownRemark.html
                            }
                          />
                        )}
                        <tr>
                          <Th colSpan={2}>
                            本事業に対して、国や地方公共団体からの補助金・助成金等を申請、または受領していますか。
                          </Th>
                          <Td>{strapiCompleteReport.joukyou_10_2_9}</Td>
                        </tr>
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              {strapiCompleteReport.etc.data.childMarkdownRemark.html && (
                <div id="eighthItem">
                  <DetailItemWrapper itemName="その他">
                    <div>
                      <table tw="lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                        <tbody>
                          <Th tw="w-1/4">
                            本助成を通じて組織として強化された事項や新たに認識した課題、今後の対応/あればよいと思う支援や改善を求めたい事項など
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  strapiCompleteReport.etc.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tbody>
                      </table>
                    </div>
                  </DetailItemWrapper>
                </div>
              )}
              {attachedFileData.length > 0 && (
                <div id="tenthItem">
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

export default CompletionReport;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiCompleteReport(business_cd: { eq: $slug }) {
      ado_count
      biz_cd_executive
      biz_cd_fund_distr
      business_cd
      business_org_type
      business_period_e(formatString: "YYYY/MM/DD")
      business_period_s(formatString: "YYYY/MM/DD")
      business_type_cd
      business_type_name
      etc {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      executive_grp_cd
      fund_distr_grp_cd
      insert_id
      jigyougaiyou {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      jigyoutaisyousya {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      jigyoutaisyousya_n {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      joukyou_10_1_1
      joukyou_10_1_2
      joukyou_10_1_3
      joukyou_10_2_1
      joukyou_10_2_2
      joukyou_10_2_4
      joukyou_10_2_5
      joukyou_10_2_6
      joukyou_10_2_7_houkoku
      joukyou_10_2_7_saisyuu
      joukyou_10_2_8
      joukyou_10_2_9
      joukyou_9_1
      joukyou_9_2
      joukyou_9_3
      joukyou_9_4
      kadai {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      major_change {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_10_1_1 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_10_1_2 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_10_1_3 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_10_2_1 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_10_2_2 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_10_2_4 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_10_2_5 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_10_2_6 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_10_2_7_houkoku {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_10_2_7_saisyuu {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_10_2_8 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_9_1 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_9_2 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_9_3 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      naiyou_9_4 {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      select_bp
      soukatsu {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      taisyoutiiki
      task_change {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      unexp_outcome {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      updatedAt(formatString: "YYYY/MM/DD")
    }
    allStrapiCompleteReportSub(filter: { business_cd: { eq: $slug } }) {
      edges {
        node {
          act_activity
          act_gaiyou
          act_sikinteki
          act_sintyoku
          biz_cd_executive
          biz_cd_fund_distr
          business_cd
          business_org_type
          info_type
          insert_id
          oc_consider
          oc_goal
          oc_index
          oc_outcome
          oc_result
          op_consider
          op_goal
          op_index
          op_output
          op_result
          op_sikinteki
          res_activity
          res_contents
          res_result
          row_no
          updatedAt(formatString: "YYYY/MM/DD")
          work_attempt
          work_class
          work_degree
          work_overview
        }
      }
    }
    strapiCompleteReportManualFDO: strapiCompleteReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
    }
    strapiCompleteReportManualADO: strapiCompleteReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
    }
  }
`;
