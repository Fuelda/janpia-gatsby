import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import "twin.macro";
import tw from "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailAnchor from "../components/atoms/DetailAnchor";
import { detailAnchor, detailBody } from "../styles/detailPage";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import { tableWide, td8col, th8col, thead8col } from "../styles/table";
import Seo from "../components/lauout/Seo";
import useStrapiPdf from "../hooks/useStrapiPdf";

const thStandard = tw`bg-blue-base py-3 px-3 text-start border-gray-border border`;
const thNoBorder = tw`bg-blue-base py-3 px-3 text-start `;

const FinancialReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const {
    strapiSettleReportFDO,
    strapiSettleReportADO,
    strapiSettleReportManualFDO,
    strapiSettleReportManualADO,
  } = data;
  const [updatedAt, setUpdatedAt] = useState("");

  const settleReport = strapiSettleReportFDO || strapiSettleReportADO;
  const settleReportManual =
    strapiSettleReportManualFDO || strapiSettleReportManualADO;
  const { pdfUrl, isPdfLoading } = useStrapiPdf(slug, "settle-report-manuals");

  useEffect(() => {
    settleReport && setUpdatedAt(settleReport.updatedAt);
    settleReportManual && setUpdatedAt(settleReportManual.updatedAt);
  }, [settleReport, settleReportManual]);
  return (
    <Layout>
      <Seo title="事業完了時精算報告 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <DetailWrapper
        category="事業完了時精算報告"
        slug={slug}
        updatedAt={updatedAt}
      >
        {settleReportManual && pdfUrl && (
          <div>
            {isPdfLoading ? (
              <p>Loading...</p>
            ) : (
              <iframe width="100%" height="500px" src={pdfUrl}></iframe>
            )}
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
                        <th css={th8col}>助成期間累計</th>
                        <td css={td8col} tw="text-end">
                          {settleReport.business_org_type === "F"
                            ? settleReport.ruikei_fdo_juryou &&
                              parseInt(
                                settleReport.ruikei_fdo_juryou
                              ).toLocaleString()
                            : settleReport.ruikei_ado_siharai_ado &&
                              parseInt(
                                settleReport.ruikei_ado_siharai_ado
                              ).toLocaleString()}
                        </td>
                        <td css={td8col} tw="text-end">
                          {settleReport.business_org_type === "F"
                            ? settleReport.ruikei_fdo_kakutei &&
                              parseInt(
                                settleReport.ruikei_fdo_kakutei
                              ).toLocaleString()
                            : settleReport.ruikei_ado_kakutei_ado &&
                              parseInt(
                                settleReport.ruikei_ado_kakutei_ado
                              ).toLocaleString()}
                        </td>
                        <td css={td8col} tw="text-end">
                          {settleReport.business_org_type === "F"
                            ? settleReport.kakashi1 &&
                              parseInt(settleReport.kakashi1).toLocaleString()
                            : settleReport.ruikei_ado_zandaka_ado &&
                              parseInt(
                                settleReport.ruikei_ado_zandaka_ado
                              ).toLocaleString()}
                        </td>
                        <td
                          css={[
                            th8col,
                            !settleReport.ruikei_ado_siharai &&
                              tw`bg-gray-pale text-gray-black`,
                          ]}
                          tw="text-end"
                        >
                          {settleReport.ruikei_ado_siharai &&
                            parseInt(
                              settleReport.ruikei_ado_siharai
                            ).toLocaleString()}
                        </td>
                        <td
                          css={[
                            th8col,
                            !settleReport.ruikei_ado_siharai &&
                              tw`bg-gray-pale text-gray-black`,
                          ]}
                          tw="text-end"
                        >
                          {settleReport.ruikei_ado_kakutei &&
                            parseInt(
                              settleReport.ruikei_ado_kakutei
                            ).toLocaleString()}
                        </td>
                        <td
                          css={[
                            th8col,
                            !settleReport.ruikei_ado_siharai &&
                              tw`bg-gray-pale text-gray-black`,
                          ]}
                          tw="text-end"
                        >
                          {settleReport.ruikei_ado_zandaka &&
                            parseInt(
                              settleReport.ruikei_ado_zandaka
                            ).toLocaleString()}
                        </td>
                        <td
                          css={[
                            th8col,
                            !settleReport.ruikei_ado_siharai &&
                              tw`bg-gray-pale text-gray-black`,
                          ]}
                          tw="text-end"
                        >
                          {settleReport.ruikei_ado_henkan &&
                            parseInt(
                              settleReport.ruikei_ado_henkan
                            ).toLocaleString()}
                        </td>
                        <td
                          css={[
                            th8col,
                            !settleReport.ruikei_sum &&
                              tw`bg-gray-pale text-gray-black`,
                          ]}
                          tw="text-end"
                        >
                          {settleReport.ruikei_sum &&
                            parseInt(settleReport.ruikei_sum).toLocaleString()}
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
                        <td
                          colSpan={settleReport.a_ado_josei ? 3 : 2}
                          tw="text-center"
                        >
                          事業費
                        </td>
                        {settleReport.a_po && (
                          <td rowSpan={2} tw="text-center">
                            PO関連経費
                          </td>
                        )}
                        <td tw="text-center" colSpan={2}>
                          評価関連経費
                        </td>
                        <td rowSpan={2} tw="text-center">
                          合計
                        </td>
                      </tr>
                      <tr>
                        <td tw="text-center">直接事業費</td>
                        {settleReport.a_ado_josei && (
                          <td tw="text-center">実行団体への助成</td>
                        )}
                        <td tw="text-center">管理的経費</td>
                        <td
                          tw="text-center"
                          css={
                            settleReport.business_org_type === "A" &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          資金分配団体用
                        </td>
                        <td
                          tw="text-center"
                          css={
                            settleReport.business_org_type === "A" &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          実行団体用
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {settleReport.business_type_name.includes("通常枠") && (
                        <tr>
                          <th
                            rowSpan={5}
                            tw="[writing-mode:vertical-rl] w-12"
                            css={thStandard}
                          >
                            年度末の精算報告
                          </th>
                          <th
                            rowSpan={5}
                            tw="[writing-mode:vertical-rl] w-12"
                            css={thStandard}
                          >
                            実績額
                          </th>
                          <th tw="w-32" css={thStandard}>
                            2021年度
                          </th>
                          <td tw="text-end">
                            {settleReport.ado_josei_ado1 &&
                              parseInt(
                                settleReport.ado_josei_ado1
                              ).toLocaleString()}
                          </td>
                          {settleReport.a_ado_josei && (
                            <td tw="text-end">
                              {parseInt(
                                settleReport.ado_josei1
                              ).toLocaleString()}
                            </td>
                          )}
                          <td tw="text-end">
                            {settleReport.kanri1 &&
                              parseInt(settleReport.kanri1).toLocaleString()}
                          </td>
                          {settleReport.a_po && (
                            <td tw="text-end">
                              {parseInt(settleReport.a_po1).toLocaleString()}
                            </td>
                          )}
                          <td
                            tw="text-end"
                            css={
                              !settleReport.a_fdo1 &&
                              tw`bg-gray-pale text-gray-black`
                            }
                          >
                            {settleReport.a_fdo1 &&
                              parseInt(settleReport.a_fdo1).toLocaleString()}
                          </td>
                          <td
                            tw="text-end"
                            css={
                              !settleReport.a_ado1 &&
                              !settleReport.a_ado_ado1 &&
                              tw`bg-gray-pale text-gray-black`
                            }
                          >
                            {settleReport.a_ado1 &&
                              parseInt(settleReport.a_ado1).toLocaleString()}
                            {settleReport.a_ado_ado1 &&
                              parseInt(
                                settleReport.a_ado_ado1
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_sum1 &&
                              parseInt(settleReport.a_sum1).toLocaleString()}
                          </td>
                        </tr>
                      )}
                      {settleReport.business_type_name.includes("通常枠") && (
                        <tr>
                          <th css={thStandard}>2022年度</th>
                          <td tw="text-end">
                            {settleReport.ado_josei_ado2 &&
                              parseInt(
                                settleReport.ado_josei_ado2
                              ).toLocaleString()}
                          </td>
                          {settleReport.a_ado_josei && (
                            <td tw="text-end">
                              {parseInt(
                                settleReport.ado_josei2
                              ).toLocaleString()}
                            </td>
                          )}
                          <td tw="text-end">
                            {settleReport.kanri2 &&
                              parseInt(settleReport.kanri2).toLocaleString()}
                          </td>
                          {settleReport.a_po && (
                            <td tw="text-end">
                              {parseInt(settleReport.a_po2).toLocaleString()}
                            </td>
                          )}
                          <td
                            tw="text-end"
                            css={
                              !settleReport.a_fdo2 &&
                              tw`bg-gray-pale text-gray-black`
                            }
                          >
                            {settleReport.a_fdo2 &&
                              parseInt(settleReport.a_fdo2).toLocaleString()}
                          </td>
                          <td
                            tw="text-end"
                            css={
                              !settleReport.a_ado2 &&
                              !settleReport.a_ado_ado2 &&
                              tw`bg-gray-pale text-gray-black`
                            }
                          >
                            {settleReport.a_ado2 &&
                              parseInt(settleReport.a_ado2).toLocaleString()}
                            {settleReport.a_ado_ado2 &&
                              parseInt(
                                settleReport.a_ado_ado2
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_sum2 &&
                              parseInt(settleReport.a_sum2).toLocaleString()}
                          </td>
                        </tr>
                      )}
                      {settleReport.business_type_name.includes("通常枠") && (
                        <tr>
                          <th css={thStandard}>2023年度</th>
                          <td tw="text-end">
                            {settleReport.ado_josei_ado3 &&
                              parseInt(
                                settleReport.ado_josei_ado3
                              ).toLocaleString()}
                          </td>
                          {settleReport.a_ado_josei && (
                            <td tw="text-end">
                              {parseInt(
                                settleReport.ado_josei3
                              ).toLocaleString()}
                            </td>
                          )}
                          <td tw="text-end">
                            {settleReport.kanri3 &&
                              parseInt(settleReport.kanri3).toLocaleString()}
                          </td>
                          {settleReport.a_po && (
                            <td tw="text-end">
                              {parseInt(settleReport.a_po3).toLocaleString()}
                            </td>
                          )}
                          <td
                            tw="text-end"
                            css={
                              !settleReport.a_fdo3 &&
                              tw`bg-gray-pale text-gray-black`
                            }
                          >
                            {settleReport.a_fdo3 &&
                              parseInt(settleReport.a_fdo3).toLocaleString()}
                          </td>
                          <td
                            tw="text-end"
                            css={
                              !settleReport.a_ado3 &&
                              !settleReport.a_ado_ado3 &&
                              tw`bg-gray-pale text-gray-black`
                            }
                          >
                            {settleReport.a_ado3 &&
                              parseInt(settleReport.a_ado3).toLocaleString()}
                            {settleReport.a_ado_ado3 &&
                              parseInt(
                                settleReport.a_ado_ado3
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_sum3 &&
                              parseInt(settleReport.a_sum3).toLocaleString()}
                          </td>
                        </tr>
                      )}
                      {settleReport.business_type_name.includes("通常枠") && (
                        <tr>
                          <th css={thStandard}>2024年度</th>
                          <td tw="text-end">
                            {settleReport.ado_josei_ado4 &&
                              parseInt(
                                settleReport.ado_josei_ado4
                              ).toLocaleString()}
                          </td>
                          {settleReport.a_ado_josei && (
                            <td tw="text-end">
                              {parseInt(
                                settleReport.ado_josei4
                              ).toLocaleString()}
                            </td>
                          )}
                          <td tw="text-end">
                            {settleReport.kanri4 &&
                              parseInt(settleReport.kanri4).toLocaleString()}
                          </td>
                          {settleReport.a_po && (
                            <td tw="text-end">
                              {parseInt(settleReport.a_po4).toLocaleString()}
                            </td>
                          )}
                          <td
                            tw="text-end"
                            css={
                              !settleReport.a_fdo4 &&
                              tw`bg-gray-pale text-gray-black`
                            }
                          >
                            {settleReport.a_fdo4 &&
                              parseInt(settleReport.a_fdo4).toLocaleString()}
                          </td>
                          <td
                            tw="text-end"
                            css={
                              !settleReport.a_ado4 &&
                              !settleReport.a_ado_ado4 &&
                              tw`bg-gray-pale text-gray-black`
                            }
                          >
                            {settleReport.a_ado4 &&
                              parseInt(settleReport.a_ado4).toLocaleString()}
                            {settleReport.a_ado_ado4 &&
                              parseInt(
                                settleReport.a_ado_ado4
                              ).toLocaleString()}
                          </td>
                          <td tw="text-end">
                            {settleReport.a_sum4 &&
                              parseInt(settleReport.a_sum4).toLocaleString()}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <th
                          css={thStandard}
                          colSpan={
                            settleReport.business_type_name.includes("通常枠")
                              ? 1
                              : 2
                          }
                        >
                          {settleReport.business_type_name.includes("通常枠")
                            ? "小計 (A)"
                            : "実績額"}
                        </th>
                        {!settleReport.business_type_name.includes(
                          "通常枠"
                        ) && <th css={thStandard}>小計 (A)</th>}
                        <td tw="text-end">
                          {settleReport.a_ado_josei_ado &&
                            parseInt(
                              settleReport.a_ado_josei_ado
                            ).toLocaleString()}
                        </td>
                        {settleReport.a_ado_josei && (
                          <td tw="text-end">
                            {parseInt(
                              settleReport.a_ado_josei
                            ).toLocaleString()}
                          </td>
                        )}
                        <td tw="text-end">
                          {settleReport.a_kanri &&
                            parseInt(settleReport.a_kanri).toLocaleString()}
                        </td>
                        {settleReport.a_po && (
                          <td tw="text-end">
                            {parseInt(settleReport.a_po).toLocaleString()}
                          </td>
                        )}
                        <td
                          tw="text-end"
                          css={
                            !settleReport.a_fdo &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          {settleReport.a_fdo &&
                            parseInt(settleReport.a_fdo).toLocaleString()}
                        </td>
                        <td
                          tw="text-end"
                          css={
                            !settleReport.a_ado &&
                            !settleReport.a_ado_ado &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          {settleReport.a_ado &&
                            parseInt(settleReport.a_ado).toLocaleString()}
                          {settleReport.a_ado_ado &&
                            parseInt(settleReport.a_ado_ado).toLocaleString()}
                        </td>
                        <td tw="text-end">
                          {settleReport.a_sum &&
                            parseInt(settleReport.a_sum).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <th
                          rowSpan={4}
                          css={thStandard}
                          tw="[writing-mode:vertical-rl]"
                        >
                          事業完了時の精算
                        </th>
                        <th
                          rowSpan={2}
                          css={thStandard}
                          tw="[writing-mode:vertical-rl]"
                        >
                          資金計画値
                        </th>
                        <th css={thStandard}>助成金 (B)</th>
                        <td tw="text-end">
                          {settleReport.b_ado_josei_ado &&
                            parseInt(
                              settleReport.b_ado_josei_ado
                            ).toLocaleString()}
                        </td>
                        {settleReport.a_ado_josei && (
                          <td tw="text-end">
                            {parseInt(
                              settleReport.b_ado_josei
                            ).toLocaleString()}
                          </td>
                        )}
                        <td tw="text-end">
                          {settleReport.b_kanri &&
                            parseInt(settleReport.b_kanri).toLocaleString()}
                        </td>
                        {settleReport.a_po && (
                          <td tw="text-end">
                            {parseInt(settleReport.b_po).toLocaleString()}
                          </td>
                        )}
                        <td
                          tw="text-end"
                          css={
                            !settleReport.b_fdo &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          {settleReport.b_fdo &&
                            parseInt(settleReport.b_fdo).toLocaleString()}
                        </td>
                        <td
                          tw="text-end"
                          css={
                            !settleReport.b_ado &&
                            !settleReport.b_ado_ado &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          {settleReport.b_ado &&
                            parseInt(settleReport.b_ado).toLocaleString()}
                          {settleReport.b_ado_ado &&
                            parseInt(settleReport.b_ado_ado).toLocaleString()}
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
                        {settleReport.a_ado_josei && (
                          <td tw="text-end">
                            {parseInt(
                              settleReport.c_ado_josei
                            ).toLocaleString()}
                          </td>
                        )}
                        <td tw="text-end">
                          {settleReport.c_kanri &&
                            parseInt(settleReport.c_kanri).toLocaleString()}
                        </td>
                        {settleReport.a_po && (
                          <td tw="text-end">
                            {settleReport.c_po &&
                              parseInt(settleReport.c_po).toLocaleString()}
                          </td>
                        )}
                        <td
                          tw="text-end"
                          css={
                            !settleReport.c_fdo &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          {settleReport.c_fdo &&
                            parseInt(settleReport.c_fdo).toLocaleString()}
                        </td>
                        <td
                          tw="text-end"
                          css={
                            !settleReport.c_ado &&
                            !settleReport.c_ado_ado &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          {settleReport.c_ado &&
                            parseInt(settleReport.c_ado).toLocaleString()}
                          {settleReport.c_ado_ado &&
                            parseInt(settleReport.c_ado_ado).toLocaleString()}
                        </td>
                        <td tw="text-end">
                          {settleReport.c_sum &&
                            parseInt(settleReport.c_sum).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <th
                          css={thNoBorder}
                          tw="border-gray-border border-b [writing-mode:vertical-rl]"
                        >
                          執行率
                        </th>
                        <th css={thNoBorder} tw="border-gray-border border-b">
                          (D=A/(B+C))
                        </th>
                        <td tw="text-end">
                          {settleReport.sikkou_ado_jo_ado &&
                            parseInt(
                              settleReport.sikkou_ado_jo_ado
                            ).toLocaleString() + "%"}
                        </td>
                        {settleReport.a_ado_josei && (
                          <td tw="text-end">
                            {parseInt(
                              settleReport.sikkou_ado_jo
                            ).toLocaleString() + "%"}
                          </td>
                        )}
                        <td tw="text-end">
                          {settleReport.sikkou_kanri &&
                            parseInt(
                              settleReport.sikkou_kanri
                            ).toLocaleString() + "%"}
                        </td>
                        {settleReport.a_po && (
                          <td tw="text-end">
                            {settleReport.sikkou_po &&
                              parseInt(
                                settleReport.sikkou_po
                              ).toLocaleString() + "%"}
                          </td>
                        )}
                        <td
                          tw="text-end"
                          css={
                            !settleReport.sikkou_fdo &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          {settleReport.sikkou_fdo &&
                            parseInt(settleReport.sikkou_fdo).toLocaleString() +
                              "%"}
                        </td>
                        <td
                          tw="text-end"
                          css={
                            !settleReport.sikkou_ado &&
                            !settleReport.sikkou_ado_ado &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          {settleReport.sikkou_ado &&
                            parseInt(settleReport.sikkou_ado).toLocaleString() +
                              "%"}
                          {settleReport.sikkou_ado_ado &&
                            parseInt(
                              settleReport.sikkou_ado_ado
                            ).toLocaleString() + "%"}
                        </td>
                        <td tw="text-end">
                          {settleReport.sikkou_sum &&
                            parseInt(settleReport.sikkou_sum).toLocaleString() +
                              "%"}
                        </td>
                      </tr>
                      <tr>
                        <th css={thNoBorder} tw="[writing-mode:vertical-rl]">
                          確定助成額
                        </th>
                        <th css={thNoBorder}>(E=BxD)</th>
                        <td tw="text-end">
                          {settleReport.kakashi2_ado &&
                            parseInt(
                              settleReport.kakashi2_ado
                            ).toLocaleString()}
                        </td>
                        {settleReport.a_ado_josei && (
                          <td tw="text-end">
                            {parseInt(settleReport.kakashi2).toLocaleString()}
                          </td>
                        )}
                        <td tw="text-end">
                          {settleReport.kakashi3 &&
                            parseInt(settleReport.kakashi3).toLocaleString()}
                        </td>
                        {settleReport.a_po && (
                          <td tw="text-end">
                            {parseInt(
                              settleReport.kakuteijosei_po
                            ).toLocaleString()}
                          </td>
                        )}
                        <td
                          tw="text-end"
                          css={
                            !settleReport.kakuteijosei_fdo &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          {settleReport.kakuteijosei_fdo &&
                            parseInt(
                              settleReport.kakuteijosei_fdo
                            ).toLocaleString()}
                        </td>
                        <td
                          tw="text-end"
                          css={
                            !settleReport.kakuteijosei_ado &&
                            !settleReport.kakuteijosei_ado_ado &&
                            tw`bg-gray-pale text-gray-black`
                          }
                        >
                          {settleReport.kakuteijosei_ado &&
                            parseInt(
                              settleReport.kakuteijosei_ado
                            ).toLocaleString()}
                          {settleReport.kakuteijosei_ado_ado &&
                            parseInt(
                              settleReport.kakuteijosei_ado_ado
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
          </div>
        )}
      </DetailWrapper>
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
      updatedAt(formatString: "YYYY/MM/DD")
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
      c_po
      c_ado
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
      sikkou_po
      sikkou_ado
      sikkou_sum
    }
    strapiSettleReportADO: strapiSettleReport(
      business_org_type: { eq: "A" }
      biz_cd_executive: { eq: $slug }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
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
      c_po
      c_ado
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
      sikkou_po
      sikkou_ado
      sikkou_sum
    }
    strapiSettleReportManualFDO: strapiSettleReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
    }
    strapiSettleReportManualADO: strapiSettleReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
    }
  }
`;
