import { Link, graphql } from "gatsby";
import React from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import DetailSidebar from "../components/organisms/DetailSidebar";
import "twin.macro";
import tw from "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailAnchor from "../components/atoms/DetailAnchor";
import { detailAnchor, detailBody, detailFlex } from "../styles/detailPage";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import {
  table,
  tableWide,
  td8col,
  th8col,
  thead,
  thead8col,
} from "../styles/table";

const FinancialReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const { strapiSettleReportFDO, strapiSettleReportADO } = data;
  const settleReport = strapiSettleReportFDO || strapiSettleReportADO;
  console.log(settleReport);

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="事業完了時精算報告">
          <div css={detailAnchor}>
            <DetailAnchor
              title="事業完了時の精算"
              anchor={`/result/${slug}/financial-report/#firstItem`}
            />
            <DetailAnchor
              title="実行団体の精算"
              anchor={`/result/${slug}/financial-report/#secondItem`}
            />
            <DetailAnchor
              title="実行団体の精算"
              anchor={`/result/${slug}/financial-report/#thirdItem`}
            />
          </div>
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
                        <td colSpan={4} tw="border border-gray-border">
                          実行団体の精算（Ⅱ）
                        </td>
                        <td>（Ⅰ+Ⅱ）</td>
                      </tr>
                      <tr>
                        <td css={th8col}>①助成金受領額</td>
                        <td css={th8col}>②確定助成額</td>
                        <td css={th8col}>
                          ①-②残額
                          <br />
                          （精算金額ⅰ）
                        </td>
                        <td css={th8col}>①助成金受領額</td>
                        <td css={th8col}>②確定助成額</td>
                        <td css={th8col}>
                          ①-②残額
                          <br />
                          （精算金額ⅱ）
                        </td>
                        <td css={th8col}>
                          ③資金分配団体
                          <br />
                          への返還額
                        </td>
                        <td css={th8col}>
                          精算金額合計
                          <br />
                          （ⅰ+ⅱ-③)
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th css={th8col}>助成機関累計</th>
                        <td css={td8col}>aaa</td>
                        <td css={td8col}>aaa</td>
                        <td css={td8col}>aaa</td>
                        <td css={td8col}>aaa</td>
                        <td css={td8col}>aaa</td>
                        <td css={td8col}>aaa</td>
                        <td css={td8col}>aaa</td>
                        <td css={td8col}>aaa</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </DetailItemWrapper>
            </div>
            <div id="firstItem">
              <DetailItemWrapper itemName="実行団体の精算">
                <div tw="w-full overflow-x-scroll">
                  <table css={tableWide} tw="w-[780px]">
                    <thead css={thead8col}>
                      <tr>
                        <th colSpan={3} rowSpan={2}></th>
                        <td colSpan={2} tw="border border-gray-border">
                          事業費
                        </td>
                        <td rowSpan={2}>評価関連経費</td>
                        <td rowSpan={2}>合計</td>
                      </tr>
                      <tr>
                        <td tw="border border-gray-border">直接事業費</td>
                        <td tw="border border-gray-border">直接事業費</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th rowSpan={5} tw="w-[11.5%]">
                          年度末の
                          <br />
                          精算報告
                        </th>
                        <th rowSpan={5} tw="w-[14%]">
                          実績額
                        </th>
                        <th>2021年度</th>
                        <td>2022年度</td>
                        <td>2023年度</td>
                        <td>2024年度</td>
                        <td>小計 (A)</td>
                      </tr>
                      <tr>
                        <th>2022年度</th>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                      </tr>
                      <tr>
                        <th>2023年度</th>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                      </tr>
                      <tr>
                        <th>2024年度</th>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                      </tr>
                      <tr>
                        <th>小計 (A)</th>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                      </tr>
                      <tr>
                        <th rowSpan={4}>年度末の精算報告</th>
                        <th rowSpan={2}>実績額</th>
                        <th>2021年度</th>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                      </tr>
                      <tr>
                        <th>2021年度</th>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                      </tr>
                      <tr>
                        <th colSpan={2}>2021年度</th>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                      </tr>
                      <tr>
                        <th colSpan={2}>2021年度</th>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                        <td>aaa</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </DetailItemWrapper>
            </div>
          </div>
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
  }
`;
