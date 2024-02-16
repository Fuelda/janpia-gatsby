import { graphql } from "gatsby";
import React, { useEffect } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import DetailSidebar from "../components/organisms/DetailSidebar";
import "twin.macro";
import tw from "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailAnchor from "../components/atoms/DetailAnchor";
import { detailAnchor, detailBody, detailFlex } from "../styles/detailPage";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import { tableWide, td8col, th8col, thead8col } from "../styles/table";
import Seo from "../components/lauout/Seo";
import { useDetailContext } from "../context/detailContext";

const thStandard = tw`bg-blue-base py-3 px-3 text-start border-gray-border border`;
const thNoBorder = tw`bg-blue-base py-3 px-3 text-start `;

const FinancialReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const {
    strapiSettleReportFDO,
    strapiSettleReportADO,
    strapiSettleReportManualFDO,
    strapiSettleReportManualADO,
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

  const settleReport = strapiSettleReportFDO || strapiSettleReportADO;
  const settleReportManual =
    strapiSettleReportManualFDO || strapiSettleReportManualADO;
  const pdfUrl = settleReportManual && settleReportManual.data.url;
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`;

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
      <Seo title="事業完了時精算報告 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="事業完了時精算報告" slug={slug}>
          {settleReportManual && (
            <div>
              <iframe
                width="100%"
                height="500px"
                src={googleDocsViewerUrl}
              ></iframe>
            </div>
          )}
          {settleReport && (
            <div css={detailAnchor}>
              <DetailAnchor
                title="事業完了時の精算"
                anchor={`/result/${slug}/financial-report/#firstItem`}
              />
              <DetailAnchor
                title={`${
                  settleReport.business_org_type === "F"
                    ? "資金分配団体"
                    : "実行団体"
                }の精算`}
                anchor={`/result/${slug}/financial-report/#secondItem`}
              />
              {/* <DetailAnchor
              title="実行団体の精算"
              anchor={`/result/${slug}/financial-report/#thirdItem`}
            /> */}
            </div>
          )}
          {settleReport && (
            <div css={detailBody}>
              <div id="firstItem">
                <DetailItemWrapper itemName="事業完了時の精算">
                  <div tw="w-full overflow-x-scroll">
                    <table css={tableWide} tw="w-[1080px]">
                      <thead css={thead8col}>
                        <tr>
                          <th rowSpan={2}></th>
                          <td colSpan={3} tw="border border-gray-border">
                            ターゲット（Ⅰ）
                          </td>
                          <td
                            colSpan={4}
                            tw="border border-gray-border"
                            css={
                              !settleReport.ruikei_ado_siharai &&
                              tw`bg-gray-pale text-gray-black`
                            }
                          >
                            実行団体の精算（Ⅱ）
                          </td>
                          <td
                            css={
                              !settleReport.ruikei_sum &&
                              tw`bg-gray-pale text-gray-black`
                            }
                          >
                            （Ⅰ+Ⅱ）
                          </td>
                        </tr>
                        <tr>
                          <td css={th8col}>①助成金受領額</td>
                          <td css={th8col}>②確定助成額</td>
                          <td css={th8col}>
                            ①-②残額
                            <br />
                            （精算金額ⅰ）
                          </td>
                          <td
                            css={[
                              th8col,
                              !settleReport.ruikei_ado_siharai &&
                                tw`bg-gray-pale text-gray-black`,
                            ]}
                          >
                            ①助成金受領額
                          </td>
                          <td
                            css={[
                              th8col,
                              !settleReport.ruikei_ado_siharai &&
                                tw`bg-gray-pale text-gray-black`,
                            ]}
                          >
                            ②確定助成額
                          </td>
                          <td
                            css={[
                              th8col,
                              !settleReport.ruikei_ado_siharai &&
                                tw`bg-gray-pale text-gray-black`,
                            ]}
                          >
                            ①-②残額
                            <br />
                            （精算金額ⅱ）
                          </td>
                          <td
                            css={[
                              th8col,
                              !settleReport.ruikei_ado_siharai &&
                                tw`bg-gray-pale text-gray-black`,
                            ]}
                          >
                            ③資金分配団体
                            <br />
                            への返還額
                          </td>
                          <td
                            css={[
                              th8col,
                              !settleReport.ruikei_sum &&
                                tw`bg-gray-pale text-gray-black`,
                            ]}
                          >
                            精算金額合計
                            <br />
                            （ⅰ+ⅱ-③)
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th css={th8col}>助成機関累計</th>
                          <td css={td8col}>
                            {parseInt(
                              settleReport.ruikei_fdo_juryou
                            ).toLocaleString()}
                          </td>
                          <td css={td8col}>
                            {parseInt(
                              settleReport.ruikei_fdo_kakutei
                            ).toLocaleString()}
                          </td>
                          <td css={td8col}>
                            {parseInt(settleReport.kakashi1).toLocaleString()}
                          </td>
                          <td
                            css={[
                              th8col,
                              !settleReport.ruikei_ado_siharai &&
                                tw`bg-gray-pale text-gray-black`,
                            ]}
                          >
                            {parseInt(
                              settleReport.ruikei_ado_siharai
                            ).toLocaleString()}
                          </td>
                          <td
                            css={[
                              th8col,
                              !settleReport.ruikei_ado_siharai &&
                                tw`bg-gray-pale text-gray-black`,
                            ]}
                          >
                            {parseInt(
                              settleReport.ruikei_ado_kakutei
                            ).toLocaleString()}
                          </td>
                          <td
                            css={[
                              th8col,
                              !settleReport.ruikei_ado_siharai &&
                                tw`bg-gray-pale text-gray-black`,
                            ]}
                          >
                            {parseInt(
                              settleReport.ruikei_ado_zandaka
                            ).toLocaleString()}
                          </td>
                          <td
                            css={[
                              th8col,
                              !settleReport.ruikei_ado_siharai &&
                                tw`bg-gray-pale text-gray-black`,
                            ]}
                          >
                            {parseInt(
                              settleReport.ruikei_ado_henkan
                            ).toLocaleString()}
                          </td>
                          <td
                            css={[
                              th8col,
                              !settleReport.ruikei_sum &&
                                tw`bg-gray-pale text-gray-black`,
                            ]}
                          >
                            {parseInt(settleReport.ruikei_sum).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DetailItemWrapper>
              </div>
              <div id="secondItem">
                <DetailItemWrapper
                  itemName={`${
                    settleReport.business_org_type === "F"
                      ? "資金分配団体"
                      : "実行団体"
                  }の精算`}
                >
                  <div tw="w-full overflow-x-scroll">
                    <table
                      css={tableWide}
                      className="table__settleReport__exective"
                    >
                      <thead css={thead8col}>
                        <tr>
                          <th colSpan={3} rowSpan={2}></th>
                          <td colSpan={2} tw="text-center">
                            事業費
                          </td>
                          <td rowSpan={2} tw="text-center">
                            評価関連経費
                          </td>
                          <td rowSpan={2} tw="text-center">
                            合計
                          </td>
                        </tr>
                        <tr>
                          <td tw="text-center">直接事業費</td>
                          <td tw="text-center">管理的経費</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th rowSpan={5} tw="w-[11.5%]" css={thStandard}>
                            年度末の
                            <br />
                            精算報告
                          </th>
                          <th rowSpan={5} tw="w-[13%]" css={thStandard}>
                            実績額
                          </th>
                          <th tw="w-[13%]" css={thStandard}>
                            2021年度
                          </th>
                          <td tw="text-end">
                            {settleReport.ado_josei_ado1 &&
                              parseInt(
                                settleReport.ado_josei_ado1
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.kanri1 &&
                              parseInt(settleReport.kanri1).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_ado1 &&
                              parseInt(settleReport.a_ado1).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_sum1 &&
                              parseInt(settleReport.a_sum1).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th css={thStandard}>2022年度</th>
                          <td tw="text-end">
                            {settleReport.ado_josei_ado2 &&
                              parseInt(
                                settleReport.ado_josei_ado2
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.kanri2 &&
                              parseInt(settleReport.kanri2).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_ado2 &&
                              parseInt(settleReport.a_ado2).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_sum2 &&
                              parseInt(settleReport.a_sum2).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th css={thStandard}>2023年度</th>
                          <td tw="text-end">
                            {settleReport.ado_josei_ado3 &&
                              parseInt(
                                settleReport.ado_josei_ado3
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.kanri3 &&
                              parseInt(settleReport.kanri3).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_ado3 &&
                              parseInt(settleReport.a_ado3).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_sum3 &&
                              parseInt(settleReport.a_sum3).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th css={thStandard}>2024年度</th>
                          <td tw="text-end">
                            {settleReport.ado_josei_ado4 &&
                              parseInt(
                                settleReport.ado_josei_ado4
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.kanri4 &&
                              parseInt(settleReport.kanri4).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_ado4 &&
                              parseInt(settleReport.a_ado4).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_sum4 &&
                              parseInt(settleReport.a_sum4).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th css={thStandard}>小計 (A)</th>
                          <td tw="text-end">
                            {settleReport.a_ado_josei_ado &&
                              parseInt(
                                settleReport.a_ado_josei_ado
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_kanri &&
                              parseInt(settleReport.a_kanri).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_ado &&
                              parseInt(settleReport.a_ado).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_sum &&
                              parseInt(settleReport.a_sum).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th rowSpan={4} css={thStandard}>
                            事業完了時の精算
                          </th>
                          <th rowSpan={2} css={thStandard}>
                            資金計画値
                          </th>
                          <th css={thStandard}>助成金 (B)</th>
                          <td tw="text-end">
                            {settleReport.b_ado_josei_ado &&
                              parseInt(
                                settleReport.b_ado_josei_ado
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.b_kanri &&
                              parseInt(settleReport.b_kanri).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.b_fdo &&
                              parseInt(settleReport.b_fdo).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.b_sum &&
                              parseInt(settleReport.b_sum).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th css={thStandard}>自己資金 (C)</th>
                          <td tw="text-end">
                            {settleReport.c_ado_josei_ado &&
                              parseInt(
                                settleReport.c_ado_josei_ado
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.c_kanri &&
                              parseInt(settleReport.c_kanri).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.c_fdo &&
                              parseInt(settleReport.c_fdo).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.c_sum &&
                              parseInt(settleReport.c_sum).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th css={thNoBorder}>執行率</th>
                          <th css={thNoBorder}>(D=A/(B+C))</th>
                          <td tw="text-end">
                            {settleReport.sikkou_ado_jo_ado &&
                              parseInt(
                                settleReport.sikkou_ado_jo_ado
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.sikkou_kanri &&
                              parseInt(
                                settleReport.sikkou_kanri
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.sikkou_fdo &&
                              parseInt(
                                settleReport.sikkou_fdo
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.sikkou_sum &&
                              parseInt(
                                settleReport.sikkou_sum
                              ).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th css={thNoBorder}>確定助成額</th>
                          <th css={thNoBorder}>(E=BxD)</th>
                          <td tw="text-end">
                            {settleReport.kakashi2_ado &&
                              parseInt(
                                settleReport.kakashi2_ado
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.kakashi3 &&
                              parseInt(settleReport.kakashi3).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.kakuteijosei_fdo &&
                              parseInt(
                                settleReport.kakuteijosei_fdo
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.kakuteijosei_sum &&
                              parseInt(
                                settleReport.kakuteijosei_sum
                              ).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DetailItemWrapper>
              </div>
              {/* <div id="thirdItem">
              <DetailItemWrapper itemName="実行団体の精算">
                <div tw="w-full overflow-x-scroll">
                  <table
                    css={tableWide}
                    className="table__settleReport__exective2"
                  >
                    <thead css={thead8col}>
                      <tr>
                        <th colSpan={2} rowSpan={2}></th>
                        <td colSpan={2} tw="text-center">
                          事業費
                        </td>
                      </tr>
                      <tr>
                        <td tw="text-center">直接事業費</td>
                        <td tw="text-center">管理的経費</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th rowSpan={5} tw="w-[19%]" css={thStandard}>
                          事業完了時の精算
                        </th>
                        <th css={thStandard} tw="w-1/3">
                          助成金支払額 (a)
                        </th>
                        <td colSpan={2} tw="text-end">
                          公開不可
                        </td>
                      </tr>
                      <tr>
                        <th tw="w-[19%]" css={thStandard}>
                          確定事業額 (b)
                        </th>
                        <td tw="text-end">公開不可</td>
                        <td tw="text-end">公開不可</td>
                      </tr>
                      <tr>
                        <th css={thStandard}>残額 (c=a+b)</th>
                        <td colSpan={2} tw="text-end">
                          公開不可
                        </td>
                      </tr>
                      <tr>
                        <th css={thStandard}>自己資金割合 (d=C/(B+C))</th>
                        <td colSpan={2} tw="text-end">
                          公開不可
                        </td>
                      </tr>
                      <tr>
                        <th css={thStandard}>資金分配団体への返還額 (cxd)</th>
                        <td colSpan={2} tw="text-end">
                          公開不可
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </DetailItemWrapper>
            </div> */}
            </div>
          )}
        </DetailWrapper>
      </div>
    </Layout>
  );
};

export default FinancialReport;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiSettleReportFDO: strapiSettleReport(
      business_org_type: { eq: "F" }
      biz_cd_fund_distr: { eq: $slug }
    ) {
      a_ado
      a_ado1
      a_ado2
      a_ado3
      a_ado4
      a_ado_ado
      a_ado_ado1
      a_ado_ado2
      a_ado_ado3
      a_ado_ado4
      a_ado_josei
      a_ado_josei_ado
      a_fdo
      a_fdo1
      a_fdo2
      a_fdo3
      a_fdo4
      a_kanri
      a_po
      a_po1
      a_po2
      a_po3
      a_po4
      a_sum
      a_sum1
      a_sum2
      a_sum3
      a_sum4
      ado_josei1
      ado_josei2
      ado_josei3
      ado_josei4
      ado_josei_ado1
      ado_josei_ado2
      ado_josei_ado3
      ado_josei_ado4
      b_ado
      b_ado_ado
      b_ado_josei
      b_ado_josei_ado
      b_fdo
      b_kanri
      b_po
      b_sum
      biz_cd_executive
      biz_cd_fund_distr
      business_org_type
      business_type_cd
      business_type_name
      c_ado_josei
      c_ado_josei_ado
      c_kanri
      c_sum
      create_date(formatString: "YYYY/MM/DD")
      executive_grp_cd
      financing_plan_no
      financing_pln_type
      fund_distr_grp_cd
      insert_id
      kakashi1
      kakashi2
      kakashi2_ado
      kakashi3
      kakuteijosei_ado
      kakuteijosei_ado_ado
      kakuteijosei_fdo
      kakuteijosei_po
      kakuteijosei_sum
      kanri1
      kanri2
      kanri3
      kanri4
      ruikei_ado_henkan
      ruikei_ado_kakutei
      ruikei_ado_kakutei_ado
      ruikei_ado_siharai
      ruikei_ado_siharai_ado
      ruikei_ado_zandaka
      ruikei_ado_zandaka_ado
      ruikei_fdo_juryou
      ruikei_fdo_kakutei
      ruikei_sum
      sikkou_ado_jo
      sikkou_ado_jo_ado
      sikkou_kanri
    }
    strapiSettleReportADO: strapiSettleReport(
      business_org_type: { eq: "A" }
      biz_cd_executive: { eq: $slug }
    ) {
      a_ado
      a_ado1
      a_ado2
      a_ado3
      a_ado4
      a_ado_ado
      a_ado_ado1
      a_ado_ado2
      a_ado_ado3
      a_ado_ado4
      a_ado_josei
      a_ado_josei_ado
      a_fdo
      a_fdo1
      a_fdo2
      a_fdo3
      a_fdo4
      a_kanri
      a_po
      a_po1
      a_po2
      a_po3
      a_po4
      a_sum
      a_sum1
      a_sum2
      a_sum3
      a_sum4
      ado_josei1
      ado_josei2
      ado_josei3
      ado_josei4
      ado_josei_ado1
      ado_josei_ado2
      ado_josei_ado3
      ado_josei_ado4
      b_ado
      b_ado_ado
      b_ado_josei
      b_ado_josei_ado
      b_fdo
      b_kanri
      b_po
      b_sum
      biz_cd_executive
      biz_cd_fund_distr
      business_org_type
      business_type_cd
      business_type_name
      c_ado_josei
      c_ado_josei_ado
      c_kanri
      c_sum
      create_date(formatString: "YYYY/MM/DD")
      executive_grp_cd
      financing_plan_no
      financing_pln_type
      fund_distr_grp_cd
      insert_id
      kakashi1
      kakashi2
      kakashi2_ado
      kakashi3
      kakuteijosei_ado
      kakuteijosei_ado_ado
      kakuteijosei_fdo
      kakuteijosei_po
      kakuteijosei_sum
      kanri1
      kanri2
      kanri3
      kanri4
      ruikei_ado_henkan
      ruikei_ado_kakutei
      ruikei_ado_kakutei_ado
      ruikei_ado_siharai
      ruikei_ado_siharai_ado
      ruikei_ado_zandaka
      ruikei_ado_zandaka_ado
      ruikei_fdo_juryou
      ruikei_fdo_kakutei
      ruikei_sum
      sikkou_ado_jo
      sikkou_ado_jo_ado
      sikkou_kanri
    }
    strapiSettleReportManualFDO: strapiSettleReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      data {
        url
      }
    }
    strapiSettleReportManualADO: strapiSettleReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      data {
        url
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
  }
`;
