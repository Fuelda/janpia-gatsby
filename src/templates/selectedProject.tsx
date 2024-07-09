import { graphql } from "gatsby";
import React, { useState } from "react";
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
import { LshapeTableRow, ScrollTable, Td, Th } from "./progressReport";
import DetailAnchor from "../components/atoms/DetailAnchor";
import useStrapiSelectedReportPdf from "../hooks/useStrapiSelectedReportPdf";

type ormType = {
  node: {
    biz_cd_fund_distr: string | null;
    business_org_type: string;
    data: { url: string };
    round: number;
  };
};

const SelectedProject: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const [currentTab, setCurrentTab] = useState(1);
  const { allStrapiOfferingReportManualFDO, allStrapiOfferingReport } = data;

  const allStrapiOfferingReportManual = allStrapiOfferingReportManualFDO;

  const roundArray =
    allStrapiOfferingReportManual.edges.length > 0
      ? allStrapiOfferingReportManual.edges.map(
          (orm: ormType) => orm.node.round
        )
      : allStrapiOfferingReport.edges.length > 0
      ? allStrapiOfferingReport.edges.map((or: any) => or.node.koubo_nm)
      : [];

  const { pdfUrlArray } = useStrapiSelectedReportPdf(
    slug,
    "offering-report-manuals"
  );

  const currentItem =
    allStrapiOfferingReportManual.edges.length > 0
      ? pdfUrlArray &&
        pdfUrlArray.length > 0 &&
        pdfUrlArray.find((item) => item.round === currentTab)
      : allStrapiOfferingReport.edges.find(
          (or: any) => or.node.koubo_nm === currentTab
        );
  const currentQueryItem =
    allStrapiOfferingReportManual &&
    allStrapiOfferingReportManual.edges.find(
      (orm: ormType) => orm.node.round === currentTab
    );
  const currentPdfUrl =
    allStrapiOfferingReportManual.edges.length > 0 &&
    currentItem &&
    currentItem.url;
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${currentPdfUrl}&embedded=true`;

  return (
    <Layout>
      <Seo title="公募結果報告 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <DetailWrapper
        category="公募結果報告"
        slug={slug}
        updatedAt={
          currentQueryItem
            ? currentQueryItem.node.updatedAt
            : currentItem && currentItem.node.updatedAt
        }
      >
        {allStrapiOfferingReport.edges.length > 0 && currentItem && (
          <div css={detailAnchor}>
            <DetailAnchor
              title="公募〜選定の結果"
              anchor={`/result/${slug}/selected-project/#firstItem`}
            />
            <DetailAnchor
              title="公募プロセス/説明会・個別相談会"
              anchor={`/result/${slug}/selected-project/#secondItem`}
            />
            <DetailAnchor
              title="公募プロセス/実行団体の募集"
              anchor={`/result/${slug}/selected-project/#thirdItem`}
            />
            <DetailAnchor
              title="公募プロセス/申請団体の審査"
              anchor={`/result/${slug}/selected-project/#fourthItem`}
            />
            <DetailAnchor
              title="公募の設計/申請団体数・実行団体の事業内容"
              anchor={`/result/${slug}/selected-project/#fifthItem`}
            />
            <DetailAnchor
              title="選定結果の通知及び公開の状況"
              anchor={`/result/${slug}/selected-project/#sixthItem`}
            />
            <DetailAnchor
              title="広報実績（公募関連以外）"
              anchor={`/result/${slug}/selected-project/#seventhItem`}
            />
            <DetailAnchor
              title="ガバナンス・コンプライアンス体制等の確認"
              anchor={`/result/${slug}/selected-project/#eighthItem`}
            />
          </div>
        )}
        <div css={detailTab}>
          {roundArray.length > 0 &&
            roundArray.map((round: number) => (
              <button
                key={round}
                css={[
                  detailRoundTabBtn,
                  currentTab === round && detailTabBtnSelected,
                ]}
                onClick={() => setCurrentTab(round)}
              >
                {allStrapiOfferingReportManualFDO.edges.length > 0
                  ? `第${round}回`
                  : `${round}`}
              </button>
            ))}
        </div>
        <div css={detailBody}>
          {allStrapiOfferingReportManualFDO.edges.length > 0 &&
            (currentItem ? (
              <div>
                <iframe
                  width="100%"
                  height="500px"
                  src={googleDocsViewerUrl}
                ></iframe>
              </div>
            ) : (
              <p>データはありません</p>
            ))}
          {allStrapiOfferingReport.edges.length > 0 && currentItem && (
            <>
              <div id="firstItem">
                <DetailItemWrapper itemName="公募〜選定の結果">
                  <div>
                    <table tw="table-fixed">
                      <thead>
                        <tr>
                          <Th>選定予定件数-計画</Th>
                          <Th>申請事業数-実数</Th>
                          <Th>申請団体数-実数</Th>
                          <Th>選定事業数-実数</Th>
                          <Th>選定団体数-実数</Th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <Td>{currentItem.node.senteiyotei}</Td>
                          <Td>{currentItem.node.sinseijigyou}</Td>
                          <Td>{currentItem.node.sinseidantai}</Td>
                          <Td>{currentItem.node.senteijigyou}</Td>
                          <Td>{currentItem.node.senteidantai}</Td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DetailItemWrapper>
              </div>
              <div id="secondItem">
                <DetailItemWrapper itemName="公募プロセス/説明会・個別相談会">
                  <div>
                    <table tw="lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Th tw="w-1/4">説明会の告知期間</Th>
                          <Td>
                            {currentItem.node.kokutikikan_ks_se}
                            {currentItem.node.kokutikikan_ks_ue}
                            {currentItem.node.kokutikikan_ks_us}日
                          </Td>
                        </tr>
                        <tr>
                          <Th>説明会への参加団体数</Th>
                          <Td>{currentItem.node.sankadantaisuu}団体</Td>
                        </tr>
                        <tr>
                          <Th>説明会の実施回数</Th>
                          <Td>{currentItem.node.setumei_jissikaisuu}回</Td>
                        </tr>
                        <tr>
                          <Th>個別相談会の実施回数（電話相談も含む）</Th>
                          <Td>{currentItem.node.soudan_jissikaisuu}回</Td>
                        </tr>
                        <tr>
                          <Th>評価に関する説明の実施有無</Th>
                          <Td>{currentItem.node.jissisya}</Td>
                        </tr>
                        <tr>
                          <Th>評価に関する説明の主な実施者</Th>
                          <Td>{currentItem.node.omonajissisya}</Td>
                        </tr>
                        <tr>
                          <Th>
                            上記設問で「その他」を選んだ場合、その実施者を記載してください。
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.jissisya_etc.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>
                            説明会・個別相談会で工夫したこと、よかったことを記載してください。
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.setumeikai_kuhuu.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>説明会・個別相談会の課題を記載してください。</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.setumeikai_kadai.data.childMarkdownRemark.html.replace(
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
              <div id="thirdItem">
                <DetailItemWrapper itemName="公募プロセス/実行団体の募集">
                  <div>
                    <table tw="lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Th tw="w-1/4">募集の受付期間</Th>
                          <Td>
                            {currentItem.node.b_uketukekikan_us_ue}
                            {currentItem.node.b_uketukekikan_ks_be}日
                          </Td>
                        </tr>
                        {currentItem.node.b_uketukekikan_goukei && (
                          <tr>
                            <Th>募集の受付期間の合計日数</Th>
                            <Td>{currentItem.node.b_uketukekikan_goukei}</Td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <table tw="table-fixed lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Th tw="w-[25%]">募集の告知媒体の種類</Th>
                          <Td>
                            <p>
                              {currentItem.node.bosyuusyurui_hp === "1" && "HP"}
                            </p>
                            <p>
                              {currentItem.node.bosyuusyurui_sns === "1" &&
                                "SNS"}
                            </p>
                            <p>
                              {currentItem.node.bosyuusyurui_mail === "1" &&
                                "メール"}
                            </p>
                            <p>
                              {currentItem.node.bosyuusyurui_chirashi === "1" &&
                                "チラシ"}
                            </p>
                            <p>
                              {currentItem.node.bosyuusyurui_kouhou === "1" &&
                                "関連組織を通じた広報"}
                            </p>
                            <p>
                              {currentItem.node.bosyuusyurui_press === "1" &&
                                "プレスリリース"}
                            </p>
                            <p>
                              {currentItem.node.bosyuusyurui_etc === "1" &&
                                "その他"}
                            </p>
                          </Td>
                        </tr>
                        <tr>
                          <Th>具体的な方法</Th>
                          <Td>{currentItem.node.gutaitekinahouhou}</Td>
                        </tr>
                      </tbody>
                    </table>
                    <table tw="lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Th tw="w-1/4">
                            実行団体の募集で工夫したこと、よかったこと
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.bosyuu_kuhuu.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>実行団体の募集の課題</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.bosyuu_kadai.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                      </tbody>
                    </table>
                    <table tw="lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <LshapeTableRow
                          heading="公募に申請した団体の情報を、募集終了時にWebサイト上で公表しましたか"
                          status={currentItem.node.web_select}
                          contentName={
                            currentItem.node.web_select === "はい"
                              ? "URL"
                              : "公開予定日"
                          }
                          content={currentItem.node.web_text}
                        />
                      </tbody>
                    </table>
                  </div>
                </DetailItemWrapper>
              </div>
              <div id="fourthItem">
                <DetailItemWrapper itemName="公募プロセス/申請団体の審査">
                  <div>
                    <table tw="lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Th tw="w-1/4 border-b-0" colSpan={2}>
                            審査委員の人数（合計）
                          </Th>
                          <Td>{currentItem.node.sinsaiin_nm2}人</Td>
                        </tr>
                        <tr>
                          <Th tw="w-[12.5%] border-y-0"></Th>
                          <Th>外部委員</Th>
                          <Td>{currentItem.node.gaibuiin}人</Td>
                        </tr>
                        <tr>
                          <Th tw="w-[12.5%] border-t-0"></Th>
                          <Th>内部委員</Th>
                          <Td>{currentItem.node.naibuiin}人</Td>
                        </tr>
                      </tbody>
                    </table>
                    <table tw="lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Th tw="w-1/2">
                            （利益相反の防止）資金分配団体と申請団体との間で、
                            (1) 役員の兼職関係がないこと、および (2)
                            過去に兼職関係があった場合は退任後６ヶ月間以上経過していることを確認しましたか。
                          </Th>
                          <Td>{currentItem.node.riekiihan_kakunin}</Td>
                        </tr>
                      </tbody>
                    </table>
                    <table tw="lg:([&_th]:(block w-full) [&_td]:(block w-full))">
                      <tbody>
                        <tr>
                          <Th tw="w-1/4">
                            （利益相反の防止）その他に実行団体との利益相反の防止に関して実施したことがあれば記載してください。
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.riekiihan_etc.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>
                            審査の過程で第三者の意見聴取等、専門的な意見をどのように取り入れましたか。
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.senmontekiiken.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>
                            審査を行う者の利益相反の防止措置はどのように行いましたか。
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.bousisoti.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>
                            申請団体のコンプライアンス/ガバナンス体制の確認をどのように行いましたか。
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.konpuraiansu.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>
                            申請団体との面談(必要に応じて現地調査)はどのように実施しましたか。
                          </Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.mendan.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>申請団体の審査で工夫したこと、よかったこと。</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.sinsei_kuhuu.data.childMarkdownRemark.html.replace(
                                    /\n/g,
                                    "<br />"
                                  ),
                              }}
                            />
                          </Td>
                        </tr>
                        <tr>
                          <Th>申請団体の審査で感じた課題。</Th>
                          <Td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  currentItem.node.sinsei_kadai.data.childMarkdownRemark.html.replace(
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
              <div id="fifthItem">
                <DetailItemWrapper itemName="公募の設計/申請団体数・実行団体の事業内容">
                  <div tw="overflow-x-scroll">
                    <ScrollTable>
                      <tbody>
                        <LshapeTableRow
                          heading="（申請団体数）実行団体選定予定件数に対して申請団体数は想定通りでしたか。"
                          status={currentItem.node.sinseidantai_select}
                          contentName="要因"
                          content={
                            currentItem.node.sinseidantai_text.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="（申請団体の事業内容）設定した社会課題の解決に対して、選定した実行団体の事業内容（目標、対象者、地域、活動、金額、規模等）は想定通りでしたか。"
                          status={currentItem.node.jigyounaiyou_select}
                          contentName="要因"
                          content={
                            currentItem.node.jigyounaiyou_text.data
                              .childMarkdownRemark.html
                          }
                        />
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              <div id="sixthItem">
                <DetailItemWrapper itemName="選定結果の通知及び公開の状況">
                  <div tw="overflow-x-scroll">
                    <ScrollTable>
                      <tbody>
                        <LshapeTableRow
                          heading="（選定結果の通知）実行団体に選定しなかった申請団体に対し、その理由と改善すべき点を示しましたか。"
                          status={currentItem.node.s_tuuti_select}
                          contentName="通知予定日"
                          content={currentItem.node.s_tuuti_text}
                        />
                        <LshapeTableRow
                          heading="（選定結果の公開）選定結果について、webサイト上で広く一般に公開しましたか。"
                          status={currentItem.node.s_koukai_select}
                          contentName={
                            currentItem.node.s_koukai_select === "はい"
                              ? "URL"
                              : "公開予定日"
                          }
                          content={currentItem.node.s_koukai_text}
                        />
                        <LshapeTableRow
                          heading="（規程類の公開）ガバナンス・コンプライアンス体制に関する規程類を、 web サイト上で広く一般に公開しましたか。"
                          status={currentItem.node.k_koukai_select}
                          contentName={
                            currentItem.node.k_koukai_select === "はい"
                              ? "URL"
                              : "公開予定日"
                          }
                          content={currentItem.node.k_koukai_text}
                        />
                        <LshapeTableRow
                          heading="（人件費水準の公開）経費に人件費が含まれる場合、当該人件費の水準をweb サイト上で広く一般に公開しましたか。"
                          status={currentItem.node.j_koukai_select}
                          contentName={
                            currentItem.node.j_koukai_select === "はい"
                              ? "URL"
                              : "公開予定日"
                          }
                          content={currentItem.node.j_koukai_text}
                        />
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              <div id="seventhItem">
                <DetailItemWrapper itemName="広報実績（公募関連以外） ">
                  <div tw="overflow-x-scroll">
                    <ScrollTable>
                      <tbody>
                        <LshapeTableRow
                          heading="メディア掲載（TV・ラジオ・新聞・雑誌・WEB等）"
                          status={currentItem.node.mediakeisai_select}
                          content={
                            currentItem.node.mediakeisai_text.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="広報制作物等"
                          status={currentItem.node.kouhou_select}
                          content={
                            currentItem.node.kouhou_text.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="報告書等"
                          status={currentItem.node.houkokusyo_select}
                          content={
                            currentItem.node.houkokusyo_text.data
                              .childMarkdownRemark.html
                          }
                        />
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
              <div id="eighthItem">
                <DetailItemWrapper itemName="ガバナンス・コンプライアンス体制等の確認">
                  <div tw="overflow-x-scroll">
                    <ScrollTable>
                      <tbody>
                        <LshapeTableRow
                          heading="社員総会、理事会、評議会は定款の定める通りに開催されていますか。"
                          status={currentItem.node.syainsoukai_select}
                          contentName="理由"
                          content={
                            currentItem.node.syainsoukai_text.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="内部通報制度は整備されていますか。"
                          status={currentItem.node.naibutuuhou_select}
                          contentName="理由"
                          content={
                            currentItem.node.naibutuuhou_text.data
                              .childMarkdownRemark.html
                          }
                        />
                        <tr>
                          <Th colSpan={2}>
                            「はい」の場合、利用はありましたか。
                          </Th>
                          <Td>{currentItem.node.riyouumu}</Td>
                        </tr>
                        <LshapeTableRow
                          heading="利益相反防止のための自己申告を定期的に行っていますか。"
                          status={currentItem.node.riekisouhan_select}
                          contentName="理由"
                          content={
                            currentItem.node.riekisouhan_text.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="関連する規程の定めどおり情報公開を行っていますか。"
                          status={currentItem.node.johoukoukai_select}
                          contentName="理由"
                          content={
                            currentItem.node.johoukoukai_text.data
                              .childMarkdownRemark.html
                          }
                        />
                        <LshapeTableRow
                          heading="コンプライアンス委員会は定期的に開催されていますか。"
                          status={currentItem.node.cpiin_select}
                          contentName="理由"
                          content={
                            currentItem.node.cpiin_text.data.childMarkdownRemark
                              .html
                          }
                        />
                        <tr>
                          <Th colSpan={2}>報告年度の監査の方法</Th>
                          <Td>{currentItem.node.hokokunendo_hoho}</Td>
                        </tr>
                        <LshapeTableRow
                          heading="実行団体に規程類の整備について説明をしましたか。"
                          status={currentItem.node.kiteirui_select}
                          contentName="理由"
                          content={
                            currentItem.node.kiteirui_text.data
                              .childMarkdownRemark.html
                          }
                        />
                      </tbody>
                    </ScrollTable>
                  </div>
                </DetailItemWrapper>
              </div>
            </>
          )}
        </div>
      </DetailWrapper>
    </Layout>
  );
};

export default SelectedProject;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    allStrapiOfferingReport(filter: { business_cd: { eq: $slug } }) {
      edges {
        node {
          b_uketukekikan_us_ue
          biz_cd_fund_distr
          bosyuu_kadai {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          bosyuu_kuhuu {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          bosyuusyurui_chirashi
          bosyuusyurui_etc
          bosyuusyurui_hp
          bosyuusyurui_kouhou
          bosyuusyurui_mail
          bosyuusyurui_press
          bosyuusyurui_sns
          bousisoti {
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
          cpiin_select
          cpiin_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          fund_distr_grp_cd
          gaibuiin
          hokokunendo_hoho
          houkokusyo_select
          houkokusyo_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          id
          insert_id
          j_koukai_select
          j_koukai_text
          jigyounaiyou_select
          jigyounaiyou_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          jissisya
          jissisya_etc {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          johoukoukai_select
          johoukoukai_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          k_koukai_select
          k_koukai_text
          kiteirui_select
          kiteirui_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          kokutikikan_ks_us
          konpuraiansu {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          koubo_nm
          kouhou_select
          kouhou_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          mediakeisai_select
          mediakeisai_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          mendan {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          naibuiin
          naibutuuhou_select
          naibutuuhou_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          omonajissisya
          riekiihan_etc {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          riekiihan_kakunin
          riekisouhan_select
          riekisouhan_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          riyouumu
          s_koukai_select
          s_koukai_text
          s_tuuti_select
          sankadantaisuu
          senmontekiiken {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          senteidantai
          senteijigyou
          senteiyotei
          setumei_jissikaisuu
          setumeikai_kadai {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          setumeikai_kuhuu {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          sinsaiin_nm2
          sinsei_kadai {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          sinsei_kuhuu {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          sinseidantai
          sinseidantai_select
          sinseidantai_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          sinseijigyou
          soudan_jissikaisuu
          strapi_id
          syainsoukai_select
          syainsoukai_text {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          updatedAt(formatString: "yyyy/mm/dd")
          web_select
          web_text
        }
      }
    }
    allStrapiOfferingReportManualFDO: allStrapiOfferingReportManual(
      filter: {
        biz_cd_fund_distr: { eq: $slug }
        business_org_type: { eq: "F" }
      }
    ) {
      edges {
        node {
          updatedAt(formatString: "YYYY/MM/DD")
          biz_cd_fund_distr
          business_org_type
          round
        }
      }
    }
  }
`;
