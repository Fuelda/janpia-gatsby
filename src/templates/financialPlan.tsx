import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import DetailHeader from "../components/lauout/DetailHeader";
import Layout from "../components/lauout/Layout";
import {
  detailAnchor,
  detailBody,
  detailCategoryName,
  detailTab,
  detailTabBtn,
  detailTabBtnSelected,
} from "../styles/detailPage";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailAnchor from "../components/atoms/DetailAnchor";
import "twin.macro";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import {
  table,
  td6col,
  tdScroll,
  th25col,
  th26col,
  th2Sub5col,
  th5col,
  th6col,
  thead,
  tr,
} from "../styles/table";
import Seo from "../components/lauout/Seo";

const FinancialPlan: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const [currentTab, setCurrentTab] = useState(1);
  const {
    financePlanFDO,
    financePlanADO,
    financePlanFormerFDO,
    financePlanFormerADO,
    financePlanManualFDO,
    financePlanManualADO,
  } = data;
  const [updatedAt, setUpdatedAt] = useState("");

  const financePlan = financePlanFDO || financePlanADO;
  const financePlanFormer = financePlanFormerFDO || financePlanFormerADO;
  const financePlanManual = financePlanManualFDO || financePlanManualADO;

  const pdfUrl =
    financePlanManual &&
    financePlanManual.data &&
    `https://docs.google.com/viewer?url=${financePlanManual.data.url}&embedded=true`;

  useEffect(() => {
    financePlan && setUpdatedAt(financePlan.updatedAt);
    financePlanFormer && setUpdatedAt(financePlanFormer.updatedAt);
    financePlanManual && setUpdatedAt(financePlanManual.updatedAt);
  }, [financePlan, financePlanFormer, financePlanManual]);

  const isOnlySum =
    financePlan && !financePlan.sum_subidy && !financePlan.sum_own_funds;

  return (
    <Layout>
      <Seo title="資金計画 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <DetailWrapper category="資金計画" slug={slug} updatedAt={updatedAt}>
        {financePlanManual && pdfUrl && (
          <div>
            <iframe width="100%" height="500px" src={pdfUrl}></iframe>
          </div>
        )}

        {financePlan && isOnlySum && (
          <div tw="lg:overflow-scroll">
            <table
              css={table}
              className="table__financialPlan"
              // tw="lg:w-[780px]"
            >
              <thead css={thead}>
                <tr>
                  <th
                    rowSpan={2}
                    colSpan={2}
                    className="table__financialPlan--thead-th"
                    tw="w-1/6!"
                  ></th>
                  <td rowSpan={2} className="table__financialPlan--thead-01">
                    助成金
                  </td>
                </tr>
              </thead>
              <tbody className="table__financialPlan--tbody">
                <tr>
                  <th colSpan={2} className="table__financialPlan--tbody-01">
                    事業費 (円)
                  </th>
                  <td>
                    {financePlan.bis_sum &&
                      financePlan.bis_sum.toLocaleString()}
                  </td>
                </tr>
                {financePlan && financePlan.bis_ado && (
                  <tr>
                    <th className="table__financialPlan--tbody-sub"></th>
                    <th className="table__financialPlan--tbody-02">
                      実行団体への助成 (円)
                    </th>
                    <td>
                      {financePlan.bis_ado &&
                        financePlan.bis_ado.toLocaleString()}
                    </td>
                  </tr>
                )}
                {financePlan && financePlan.bis_ado_direct && (
                  <tr>
                    <th className="table__financialPlan--tbody-sub"></th>
                    <th className="table__financialPlan--tbody-02">
                      直接事業費 (円)
                    </th>
                    <td>
                      {financePlan.bis_ado_direct &&
                        financePlan.bis_ado_direct.toLocaleString()}
                    </td>
                  </tr>
                )}
                <tr>
                  <th></th>
                  <th className="table__financialPlan--tbody-02">
                    管理的経費 (円)
                  </th>
                  <td>
                    {financePlan.bis_manage_sum &&
                      financePlan.bis_manage_sum.toLocaleString()}
                  </td>
                </tr>
                {financePlan && financePlan.po_sum_sum && (
                  <tr>
                    <th colSpan={2} className="table__financialPlan--tbody-02">
                      プログラムオフィサー関連経費 (円)
                    </th>
                    <td>
                      {financePlan.po_sum_sum &&
                        financePlan.po_sum_sum.toLocaleString()}
                    </td>
                  </tr>
                )}
                {financePlan && financePlan.eval_sum_sum !== null ? (
                  <tr>
                    <th colSpan={2} className="table__financialPlan--tbody-01">
                      評価関連経費 (円)
                    </th>
                    <td>
                      {financePlan.eval_sum_sum &&
                        financePlan.eval_sum_sum.toLocaleString()}
                    </td>
                  </tr>
                ) : (
                  <tr />
                )}
                {financePlan && financePlan.eval_fdo_sum_sum !== null ? (
                  <tr>
                    <th className="table__financialPlan--tbody-sub"></th>
                    <th className="table__financialPlan--tbody-02">
                      資金分配団体 (円)
                    </th>
                    <td>
                      {financePlan.eval_fdo_sum_sum &&
                        financePlan.eval_fdo_sum_sum.toLocaleString()}
                    </td>
                  </tr>
                ) : (
                  <tr />
                )}
                {financePlan && financePlan.eval_ado_sum_sum !== null ? (
                  <tr>
                    <th></th>
                    <th className="table__financialPlan--tbody-02">
                      実行団体用 (円)
                    </th>
                    <td>
                      {financePlan.eval_ado_sum_sum &&
                        financePlan.eval_ado_sum_sum.toLocaleString()}
                    </td>
                  </tr>
                ) : (
                  <tr />
                )}
                <tr>
                  <th colSpan={2} className="table__financialPlan--tbody-02">
                    合計 (円)
                  </th>
                  <td>
                    {financePlan.sum_sum &&
                      financePlan.sum_sum.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {financePlan && !isOnlySum && (
          <div tw="lg:overflow-scroll">
            <table
              css={table}
              className="table__financialPlan"
              tw="lg:w-[780px]"
            >
              <thead css={thead}>
                <tr>
                  <th
                    rowSpan={2}
                    colSpan={2}
                    className="table__financialPlan--thead-th"
                  ></th>
                  <td rowSpan={2} className="table__financialPlan--thead-01">
                    合計
                  </td>
                  <td
                    colSpan={2}
                    className="table__financialPlan--thead-sub"
                  ></td>
                </tr>
                <tr>
                  <td className="table__financialPlan--thead-02">助成金</td>
                  <td>自己資金・民間資金</td>
                </tr>
              </thead>
              <tbody className="table__financialPlan--tbody">
                <tr>
                  <th colSpan={2} className="table__financialPlan--tbody-01">
                    事業費 (円)
                  </th>
                  <td>
                    {financePlan.bis_sum &&
                      financePlan.bis_sum.toLocaleString()}
                  </td>
                  <td>
                    {financePlan.bis_a && financePlan.bis_a.toLocaleString()}
                  </td>
                  <td>
                    {financePlan.bis_b && financePlan.bis_b.toLocaleString()}
                  </td>
                </tr>
                {financePlan && financePlan.bis_ado ? (
                  <tr>
                    <th className="table__financialPlan--tbody-sub"></th>
                    <th className="table__financialPlan--tbody-02">
                      実行団体への助成 (円)
                    </th>
                    <td>
                      {financePlan.bis_ado &&
                        financePlan.bis_ado.toLocaleString()}
                    </td>
                    <td>
                      {financePlan.bis_a_ado &&
                        financePlan.bis_a_ado.toLocaleString()}
                    </td>
                    <td>
                      {financePlan.bis_b_ado_sum &&
                        financePlan.bis_b_ado_sum.toLocaleString()}
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
                {financePlan && financePlan.bis_ado_direct ? (
                  <tr>
                    <th className="table__financialPlan--tbody-sub"></th>
                    <th className="table__financialPlan--tbody-02">
                      直接事業費 (円)
                    </th>
                    <td>
                      {financePlan.bis_ado_direct &&
                        financePlan.bis_ado_direct.toLocaleString()}
                    </td>
                    <td>
                      {financePlan.bis_a_ado_direct &&
                        financePlan.bis_a_ado_direct.toLocaleString()}
                    </td>
                    <td>
                      {financePlan.bis_b_ado_sum_direct &&
                        financePlan.bis_b_ado_sum_direct.toLocaleString()}
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
                <tr>
                  <th></th>
                  <th className="table__financialPlan--tbody-02">
                    管理的経費 (円)
                  </th>
                  <td>
                    {financePlan.bis_manage_sum &&
                      financePlan.bis_manage_sum.toLocaleString()}
                  </td>
                  <td>
                    {financePlan.bis_a_manage_sum &&
                      financePlan.bis_a_manage_sum.toLocaleString()}
                  </td>
                  <td>
                    {financePlan.bis_b_manage_sum &&
                      financePlan.bis_b_manage_sum.toLocaleString()}
                  </td>
                </tr>
                {financePlan && financePlan.po_sum_sum && (
                  <tr>
                    <th colSpan={2} className="table__financialPlan--tbody-02">
                      プログラムオフィサー関連経費 (円)
                    </th>
                    <td>
                      {financePlan.po_sum_sum &&
                        financePlan.po_sum_sum.toLocaleString()}
                    </td>
                    <td>
                      {financePlan.po_c_sum &&
                        financePlan.po_c_sum.toLocaleString()}
                    </td>
                    <td>
                      {financePlan.po_sum
                        ? financePlan.po_sum.toLocaleString()
                        : 0}
                    </td>
                  </tr>
                )}
                {financePlan && financePlan.eval_sum_sum !== null ? (
                  <tr>
                    <th colSpan={2} className="table__financialPlan--tbody-01">
                      評価関連経費 (円)
                    </th>
                    <td>
                      {financePlan.eval_sum_sum &&
                        financePlan.eval_sum_sum.toLocaleString()}
                    </td>
                    <td>
                      {financePlan.eval_sum &&
                        financePlan.eval_sum.toLocaleString()}
                    </td>
                    <td>
                      {financePlan.eval ? financePlan.eval.toLocaleString() : 0}
                    </td>
                  </tr>
                ) : (
                  <tr />
                )}
                {financePlan && financePlan.eval_fdo_sum_sum !== null ? (
                  <tr>
                    <th className="table__financialPlan--tbody-sub"></th>
                    <th className="table__financialPlan--tbody-02">
                      資金分配団体 (円)
                    </th>
                    <td>
                      {financePlan &&
                        financePlan.eval_fdo_sum_sum &&
                        financePlan.eval_fdo_sum_sum.toLocaleString()}
                    </td>
                    <td>
                      {financePlan &&
                        financePlan.eval_fdo_sum &&
                        financePlan.eval_fdo_sum.toLocaleString()}
                    </td>
                    <td>
                      {financePlan && financePlan.eval_fdo
                        ? financePlan.eval_fdo.toLocaleString()
                        : 0}
                    </td>
                  </tr>
                ) : (
                  <tr />
                )}

                {financePlan.eval_ado_sum_sum !== null && (
                  <tr>
                    <th></th>
                    <th className="table__financialPlan--tbody-02">
                      実行団体用 (円)
                    </th>
                    <td>
                      {financePlan.eval_ado_sum_sum &&
                        financePlan.eval_ado_sum_sum.toLocaleString()}
                    </td>
                    <td>
                      {financePlan.eval_ado_sum &&
                        financePlan.eval_ado_sum.toLocaleString()}
                    </td>
                    <td>
                      {financePlan.eval_ado
                        ? financePlan.eval_ado.toLocaleString()
                        : 0}
                    </td>
                  </tr>
                )}
                <tr>
                  <th colSpan={2} className="table__financialPlan--tbody-02">
                    合計 (円)
                  </th>
                  <td>
                    {financePlan.sum_sum &&
                      financePlan.sum_sum.toLocaleString()}
                  </td>
                  <td>
                    {financePlan.sum_subidy &&
                      financePlan.sum_subidy.toLocaleString()}
                  </td>
                  <td>
                    {financePlan.sum_own_funds &&
                      financePlan.sum_own_funds.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {financePlanFormer && (
          <div>
            <div css={detailTab}>
              <button
                css={[detailTabBtn, currentTab === 1 && detailTabBtnSelected]}
                onClick={() => setCurrentTab(1)}
              >
                調達の内訳
              </button>
              <button
                css={[detailTabBtn, currentTab === 3 && detailTabBtnSelected]}
                onClick={() => setCurrentTab(3)}
              >
                事業費
              </button>
            </div>
            {currentTab === 1 && (
              <div>
                <p css={detailCategoryName}>調達の内訳</p>
                <div css={detailAnchor}>
                  <DetailAnchor
                    title="事業費調達計画"
                    anchor={`/result/${slug}/financial-plan/#one-firstItem`}
                  />
                  <DetailAnchor
                    title="プログラムオフィサー関連経費"
                    anchor={`/result/${slug}/financial-plan/#one-secondItem`}
                  />
                  <DetailAnchor
                    title="評価関連経費"
                    anchor={`/result/${slug}/financial-plan/#one-thirdItem`}
                  />
                  <DetailAnchor
                    title="合計"
                    anchor={`/result/${slug}/financial-plan/#one-fourthItem`}
                  />
                </div>
                <div css={detailBody}>
                  <div id="one-firstItem">
                    <DetailItemWrapper itemName="事業費調達計画">
                      <div tw=" lg:overflow-scroll">
                        <table
                          css={table}
                          tw="lg:w-[780px]"
                          className="table__financialPlanFormer"
                        >
                          <thead css={thead}>
                            <tr css={tr}>
                              <th css={th5col} colSpan={2}></th>
                              {financePlanFormer.a_plus_b_2020 && (
                                <td>2020年度</td>
                              )}
                              {financePlanFormer.a_plus_b_2021 && (
                                <td>2021年度</td>
                              )}
                              {financePlanFormer.a_plus_b_2022 && (
                                <td>2022年度</td>
                              )}
                              {financePlanFormer.a_plus_b_2023 && (
                                <td>2023年度</td>
                              )}
                              {financePlanFormer.a_plus_b_2024 && (
                                <td>2024年度</td>
                              )}
                              <td>合計</td>
                            </tr>
                          </thead>
                          <tbody className="table__financialPlanFormer--tbody">
                            <tr css={tr}>
                              <th css={th5col} colSpan={2}>
                                事業費 (A+B) (円)
                              </th>
                              {financePlanFormer.a_plus_b_2020 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.a_plus_b_2020
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.a_plus_b_2021 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.a_plus_b_2021
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.a_plus_b_2022 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.a_plus_b_2022
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.a_plus_b_2023 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.a_plus_b_2023
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.a_plus_b_2024 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.a_plus_b_2024
                                  ).toLocaleString()}
                                </td>
                              )}
                              <td>
                                {financePlanFormer.a_plus_b_ttl &&
                                  parseInt(
                                    financePlanFormer.a_plus_b_ttl
                                  ).toLocaleString()}
                              </td>
                            </tr>
                            <tr css={tr}>
                              <th css={th2Sub5col}></th>
                              <th css={th25col}>A. 助成金 (円)</th>
                              {financePlanFormer.subsidy_2020 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.subsidy_2020
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.subsidy_2021 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.subsidy_2021
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.subsidy_2022 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.subsidy_2022
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.subsidy_2023 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.subsidy_2023
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.subsidy_2024 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.subsidy_2024
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.subsidy_ttl && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.subsidy_ttl
                                  ).toLocaleString()}
                                </td>
                              )}
                            </tr>
                            <tr css={tr}>
                              <th css={th2Sub5col}></th>
                              <th css={th25col}>B. 自己資金・民間資金 (円)</th>
                              {financePlanFormer.own_funds_2020 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.own_funds_2020
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.own_funds_2021 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.own_funds_2021
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.own_funds_2022 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.own_funds_2022
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.own_funds_2023 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.own_funds_2023
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.own_funds_2024 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.own_funds_2024
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.own_funds_ttl && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.own_funds_ttl
                                  ).toLocaleString()}
                                </td>
                              )}
                            </tr>
                            <tr css={tr}>
                              <th css={th2Sub5col}></th>
                              <th css={th25col}>補助率 （ A/(A+B)% ）</th>
                              {financePlanFormer.subsidy_rate_2020 && (
                                <td>{financePlanFormer.subsidy_rate_2020}%</td>
                              )}
                              {financePlanFormer.subsidy_rate_2021 && (
                                <td>{financePlanFormer.subsidy_rate_2021}%</td>
                              )}
                              {financePlanFormer.subsidy_rate_2022 && (
                                <td>{financePlanFormer.subsidy_rate_2022}%</td>
                              )}
                              {financePlanFormer.subsidy_rate_2023 && (
                                <td>{financePlanFormer.subsidy_rate_2023}%</td>
                              )}
                              {financePlanFormer.subsidy_rate_2024 && (
                                <td>{financePlanFormer.subsidy_rate_2024}%</td>
                              )}
                              {financePlanFormer.subsidy_rate_ttl && (
                                <td>{financePlanFormer.subsidy_rate_ttl}%</td>
                              )}
                            </tr>
                            <tr css={tr}>
                              <th css={th5col} colSpan={2}>
                                特例申請の有無
                              </th>
                              <td
                                colSpan={5}
                                className="table__financialPlanFormer--tbody-text"
                              >
                                {(financePlanFormer &&
                                  financePlanFormer.exception_request === "A" &&
                                  "希望する") ||
                                  (financePlanFormer.exception_request ===
                                    "B" &&
                                    "希望しない")}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </DetailItemWrapper>
                  </div>
                  <div id="one-secondItem">
                    <DetailItemWrapper itemName="プログラムオフィサー関連経費">
                      <div tw="lg:overflow-scroll">
                        {financePlanFormer && financePlanFormer.po_ttl && (
                          <table
                            css={table}
                            tw="lg:w-[780px]"
                            className="table__financialPlanFormer"
                          >
                            <thead css={thead}>
                              <tr css={tr}>
                                <th css={th5col} colSpan={2}></th>
                                {financePlanFormer.po_2020 && <td>2020年度</td>}
                                {financePlanFormer.po_2021 && <td>2021年度</td>}
                                {financePlanFormer.po_2022 && <td>2022年度</td>}
                                {financePlanFormer.po_2023 && <td>2023年度</td>}
                                {financePlanFormer.po_2024 && <td>2024年度</td>}
                                <td>合計</td>
                              </tr>
                            </thead>
                            <tbody className="table__financialPlanFormer--tbody">
                              <tr css={tr}>
                                <th css={th5col} colSpan={2}>
                                  C. プログラムオフィサー 関連経費 (円)
                                </th>
                                {financePlanFormer.po_2020 && (
                                  <td>
                                    {parseInt(
                                      financePlanFormer.po_2020
                                    ).toLocaleString()}
                                  </td>
                                )}
                                {financePlanFormer.po_2021 && (
                                  <td>
                                    {parseInt(
                                      financePlanFormer.po_2021
                                    ).toLocaleString()}
                                  </td>
                                )}
                                {financePlanFormer.po_2022 && (
                                  <td>
                                    {parseInt(
                                      financePlanFormer.po_2022
                                    ).toLocaleString()}
                                  </td>
                                )}
                                {financePlanFormer.po_2023 && (
                                  <td>
                                    {parseInt(
                                      financePlanFormer.po_2023
                                    ).toLocaleString()}
                                  </td>
                                )}
                                {financePlanFormer.po_2024 && (
                                  <td>
                                    {parseInt(
                                      financePlanFormer.po_2024
                                    ).toLocaleString()}
                                  </td>
                                )}
                                <td>
                                  {financePlanFormer.po_ttl &&
                                    parseInt(
                                      financePlanFormer.po_ttl
                                    ).toLocaleString()}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </div>
                    </DetailItemWrapper>
                  </div>
                  <div id="one-thirdItem">
                    <DetailItemWrapper itemName="評価関連経費">
                      <div tw="lg:overflow-scroll">
                        <table
                          css={table}
                          tw="lg:w-[780px]"
                          className="table__financialPlanFormer"
                        >
                          <thead css={thead}>
                            <tr css={tr}>
                              <th css={th6col} colSpan={2}></th>
                              <td css={td6col}>%</td>
                              {financePlanFormer.eval_2020 && <td>2020年度</td>}
                              {financePlanFormer.eval_2021 && <td>2021年度</td>}
                              {financePlanFormer.eval_2022 && <td>2022年度</td>}
                              {financePlanFormer.eval_2023 && <td>2023年度</td>}
                              {financePlanFormer.eval_2024 && <td>2024年度</td>}
                              <td>合計</td>
                            </tr>
                          </thead>
                          <tbody className="table__financialPlanFormer--tbody">
                            <tr css={tr}>
                              <th css={th6col} colSpan={2}>
                                D. 評価関連経費計 (円)
                              </th>
                              <td css={td6col}>-</td>
                              {financePlanFormer.eval_2020 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.eval_2020
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.eval_2021 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.eval_2021
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.eval_2022 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.eval_2022
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.eval_2023 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.eval_2023
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.eval_2024 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.eval_2024
                                  ).toLocaleString()}
                                </td>
                              )}
                              <td>
                                {financePlanFormer.eval_ttl &&
                                  parseInt(
                                    financePlanFormer.eval_ttl
                                  ).toLocaleString()}
                              </td>
                            </tr>
                            {financePlanFormer.business_org_type !== "A" && (
                              <tr css={tr}>
                                <th css={th2Sub5col}></th>
                                <th css={th26col}>資金分配団体 (円)</th>
                                <td css={td6col}>
                                  {financePlanFormer.eval_fdo_percent &&
                                    financePlanFormer.eval_fdo_percent + "%"}
                                </td>
                                {financePlanFormer.eval_fdo_2020 && (
                                  <td>
                                    {parseInt(
                                      financePlanFormer.eval_fdo_2020
                                    ).toLocaleString()}
                                  </td>
                                )}
                                {financePlanFormer.eval_fdo_2021 && (
                                  <td>
                                    {parseInt(
                                      financePlanFormer.eval_fdo_2021
                                    ).toLocaleString()}
                                  </td>
                                )}
                                {financePlanFormer.eval_fdo_2022 && (
                                  <td>
                                    {parseInt(
                                      financePlanFormer.eval_fdo_2022
                                    ).toLocaleString()}
                                  </td>
                                )}
                                {financePlanFormer.eval_fdo_2023 && (
                                  <td>
                                    {parseInt(
                                      financePlanFormer.eval_fdo_2023
                                    ).toLocaleString()}
                                  </td>
                                )}
                                {financePlanFormer.eval_fdo_2024 && (
                                  <td>
                                    {parseInt(
                                      financePlanFormer.eval_fdo_2024
                                    ).toLocaleString()}
                                  </td>
                                )}
                                <td>
                                  {financePlanFormer.eval_fdo_ttl &&
                                    parseInt(
                                      financePlanFormer.eval_fdo_ttl
                                    ).toLocaleString()}
                                </td>
                              </tr>
                            )}
                            <tr css={tr}>
                              <th css={th2Sub5col}></th>
                              <th css={th26col}>実行団体 (円)</th>
                              <td css={td6col}>
                                {financePlanFormer.eval_ado_percent &&
                                  financePlanFormer.eval_ado_percent + "%"}
                              </td>
                              {financePlanFormer.eval_ado_2020 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.eval_ado_2020
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.eval_ado_2021 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.eval_ado_2021
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.eval_ado_2022 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.eval_ado_2022
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.eval_ado_2023 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.eval_ado_2023
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.eval_ado_2024 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.eval_ado_2024
                                  ).toLocaleString()}
                                </td>
                              )}
                              <td>
                                {financePlanFormer.eval_ado_ttl &&
                                  parseInt(
                                    financePlanFormer.eval_ado_ttl
                                  ).toLocaleString()}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </DetailItemWrapper>
                  </div>
                  <div id="one-fourthItem">
                    <DetailItemWrapper itemName="合計">
                      <div tw="lg:overflow-scroll">
                        <table
                          css={table}
                          tw="lg:w-[780px]"
                          className="table__financialPlanFormer"
                        >
                          <thead css={thead}>
                            <tr css={tr}>
                              <th css={th5col} colSpan={2}></th>
                              <td>2021年度</td>
                              <td>2022年度</td>
                              <td>2023年度</td>
                              <td>2024年度</td>
                              <td>合計</td>
                            </tr>
                          </thead>
                          <tbody className="table__financialPlanFormer--tbody">
                            <tr css={tr}>
                              <th css={th5col} colSpan={2}>
                                助成金計 (A+C+D) (円)
                              </th>
                              {financePlanFormer.abc_2020 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.abc_2020
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.abc_2021 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.abc_2021
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.abc_2022 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.abc_2022
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.abc_2023 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.abc_2023
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.abc_2024 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.abc_2024
                                  ).toLocaleString()}
                                </td>
                              )}
                              <td>
                                {financePlanFormer.abc_ttl &&
                                  parseInt(
                                    financePlanFormer.abc_ttl
                                  ).toLocaleString()}
                              </td>
                            </tr>
                            <tr css={tr}>
                              <th css={th5col} colSpan={2}>
                                総事業費 (A+B+C+D) (円)
                              </th>
                              {financePlanFormer.all_2020 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.all_2020
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.all_2021 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.all_2021
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.all_2022 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.all_2022
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.all_2023 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.all_2023
                                  ).toLocaleString()}
                                </td>
                              )}
                              {financePlanFormer.all_2024 && (
                                <td>
                                  {parseInt(
                                    financePlanFormer.all_2024
                                  ).toLocaleString()}
                                </td>
                              )}
                              <td>
                                {financePlanFormer.all_ttl &&
                                  parseInt(
                                    financePlanFormer.all_ttl
                                  ).toLocaleString()}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </DetailItemWrapper>
                  </div>
                </div>
              </div>
            )}
            {currentTab === 3 && (
              <div>
                <p css={detailCategoryName}>事業費</p>
                <div css={detailBody}>
                  <div id="three-firstItem">
                    <DetailItemWrapper itemName="事業費">
                      <div tw="lg:overflow-scroll">
                        <table css={table} tw="lg:w-full">
                          <tbody className="table__financialPlanFormer--tbody">
                            <tr css={tr}>
                              <th css={th5col} colSpan={2}>
                                A. 助成金合計 (円)
                              </th>
                              <td css={tdScroll}>
                                {financePlanFormer.a_ttl &&
                                  parseInt(
                                    financePlanFormer.a_ttl
                                  ).toLocaleString()}
                              </td>
                            </tr>
                            {financePlanFormer &&
                              financePlanFormer.dct_pj_cost_a_ttl && (
                                <tr css={tr}>
                                  <th css={th2Sub5col}></th>
                                  <th css={th25col} tw="w-1/2">
                                    実行団体への助成に充当される費用 (円)
                                  </th>
                                  <td css={tdScroll}>
                                    {parseInt(
                                      financePlanFormer.dct_pj_cost_a_ttl
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              )}
                            {financePlanFormer &&
                              financePlanFormer.dct_pj_cost_a_ttl_ado && (
                                <tr css={tr}>
                                  <th css={th2Sub5col}></th>
                                  <th css={th25col} tw="w-1/2">
                                    直接事業費 (円)
                                  </th>
                                  <td css={tdScroll}>
                                    {parseInt(
                                      financePlanFormer.dct_pj_cost_a_ttl_ado
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              )}
                            <tr css={tr}>
                              <th css={th2Sub5col}></th>
                              <th css={th25col} tw="w-1/2">
                                管理的経費 (円)
                              </th>
                              <td css={tdScroll}>
                                {financePlanFormer.mg_cost_a_ttl &&
                                  parseInt(
                                    financePlanFormer.mg_cost_a_ttl
                                  ).toLocaleString()}
                              </td>
                            </tr>
                            <tr css={tr}>
                              <th css={th2Sub5col}></th>
                              <th css={th25col} tw="w-1/2">
                                (管理的経費割合)
                              </th>
                              <td css={tdScroll}>
                                {financePlanFormer.pct_mg_cost_a_ttl &&
                                  financePlanFormer.pct_mg_cost_a_ttl}
                                %
                              </td>
                            </tr>
                            <tr css={tr}>
                              <th css={th5col} colSpan={2}>
                                B. 自己資金・民間資金 (円)
                              </th>
                              <td css={tdScroll}>
                                {financePlanFormer.b_ttl &&
                                  parseInt(
                                    financePlanFormer.b_ttl
                                  ).toLocaleString()}
                              </td>
                            </tr>
                            {financePlanFormer &&
                              financePlanFormer.dct_pj_cost_b_ttl && (
                                <tr css={tr}>
                                  <th css={th2Sub5col}></th>
                                  <th css={th25col}>
                                    実行団体への助成に充当される費用 (円)
                                  </th>
                                  <td css={tdScroll}>
                                    {parseInt(
                                      financePlanFormer.dct_pj_cost_b_ttl
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              )}
                            {financePlanFormer &&
                              financePlanFormer.dct_pj_cost_b_ttl_ado && (
                                <tr css={tr}>
                                  <th css={th2Sub5col}></th>
                                  <th css={th25col}>直接事業費 (円)</th>
                                  <td css={tdScroll}>
                                    {parseInt(
                                      financePlanFormer.dct_pj_cost_b_ttl_ado
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              )}
                            {financePlanFormer &&
                              financePlanFormer.mg_cost_b_ttl && (
                                <tr css={tr}>
                                  <th css={th2Sub5col}></th>
                                  <th css={th25col}>管理的経費 (円)</th>
                                  <td css={tdScroll}>
                                    {parseInt(
                                      financePlanFormer.mg_cost_b_ttl
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              )}
                            {financePlanFormer &&
                              financePlanFormer.pct_mg_cost_b_ttl && (
                                <tr css={tr}>
                                  <th css={th2Sub5col}></th>
                                  <th css={th25col}>(管理的経費割合)</th>
                                  <td css={tdScroll}>
                                    {financePlanFormer.pct_mg_cost_b_ttl}%
                                  </td>
                                </tr>
                              )}
                          </tbody>
                        </table>
                      </div>
                    </DetailItemWrapper>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </DetailWrapper>
    </Layout>
  );
};

export default FinancialPlan;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    financePlanFDO: strapiFinancePlan(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
      financing_plan_no
      business_org_type
      biz_cd_fund_distr
      fund_distr_grp_cd
      biz_cd_executive
      executive_grp_cd
      business_type_cd
      business_type_name
      insert_id
      financing_pln_type
      bis_sum
      bis_a
      bis_b
      bis_ado
      bis_a_ado
      bis_b_ado_sum
      bis_ado_direct
      bis_a_ado_direct
      bis_b_ado_sum_direct
      bis_manage_sum
      bis_a_manage_sum
      bis_b_manage_sum
      po_sum_sum
      po_c_sum
      eval_sum_sum
      eval_sum
      eval_fdo_sum_sum
      eval_fdo_sum
      eval_ado_sum_sum
      eval_ado_sum
      sum_sum
      sum_subidy
      sum_own_funds
      create_date(formatString: "yyyy/mm/dd")
    }
    financePlanADO: strapiFinancePlan(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
      financing_plan_no
      business_org_type
      biz_cd_fund_distr
      fund_distr_grp_cd
      biz_cd_executive
      executive_grp_cd
      business_type_cd
      business_type_name
      insert_id
      financing_pln_type
      bis_sum
      bis_a
      bis_b
      bis_ado
      bis_a_ado
      bis_b_ado_sum
      bis_ado_direct
      bis_a_ado_direct
      bis_b_ado_sum_direct
      bis_manage_sum
      bis_a_manage_sum
      bis_b_manage_sum
      po_sum_sum
      po_c_sum
      eval_sum_sum
      eval_sum
      eval_fdo_sum_sum
      eval_fdo_sum
      eval_ado_sum_sum
      eval_ado_sum
      sum_sum
      sum_subidy
      sum_own_funds
      create_date(formatString: "yyyy/mm/dd")
    }
    financePlanFormerFDO: strapiFinancePlanFormer(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
      financing_plan_no
      business_org_type
      biz_cd_fund_distr
      fund_distr_grp_cd
      biz_cd_executive
      executive_grp_cd
      business_type_cd
      business_type_name
      financing_pln_type
      a_plus_b_2020
      a_plus_b_2021
      a_plus_b_2022
      a_plus_b_2023
      a_plus_b_2024
      a_plus_b_ttl
      subsidy_2020
      subsidy_2021
      subsidy_2022
      subsidy_2023
      subsidy_2024
      subsidy_ttl
      own_funds_2020
      own_funds_2021
      own_funds_2022
      own_funds_2023
      own_funds_2024
      own_funds_ttl
      subsidy_rate_2020
      subsidy_rate_2021
      subsidy_rate_2022
      subsidy_rate_2023
      subsidy_rate_2024
      subsidy_rate_ttl
      exception_request
      po_2020
      po_2021
      po_2022
      po_2023
      po_2024
      po_ttl
      eval_fdo_2020
      eval_fdo_2021
      eval_fdo_2022
      eval_fdo_2023
      eval_fdo_2024
      eval_ttl
      eval_2020
      eval_2021
      eval_2022
      eval_2023
      eval_2024
      eval_fdo_ttl
      eval_fdo_percent
      eval_ado_2020
      eval_ado_2021
      eval_ado_2022
      eval_ado_2023
      eval_ado_2024
      eval_ado_percent
      eval_ado_ttl
      abc_2020
      abc_2021
      abc_2022
      abc_2023
      abc_2024
      abc_ttl
      all_2020
      all_2021
      all_2022
      all_2023
      all_2024
      all_ttl
      a_ttl
      dct_pj_cost_a_ttl
      dct_pj_cost_a_ttl_ado
      mg_cost_a_ttl
      pct_mg_cost_a_ttl
      b_ttl
      dct_pj_cost_b_ttl
      dct_pj_cost_b_ttl_ado
      mg_cost_b_ttl
      pct_mg_cost_b_ttl
      create_date(formatString: "yyyy/mm/dd")
      insert_id
    }
    financePlanFormerADO: strapiFinancePlanFormer(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
      financing_plan_no
      business_org_type
      biz_cd_fund_distr
      fund_distr_grp_cd
      biz_cd_executive
      executive_grp_cd
      business_type_cd
      business_type_name
      financing_pln_type
      a_plus_b_2020
      a_plus_b_2021
      a_plus_b_2022
      a_plus_b_2023
      a_plus_b_2024
      a_plus_b_ttl
      subsidy_2020
      subsidy_2021
      subsidy_2022
      subsidy_2023
      subsidy_2024
      subsidy_ttl
      own_funds_2020
      own_funds_2021
      own_funds_2022
      own_funds_2023
      own_funds_2024
      own_funds_ttl
      subsidy_rate_2020
      subsidy_rate_2021
      subsidy_rate_2022
      subsidy_rate_2023
      subsidy_rate_2024
      subsidy_rate_ttl
      exception_request
      po_2020
      po_2021
      po_2022
      po_2023
      po_2024
      po_ttl
      eval_fdo_2020
      eval_fdo_2021
      eval_fdo_2022
      eval_fdo_2023
      eval_fdo_2024
      eval_ttl
      eval_2020
      eval_2021
      eval_2022
      eval_2023
      eval_2024
      eval_fdo_ttl
      eval_fdo_percent
      eval_ado_2020
      eval_ado_2021
      eval_ado_2022
      eval_ado_2023
      eval_ado_2024
      eval_ado_percent
      eval_ado_ttl
      abc_2020
      abc_2021
      abc_2022
      abc_2023
      abc_2024
      abc_ttl
      all_2020
      all_2021
      all_2022
      all_2023
      all_2024
      all_ttl
      a_ttl
      dct_pj_cost_a_ttl
      dct_pj_cost_a_ttl_ado
      mg_cost_a_ttl
      pct_mg_cost_a_ttl
      b_ttl
      dct_pj_cost_b_ttl
      dct_pj_cost_b_ttl_ado
      mg_cost_b_ttl
      pct_mg_cost_b_ttl
      create_date(formatString: "yyyy/mm/dd")
      insert_id
    }
    financePlanManualFDO: strapiFinancePlanManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      data {
        url
      }
      updatedAt(formatString: "YYYY/MM/DD")
    }
    financePlanManualADO: strapiFinancePlanManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      data {
        url
      }
      updatedAt(formatString: "YYYY/MM/DD")
    }
  }
`;
