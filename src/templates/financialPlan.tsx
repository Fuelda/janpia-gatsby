import { graphql } from "gatsby";
import React, { useState } from "react";
import DetailHeader from "../components/lauout/DetailHeader";
import Layout from "../components/lauout/Layout";
import {
  detailAnchor,
  detailBody,
  detailCategoryName,
  detailFlex,
  detailTab,
  detailTabBtn,
  detailTabBtnSelected,
} from "../styles/detailPage";
import DetailSidebar from "../components/organisms/DetailSidebar";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailAnchor from "../components/atoms/DetailAnchor";
import { hCenter } from "../styles/base";
import "twin.macro";
import tw from "twin.macro";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import {
  table,
  td,
  td6col,
  tdScroll,
  th,
  th25col,
  th26col,
  th2Sub5col,
  th5col,
  th6col,
  thead,
  tr,
} from "../styles/table";

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
  const financePlan = financePlanFDO || financePlanADO;
  const financePlanFormer = financePlanFormerFDO || financePlanFormerADO;
  const financePlanManual = financePlanManualFDO || financePlanManualADO;
  const pdfUrl = financePlanManual && financePlanManual.data.url;
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`;

  console.log(data);

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="資金計画" slug={slug}>
          {financePlanManual && (
            <div>
              <iframe
                width="100%"
                height="500px"
                src={googleDocsViewerUrl}
              ></iframe>
            </div>
          )}
          {(financePlan || financePlanFormer) && (
            <div>
              <div css={detailTab}>
                <button
                  css={[detailTabBtn, currentTab === 1 && detailTabBtnSelected]}
                  onClick={() => setCurrentTab(1)}
                >
                  調達の内訳
                </button>
                <button
                  css={[detailTabBtn, currentTab === 2 && detailTabBtnSelected]}
                  onClick={() => setCurrentTab(2)}
                >
                  自己資金・民間資金
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
                  {financePlanFormer && (
                    <div css={detailBody}>
                      <div id="one-firstItem">
                        <DetailItemWrapper itemName="事業費調達計画">
                          <div tw="lg:overflow-scroll">
                            <table css={table} tw="lg:w-[780px]">
                              <thead css={thead}>
                                <tr css={tr}>
                                  <th css={th5col} colSpan={2}></th>
                                  <td css={tdScroll}>2021年度</td>
                                  <td css={tdScroll}>2022年度</td>
                                  <td css={tdScroll}>2023年度</td>
                                  <td css={tdScroll}>2024年度</td>
                                  <td css={tdScroll}>合計</td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr css={tr}>
                                  <th css={th5col} colSpan={2}>
                                    事業費（A+B）
                                  </th>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.a_plus_b_2021}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.a_plus_b_2022}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.a_plus_b_2023}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.a_plus_b_2024}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.a_plus_b_ttl}
                                  </td>
                                </tr>
                                <tr css={tr}>
                                  <th css={th2Sub5col}></th>
                                  <th css={th25col}>A. 助成金</th>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.subsidy_2021}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.subsidy_2022}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.subsidy_2023}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.subsidy_2024}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.subsidy_ttl}
                                  </td>
                                </tr>
                                <tr css={tr}>
                                  <th css={th2Sub5col}></th>
                                  <th css={th25col}>B. 自己資金・民間資金</th>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.own_funds_2021}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.own_funds_2022}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.own_funds_2023}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.own_funds_2024}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.own_funds_ttl}
                                  </td>
                                </tr>
                                <tr css={tr}>
                                  <th css={th2Sub5col}></th>
                                  <th css={th25col}>補助率 （ A/(A+B)% ）</th>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.subsidy_rate_2021}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.subsidy_rate_2022}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.subsidy_rate_2023}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.subsidy_rate_2024}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.subsidy_rate_ttl}
                                  </td>
                                </tr>
                                <tr css={tr}>
                                  <th css={th5col} colSpan={2}>
                                    特例申請の有無
                                  </th>
                                  <td css={tdScroll} colSpan={5}>
                                    {financePlanFormer &&
                                    financePlanFormer.exception_request === "A"
                                      ? "希望する"
                                      : "希望しない"}
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
                            <table css={table} tw="lg:w-[780px]">
                              <thead css={thead}>
                                <tr css={tr}>
                                  <th css={th5col} colSpan={2}></th>
                                  <td css={tdScroll}>2021年度</td>
                                  <td css={tdScroll}>2022年度</td>
                                  <td css={tdScroll}>2023年度</td>
                                  <td css={tdScroll}>2024年度</td>
                                  <td css={tdScroll}>2025年度</td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr css={tr}>
                                  <th css={th5col} colSpan={2}>
                                    C. プログラムオフィサー 関連経費
                                  </th>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.po_2021}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.po_2022}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.po_2023}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.po_2024}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.po_ttl}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </DetailItemWrapper>
                      </div>
                      <div id="one-thirdItem">
                        <DetailItemWrapper itemName="評価関連経費">
                          <div tw="lg:overflow-scroll">
                            <table css={table} tw="lg:w-[780px]">
                              <thead css={thead}>
                                <tr css={tr}>
                                  <th css={th6col} colSpan={2}></th>
                                  <td css={td6col}>%</td>
                                  <td css={tdScroll}>2021年度</td>
                                  <td css={tdScroll}>2022年度</td>
                                  <td css={tdScroll}>2023年度</td>
                                  <td css={tdScroll}>2024年度</td>
                                  <td css={tdScroll}>合計</td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr css={tr}>
                                  <th css={th6col} colSpan={2}>
                                    D. 評価関連経費計
                                  </th>
                                  <td css={td6col}>-</td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_2021}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_2022}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_2023}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_2024}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_ttl}
                                  </td>
                                </tr>
                                <tr css={tr}>
                                  <th css={th2Sub5col}></th>
                                  <th css={th26col}>資金分配団体</th>
                                  <td css={td6col}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_fdo_percent}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_fdo_2021}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_fdo_2022}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_fdo_2023}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_fdo_2024}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_fdo_ttl}
                                  </td>
                                </tr>
                                <tr css={tr}>
                                  <th css={th2Sub5col}></th>
                                  <th css={th26col}>実行団体</th>
                                  <td css={td6col}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_ado_percent}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_ado_2021}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_ado_2022}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_ado_2023}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_ado_2024}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.eval_ado_ttl}
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
                            <table css={table} tw="lg:w-[780px]">
                              <thead css={thead}>
                                <tr css={tr}>
                                  <th css={th5col} colSpan={2}></th>
                                  <td css={tdScroll}>2021年度</td>
                                  <td css={tdScroll}>2022年度</td>
                                  <td css={tdScroll}>2023年度</td>
                                  <td css={tdScroll}>2024年度</td>
                                  <td css={tdScroll}>合計</td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr css={tr}>
                                  <th css={th5col} colSpan={2}>
                                    助成金計（A+C+D）
                                  </th>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.abc_2021}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.abc_2022}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.abc_2023}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.abc_2024}
                                  </td>
                                  <td css={tdScroll}>
                                    {financePlanFormer &&
                                      financePlanFormer.abc_ttl}
                                  </td>
                                </tr>
                                <tr css={tr}>
                                  <th css={th5col} colSpan={2}>
                                    総事業費（A+B+C+D）
                                  </th>
                                  <td css={tdScroll}>2021年度</td>
                                  <td css={tdScroll}>2022年度</td>
                                  <td css={tdScroll}>2023年度</td>
                                  <td css={tdScroll}>2024年度</td>
                                  <td css={tdScroll}>2025年度</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </DetailItemWrapper>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {currentTab === 2 && (
                <div>
                  <p css={detailCategoryName}>自己資金・民間資金</p>
                  <div css={detailAnchor}>
                    <DetailAnchor
                      title="年度別合計"
                      anchor={`/result/${slug}/financial-plan/#two-firstItem`}
                    />
                    <DetailAnchor
                      title="内訳"
                      anchor={`/result/${slug}/financial-plan/#two-secondItem`}
                    />
                  </div>
                  <div css={detailBody}>
                    <div id="two-firstItem">
                      <DetailItemWrapper itemName="年度別合計">
                        <div tw="lg:overflow-scroll">
                          <table css={table} tw="lg:w-[780px]">
                            <thead css={thead}>
                              <tr css={tr}>
                                <th css={th5col} colSpan={2}></th>
                                <td css={tdScroll}>2021年度</td>
                                <td css={tdScroll}>2022年度</td>
                                <td css={tdScroll}>2023年度</td>
                                <td css={tdScroll}>2024年度</td>
                                <td css={tdScroll}>合計</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th css={th5col} colSpan={2}>
                                  自己資金･民間資金
                                </th>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
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
                  <div css={detailAnchor}>
                    <DetailAnchor
                      title="事業費の明細"
                      anchor={`/result/${slug}/financial-plan/#three-firstItem`}
                    />
                    <DetailAnchor
                      title="実行団体への助成に充当される費用の年度別概算"
                      anchor={`/result/${slug}/financial-plan/#three-secondItem`}
                    />
                  </div>
                  <div css={detailBody}>
                    <div id="three-firstItem">
                      <DetailItemWrapper itemName="事業費の明細">
                        <div tw="lg:overflow-scroll">
                          <table css={table} tw="lg:w-[780px]">
                            <thead css={thead}>
                              <tr css={tr}>
                                <th css={th5col} colSpan={2}></th>
                                <td css={tdScroll}>2021年度</td>
                                <td css={tdScroll}>2022年度</td>
                                <td css={tdScroll}>2023年度</td>
                                <td css={tdScroll}>2024年度</td>
                                <td css={tdScroll}>合計</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr css={tr}>
                                <th css={th5col} colSpan={2}>
                                  A.助成金合計
                                </th>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
                              </tr>
                              <tr css={tr}>
                                <th css={th2Sub5col}></th>
                                <th css={th25col}>A. 助成金</th>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
                                <td css={tdScroll}>まだ</td>
                              </tr>
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
      </div>
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
    }
    financePlanManualADO: strapiFinancePlanManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      data {
        url
      }
    }
  }
`;
