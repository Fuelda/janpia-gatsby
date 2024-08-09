import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import {
  detailAnchor,
  detailBody,
  detailRoundTabBtn,
  detailTab,
  detailTabBtnSelected,
} from "../styles/detailPage";
import Seo from "../components/lauout/Seo";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import tw from "twin.macro";
import DetailAnchor from "../components/atoms/DetailAnchor";
import { formatAndConvertNextDate } from "../util/formatDate";
import { useAttachedFile } from "../hooks/useAttachedFile";
import AttachedFileLink from "../components/atoms/AttachedFileLink";

export const ScrollTable = tw.table`lg:(w-[780px])`;
export const Th = tw.th`bg-blue-base py-3 px-3.5 text-start border-gray-border border lg:(text-[13px] py-0 px-2)`;
export const Td = tw.td`py-3 px-3.5 border-gray-border border text-start lg:(py-2 px-2 break-all)`;

export const LshapeTableRow: React.FC<{
  heading: string;
  status: string;
  contentName?: string;
  content: string;
}> = ({ heading, status, contentName = "内容", content }) => {
  return (
    <>
      <tr css={!content && tw`border-gray-border border`}>
        <Th tw="w-1/4 border-b-0" colSpan={2}>
          {heading}
        </Th>
        <Td>{status}</Td>
      </tr>
      {content && (
        <tr>
          <Th tw="w-[12.5%] border-t-0"></Th>
          <Th tw="px-0 text-center">{contentName}</Th>
          <Td>
            {content && (
              <div
                dangerouslySetInnerHTML={{
                  __html: content.replace(/\n/g, "<br />"),
                }}
              />
            )}
          </Td>
        </tr>
      )}
    </>
  );
};

const ProgressReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const [currentTab, setCurrentTab] = useState(1);
  const [currentTabManual, setCurrentTabManual] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const {
    allStrapiProgressReport,
    allStrapiProgressReportSub,
    allStrapiProgressReportManualFDO,
    allStrapiProgressReportManualADO,
  } = data;

  const allStrapiProgressReportManual = [
    ...allStrapiProgressReportManualFDO.edges,
    ...allStrapiProgressReportManualADO.edges,
  ];

  const targetTermArray = allStrapiProgressReport.edges.map(
    (report: any) => report.node.target_term
  );
  const currentItem = allStrapiProgressReport.edges.find(
    (report: any) => report.node.target_term === currentTab
  );

  const insertId = currentItem && currentItem.node.insert_id;
  const { attachedFileData } = useAttachedFile(insertId);

  const actualValue =
    allStrapiProgressReportSub.edges.length !== 0 &&
    allStrapiProgressReportSub.edges
      .filter((prs: any) => prs.node.info_type === "10")
      .filter((prs: any) => prs.node.target_term === currentTab)
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const performanceOutput =
    allStrapiProgressReportSub.edges.length !== 0 &&
    allStrapiProgressReportSub.edges
      .filter((prs: any) => prs.node.info_type === "20")
      .filter((prs: any) => prs.node.target_term === currentTab)
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);
  const performanceActviity =
    allStrapiProgressReportSub.edges.length !== 0 &&
    allStrapiProgressReportSub.edges
      .filter((prs: any) => prs.node.info_type === "21")
      .filter((prs: any) => prs.node.target_term === currentTab)
      .sort((a: any, b: any) => a.node.row_no - b.node.row_no);

  // 手入力データに対する処理
  const sortedProgressReportManual =
    allStrapiProgressReportManual &&
    allStrapiProgressReportManual.sort((a: any, b: any) => {
      const itemA = a.node.progress_round ? a.node.progress_round.code : 0;
      const itemB = b.node.progress_round ? b.node.progress_round.code : 0;
      return itemA - itemB;
    });

  const roundArray = allStrapiProgressReportManual
    ? allStrapiProgressReportManual.map((prm: any) =>
        prm.node.progress_round ? prm.node.progress_round.code : 0
      )
    : [];
  const minRouond = Math.min(...roundArray);
  useEffect(() => {
    setCurrentTabManual(minRouond);
  }, [minRouond]);

  const currentItemManual =
    allStrapiProgressReportManual &&
    allStrapiProgressReportManual.find(
      (prm: any) =>
        prm.node.progress_round &&
        prm.node.progress_round.code === currentTabManual
    );

  const googleDocsViewerUrl =
    currentItemManual &&
    currentItemManual.node.data &&
    `https://docs.google.com/viewer?url=${currentItemManual.node.data.url}&embedded=true`;

  return (
    <Layout>
      <Seo title="進捗/年度末報告 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <DetailWrapper
        category="進捗/年度末報告"
        slug={slug}
        updatedAt={
          (currentItem && currentItem.node.updatedAt) ||
          (currentItemManual && currentItemManual.node.updatedAt)
        }
      >
        {currentItem && currentItem.node && (
          <div css={detailAnchor}>
            <DetailAnchor
              title="事業概要"
              anchor={`/result/${slug}/progress-report/#firstItem`}
            />
            {currentItem.node.soukatsu.data.childMarkdownRemark.html && (
              <DetailAnchor
                title="進捗報告の概要"
                anchor={`/result/${slug}/progress-report/#ninthItem`}
              />
            )}
            <DetailAnchor
              title="活動実績"
              anchor={`/result/${slug}/progress-report/#secondItem`}
            />
            {(currentItem.node.rep_1 ||
              currentItem.node.rep_6.data.childMarkdownRemark.html) && (
              <DetailAnchor
                title="事業進捗に関する報告"
                anchor={`/result/${slug}/progress-report/#thirdItem`}
              />
            )}
            {currentItem.node.hatugenjoukyou.data.childMarkdownRemark.html && (
              <DetailAnchor
                title="短期アウトカムの発現状況"
                anchor={`/result/${slug}/progress-report/#fourthItem`}
              />
            )}
            {currentItem.node.kadai.data.childMarkdownRemark.html && (
              <DetailAnchor
                title="事業上の課題"
                anchor={`/result/${slug}/progress-report/#fifthItem`}
              />
            )}
            <DetailAnchor
              title="広報実績"
              anchor={`/result/${slug}/progress-report/#sixthItem`}
            />
            {(currentItem.node.gov_soukai_joukyou ||
              currentItem.node.gov_tuhou_joukyou) && (
              <DetailAnchor
                title="ガバナンス・コンプライアンス実績"
                anchor={`/result/${slug}/progress-report/#seventhItem`}
              />
            )}
            {currentItem.node.kitei_koukai_joukyou && (
              <DetailAnchor
                title="規程類の整備に関する報告"
                anchor={`/result/${slug}/progress-report/#eighthItem`}
              />
            )}
            <DetailAnchor
              title="シンボルマークの活用状況"
              anchor={`/result/${slug}/progress-report/#tenthItem`}
            />
            {attachedFileData.length > 0 && (
              <DetailAnchor
                title="添付欄"
                anchor={`/result/${slug}/progress-report/#eleventhItem`}
              />
            )}
          </div>
        )}
        <div css={detailTab}>
          {sortedProgressReportManual &&
            sortedProgressReportManual.map(
              (prm: any, index) =>
                prm.node.progress_round && (
                  <button
                    key={index}
                    css={[
                      detailRoundTabBtn,
                      currentTabManual === prm.node.progress_round.code &&
                        detailTabBtnSelected,
                    ]}
                    onClick={() =>
                      setCurrentTabManual(prm.node.progress_round.code)
                    }
                  >
                    {prm.node.progress_round.label}
                  </button>
                )
            )}
        </div>
        <div css={detailTab}>
          {targetTermArray.length > 0 &&
            targetTermArray.map((term: any, index: number) => (
              <button
                key={index}
                css={[
                  detailRoundTabBtn,
                  currentTab === term && detailTabBtnSelected,
                ]}
                onClick={() => setCurrentTab(term)}
              >
                {term}
              </button>
            ))}
        </div>
        {currentItemManual && (
          <div>
            <iframe
              width="100%"
              height="500px"
              src={googleDocsViewerUrl}
              onLoad={() => setLoaded(true)}
            ></iframe>
          </div>
        )}
        {currentItem && currentItem.node && (
          <div css={detailBody}>
            <div id="firstItem">
              <DetailItemWrapper itemName="事業概要">
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <Th tw="w-[25%]">事業期間</Th>

                        <Td>
                          開始{" "}
                          {formatAndConvertNextDate(
                            currentItem.node.business_period_s
                          )}
                        </Td>
                        <Td>
                          終了{" "}
                          {formatAndConvertNextDate(
                            currentItem.node.business_period_e
                          )}
                        </Td>
                      </tr>
                      <tr>
                        <Th>対象地域</Th>
                        <Td colSpan={2}>{currentItem.node.taisyoutiiki}</Td>
                      </tr>
                      <tr>
                        <Th>事業対象者</Th>
                        <Td colSpan={2}>{currentItem.node.jigyoutaisyousya}</Td>
                      </tr>
                      <tr>
                        <Th>事業対象者人数</Th>
                        <Td colSpan={2}>
                          {currentItem.node.jigyoutaisyousya_n}
                        </Td>
                      </tr>
                      <tr>
                        <Th>事業概要</Th>
                        <Td colSpan={2}>{currentItem.node.jigyougaiyou}</Td>
                      </tr>
                      {currentItem.node.ado_count && (
                        <tr>
                          <Th>実行団体数</Th>
                          <Td colSpan={2}>{currentItem.node.ado_count}</Td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </DetailItemWrapper>
            </div>
            {currentItem.node.soukatsu.data.childMarkdownRemark.html && (
              <div id="ninthItem">
                <DetailItemWrapper itemName="進捗報告の概要">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <Th tw="w-[25%]">総括</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.soukatsu.data.childMarkdownRemark.html.replace(
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
            )}
            {actualValue.length > 0 && (
              <DetailItemWrapper itemName="実績値">
                <div tw="lg:overflow-x-scroll">
                  <ScrollTable>
                    {actualValue.map((item: any, index: number) => (
                      <tbody key={index}>
                        <tr>
                          <Th rowSpan={7} tw="w-[6%] text-center">
                            {index + 1}
                          </Th>
                          <Th tw="w-1/4">アウトプット</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  item.node.output.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        {item.node.sikintekisien && (
                          <tr>
                            <Th>
                              資金支援
                              <br />
                              非資金的支援
                            </Th>
                            <Td>{item.node.sikintekisien}</Td>
                          </tr>
                        )}
                        <tr>
                          <Th>指標</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  item.node.output_etc_index.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>中間評価時の値・状態</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  item.node.mid_eval.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>事後評価時の値・状態</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  item.node.aft_eval.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>進捗状況</Th>
                          <Td>{item.node.sintyokujoukyou}</Td>
                        </tr>
                        <tr>
                          <Th>現在の指標の達成状況</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  item.node.tasseijoukyou.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                      </tbody>
                    ))}
                  </ScrollTable>
                </div>
              </DetailItemWrapper>
            )}
            {(performanceOutput.length > 0 ||
              performanceActviity.length > 0) && (
              <div id="secondItem">
                <DetailItemWrapper itemName="活動実績">
                  <div tw="space-y-4 lg:overflow-x-scroll">
                    <ScrollTable>
                      {performanceOutput.map((item: any, index: number) => (
                        <tbody key={index}>
                          <tr>
                            <Th rowSpan={6} tw="w-[6%]">
                              {index + 1}
                            </Th>
                            <Th tw="w-1/4">アウトプット</Th>
                            <Td>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item.node.out_output.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </Td>
                          </tr>
                          {item.node.out_sikintekisien && (
                            <tr>
                              <Th>資金支援 / 非資金的支援</Th>
                              <Td>{item.node.out_sikintekisien}</Td>
                            </tr>
                          )}
                          <tr>
                            <Th tw="w-1/4">指標</Th>
                            <Td>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item.node.out_output_etc_index.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </Td>
                          </tr>
                          <tr>
                            <Th tw="w-1/4">目標値・目標状態</Th>
                            <Td>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item.node.out_mokuhyou.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </Td>
                          </tr>
                          <tr>
                            <Th tw="w-1/4">進捗状況</Th>
                            <Td>{item.node.out_sintyokujoukyou}</Td>
                          </tr>
                          <tr>
                            <Th tw="w-1/4">概要</Th>
                            <Td>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item.node.out_gaiyou.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </Td>
                          </tr>
                        </tbody>
                      ))}
                    </ScrollTable>
                    <ScrollTable>
                      {performanceActviity.map((item: any, index: number) => (
                        <tbody key={index}>
                          <tr>
                            <Th rowSpan={4} tw="w-[6%]">
                              {index + 1}
                            </Th>
                            <Th tw="w-1/4">活動</Th>
                            <Td>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item.node.act_katudou.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </Td>
                          </tr>
                          {item.node.act_k_sikintekisien && (
                            <tr>
                              <Th>資金支援 / 非資金的支援</Th>
                              <Td>{item.node.act_k_sikintekisien}</Td>
                            </tr>
                          )}
                          <tr>
                            <Th>進捗状況</Th>
                            <Td>{item.node.act_k_sintyoku}</Td>
                          </tr>
                          <tr>
                            <Th>概要</Th>
                            <Td>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    item.node.act_k_gaiyou.data.childMarkdownRemark.html.replace(
                                      /\n/g,
                                      "<br />"
                                    ),
                                }}
                              />
                            </Td>
                          </tr>
                        </tbody>
                      ))}
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
            )}

            {(currentItem.node.rep_1 ||
              currentItem.node.rep_6.data.childMarkdownRemark.html) && (
              <div id="thirdItem">
                <DetailItemWrapper itemName="事業進捗に関する報告">
                  <div>
                    <table tw="lg:([&_th]:block [&_td]:block)">
                      <tbody>
                        <tr>
                          <Th tw="w-1/4 lg:w-full">
                            事業計画に掲げた短期アウトカム達成の見込み
                          </Th>
                          <Td>{currentItem.node.rep_1}</Td>
                        </tr>
                        <tr>
                          <Th>アウトカムの状況（事業計画書の変更有無）</Th>
                          <Td>
                            {currentItem.node.rep_2_1 === "1" && (
                              <p>変更なし</p>
                            )}
                            {currentItem.node.rep_2_2_naiyou === "1" && (
                              <p>変更あり_短期アウトカムの内容</p>
                            )}
                            {currentItem.node.rep_2_2_hyougen === "1" && (
                              <p>変更あり_短期アウトカムの表現</p>
                            )}
                            {currentItem.node.rep_2_2_shihyou === "1" && (
                              <p>変更あり_短期アウトカムの指標</p>
                            )}
                            {currentItem.node.rep_2_2_mokuhyou === "1" && (
                              <p>変更あり_短期アウトカムの目標値</p>
                            )}
                          </Td>
                        </tr>
                        {currentItem.node.rep_6.data.childMarkdownRemark
                          .html && (
                          <tr>
                            <Th>非資金的支援の活動に関する報告</Th>
                            <Td>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    currentItem.node.rep_6.data.childMarkdownRemark.html.replace(
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

            {currentItem.node.hatugenjoukyou.data.childMarkdownRemark.html && (
              <div id="fourthItem">
                <DetailItemWrapper itemName="短期アウトカムの発現状況">
                  <div>
                    <table tw="lg:([&_th]:block [&_td]:block)">
                      <tbody>
                        <tr>
                          <Th tw="w-1/4 lg:w-full">
                            これまでの活動をとおして把握している変化・改善状況
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.hatugenjoukyou.data.childMarkdownRemark.html.replace(
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
            )}

            {currentItem.node.kadai.data.childMarkdownRemark.html && (
              <div id="fifthItem">
                <DetailItemWrapper itemName="事業上の課題">
                  <div>
                    <table tw="lg:([&_th]:block [&_td]:block)">
                      <tbody>
                        <tr>
                          <Th tw="w-1/4 lg:w-full">
                            事業実施上顕在化したリスク/阻害要因とその対応
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.kadai.data.childMarkdownRemark.html.replace(
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
            )}

            {currentItem.node.etc.data.childMarkdownRemark.html && (
              <div id="">
                <DetailItemWrapper itemName="その他">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.etc.data.childMarkdownRemark.html.replace(
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
            )}

            <div id="sixthItem">
              <DetailItemWrapper itemName="広報実績">
                <div tw="overflow-x-scroll">
                  <ScrollTable>
                    <tbody>
                      <LshapeTableRow
                        heading="メディア掲載（TV・ラジオ・新聞・雑誌・WEB等）"
                        status={currentItem.node.media_joukyou}
                        content={
                          currentItem.node.media_naiyou.data.childMarkdownRemark
                            .html
                        }
                      />
                      <LshapeTableRow
                        heading="広報制作物等"
                        status={currentItem.node.seisaku_joukyou}
                        content={
                          currentItem.node.seisaku_naiyou.data
                            .childMarkdownRemark.html
                        }
                      />
                      <LshapeTableRow
                        heading="報告書等"
                        status={currentItem.node.houkoku_joukyou}
                        content={
                          currentItem.node.houkoku_naiyou.data
                            .childMarkdownRemark.html
                        }
                      />
                      {currentItem.node.event_joukyou && (
                        <LshapeTableRow
                          heading="イベント開催等"
                          status={currentItem.node.event_joukyou}
                          content={
                            currentItem.node.event_naiyou.data
                              .childMarkdownRemark.html
                          }
                        />
                      )}
                      {currentItem.node.symbol_joukyou && (
                        <LshapeTableRow
                          heading="シンボルマークの使用状況"
                          status={currentItem.node.symbol_joukyou}
                          content={
                            currentItem.node.symbol_naiyou.data
                              .childMarkdownRemark.html
                          }
                        />
                      )}
                    </tbody>
                  </ScrollTable>
                </div>
              </DetailItemWrapper>
            </div>

            {(currentItem.node.gov_soukai_joukyou ||
              currentItem.node.gov_tuhou_joukyou) && (
              <div id="seventhItem">
                <DetailItemWrapper itemName="ガバナンス・コンプライアンス実績">
                  <div tw="overflow-x-scroll">
                    <ScrollTable>
                      <tbody>
                        <LshapeTableRow
                          heading="社員総会、理事会、評議会は定款の定める通りに開催されていますか。"
                          status={currentItem.node.gov_soukai_joukyou}
                          content={
                            currentItem.node.gov_soukai_naiyou.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="内部通報制度は整備されていますか。"
                          status={currentItem.node.gov_tuhou_joukyou}
                          content={
                            currentItem.node.gov_tuhou_naiyou.data
                              .childMarkdownRemark.html
                          }
                        />
                        {currentItem.node.gov_riyou_joukyou && (
                          <tr>
                            <Th colSpan={2}>
                              上記設問で「はい」の場合、利用はありましたか。
                            </Th>
                            <Td>{currentItem.node.gov_riyou_joukyou}</Td>
                          </tr>
                        )}
                        {currentItem.node.gov_koukai_joukyou && (
                          <LshapeTableRow
                            heading="関連する規程の定め通り情報公開を行っていますか。"
                            status={currentItem.node.gov_koukai_joukyou}
                            content={
                              currentItem.node.gov_koukai_naiyou.data
                                .childMarkdownRemark.html
                            }
                          />
                        )}
                        {currentItem.node.gov_kaisai_joukyou && (
                          <LshapeTableRow
                            heading="コンプライアンス委員会は定期的に開催されていますか。"
                            status={currentItem.node.gov_kaisai_joukyou}
                            content={
                              currentItem.node.gov_kaisai_naiyou.data
                                .childMarkdownRemark.html
                            }
                          />
                        )}
                        {currentItem.node.kansa_yotei_joukyou && (
                          <LshapeTableRow
                            heading="報告年度の内部監査又は外部監査を実施予定ですか（実施済みの場合含む）。"
                            status={currentItem.node.kansa_yotei_joukyou}
                            content={
                              currentItem.node.kansa_yotei_naiyou.data
                                .childMarkdownRemark.html
                            }
                          />
                        )}
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
            )}

            {currentItem.node.kitei_koukai_joukyou && (
              <div id="eighthItem">
                <DetailItemWrapper itemName="規程類の整備に関する報告">
                  <div tw="overflow-x-scroll">
                    <ScrollTable>
                      <tbody>
                        <LshapeTableRow
                          heading="規程類をwebサイト上で広く一般公開していますか。"
                          status={currentItem.node.kitei_koukai_joukyou}
                          content={
                            currentItem.node.kitei_koukai_naiyou.data
                              .childMarkdownRemark.html
                          }
                        />
                        {currentItem.node.kitei_jhoukoku_joukyou && (
                          <LshapeTableRow
                            heading="変更があった規程類に関してJANPIAに報告しましたか。"
                            status={currentItem.node.kitei_jhoukoku_joukyou}
                            content={
                              currentItem.node.kitei_jhoukoku_naiyou.data
                                .childMarkdownRemark.html
                            }
                          />
                        )}
                        {currentItem.node.kitei_fhoukoku_joukyou && (
                          <LshapeTableRow
                            heading="変更があった規程類に関して資金分配団体に報告しましたか。"
                            status={currentItem.node.kitei_fhoukoku_joukyou}
                            content={
                              currentItem.node.kitei_fhoukoku_naiyou.data
                                .childMarkdownRemark.html
                            }
                          />
                        )}
                        <LshapeTableRow
                          heading="関連する規程の定めどおり情報公開を行っていますか。"
                          status={currentItem.node.koukai_joukyou}
                          content={
                            currentItem.node.koukai_naiyou.data
                              .childMarkdownRemark.html
                          }
                        />
                        {currentItem.node.jigyounaiyou_select && (
                          <LshapeTableRow
                            heading="報告年度の監査が未実施（実施予定なし）の実行団体はありますか。"
                            status={currentItem.node.jigyounaiyou_select}
                            content={
                              currentItem.node.jigyounaiyou_text.data
                                .childMarkdownRemark.html
                            }
                          />
                        )}
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
            )}

            {(currentItem.node.etc_1_web === "1" ||
              currentItem.node.etc_1_kouhou === "1" ||
              currentItem.node.etc_1_houkoku === "1" ||
              currentItem.node.etc_1_event === "1" ||
              currentItem.node.etc_1_etc === "1") && (
              <div id="tenthItem">
                <DetailItemWrapper itemName="シンボルマークの活用状況">
                  <div tw="overflow-x-scroll">
                    <table tw="table-fixed lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Td>
                            <p>
                              {currentItem.node.etc_1_web === "1" &&
                                "自団体のウェブサイトで表示"}
                            </p>
                            <p>
                              {currentItem.node.etc_1_kouhou === "1" &&
                                "広報制作物に表示"}
                            </p>
                            <p>
                              {currentItem.node.etc_1_houkoku === "1" &&
                                "報告書に表示"}
                            </p>
                            <p>
                              {currentItem.node.etc_1_event === "1" &&
                                "イベント実施時に表示"}
                            </p>
                            <p>
                              {currentItem.node.etc_1_etc === "1" &&
                                `その他：${
                                  currentItem.node.etc_1_1 &&
                                  currentItem.node.etc_1_1
                                }`}
                            </p>
                          </Td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DetailItemWrapper>
              </div>
            )}

            {attachedFileData.length > 0 && (
              <div id="eleventhItem">
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
          </div>
        )}
      </DetailWrapper>
    </Layout>
  );
};

export default ProgressReport;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    allStrapiProgressReport(filter: { business_cd: { eq: $slug } }) {
      edges {
        node {
          ado_count
          biz_cd_executive
          biz_cd_fund_distr
          business_cd
          business_org_type
          business_period_e(formatString: "YYYY/MM/DD")
          business_period_s(formatString: "YYYY/MM/DD")
          business_type_cd
          business_type_name
          create_date(formatString: "yyyy/mm/dd")
          etc {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          etc_1_etc
          etc_1_event
          etc_1_houkoku
          etc_1_kouhou
          etc_1_web
          event_joukyou
          event_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          executive_grp_cd
          fund_distr_grp_cd
          gov_kaisai_joukyou
          gov_kaisai_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          gov_koukai_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          gov_riyou_joukyou
          gov_koukai_joukyou
          gov_soukai_joukyou
          gov_soukai_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          gov_tuhou_joukyou
          gov_tuhou_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          hatugenjoukyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          houkoku_joukyou
          houkoku_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          insert_id
          jigyougaiyou
          jigyounaiyou_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          jigyoutaisyousya
          jigyoutaisyousya_n
          kadai {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          kansa_yotei_joukyou
          kansa_yotei_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          kitei_fhoukoku_joukyou
          kitei_fhoukoku_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          kitei_jhoukoku_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          kitei_koukai_joukyou
          kitei_koukai_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          kitei_jhoukoku_joukyou
          koukai_joukyou
          koukai_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          media_joukyou
          media_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          rep_1
          rep_2_1
          rep_2_2_hyougen
          rep_2_2_mokuhyou
          rep_2_2_naiyou
          rep_2_2_shihyou
          rep_6 {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          seisaku_joukyou
          seisaku_naiyou {
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
          strapi_id
          symbol_joukyou
          symbol_naiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          taisyoutiiki
          target_term
          updatedAt(formatString: "YYYY/MM/DD")
        }
      }
    }

    allStrapiProgressReportSub(filter: { business_cd: { eq: $slug } }) {
      edges {
        node {
          act_k_gaiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          act_k_sintyoku
          act_katudou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          aft_eval {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          biz_cd_executive
          biz_cd_fund_distr
          business_cd
          business_org_type
          create_date(formatString: "yyyy/mm/dd")
          info_type
          insert_id
          mid_eval {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          out_gaiyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          out_mokuhyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          out_output {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          out_sikintekisien
          out_output_etc_index {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          out_sintyokujoukyou
          output {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          sikintekisien
          output_etc_index {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          row_no
          sintyokujoukyou
          strapi_id
          target_term
          tasseijoukyou {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          updatedAt(formatString: "yyyy/mm/dd")
        }
      }
    }
    allStrapiProgressReportManualFDO: allStrapiProgressReportManual(
      filter: {
        biz_cd_fund_distr: { eq: $slug }
        business_org_type: { eq: "F" }
      }
    ) {
      edges {
        node {
          data {
            url
          }
          updatedAt(formatString: "YYYY/MM/DD")
          progress_round {
            code
            label
          }
        }
      }
    }
    allStrapiProgressReportManualADO: allStrapiProgressReportManual(
      filter: {
        biz_cd_executive: { eq: $slug }
        business_org_type: { eq: "A" }
      }
    ) {
      edges {
        node {
          data {
            url
          }
          updatedAt(formatString: "YYYY/MM/DD")
          progress_round {
            code
            label
          }
        }
      }
    }
  }
`;
