import { graphql } from "gatsby";
import React, { useEffect } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import DetailSidebar from "../components/organisms/DetailSidebar";
import "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import { detailBody, detailFlex } from "../styles/detailPage";
import { useDetailContext } from "../context/detailContext";
import Seo from "../components/lauout/Seo";
import useStrapiPdf from "../hooks/useStrapiPdf";

const InterimReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const {
    strapiMidReportManualFDO,
    strapiMidReportManualADO,
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
    strapiPostReportManualFDO,
    strapiPostReportManualADO,
    strapiProgressReportManualFDO,
    strapiProgressReportManualADO,
    strapiCompleteReportManualFDO,
    strapiCompleteReportManualADO,
    strapiSettleReportFDO,
    strapiSettleReportADO,
    strapiSettleReportManualFDO,
    strapiSettleReportManualADO,
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

  const strapiMidReportManual =
    strapiMidReportManualFDO || strapiMidReportManualADO;
  const { pdfUrl, isPdfLoading } = useStrapiPdf(slug, "mid-report-manuals");

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
      <Seo title="中間評価報告 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper
          category="中間評価報告"
          slug={slug}
          updatedAt={strapiMidReportManual && strapiMidReportManual.updatedAt}
        >
          <div css={detailBody}>
            {strapiMidReportManual && pdfUrl ? (
              <div>
                {isPdfLoading ? (
                  <p>Loading...</p>
                ) : (
                  <iframe width="100%" height="500px" src={pdfUrl}></iframe>
                )}
              </div>
            ) : (
              <p>データはありません</p>
            )}
          </div>
        </DetailWrapper>
      </div>
    </Layout>
  );
};

export default InterimReport;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiMidReportManualFDO: strapiMidReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
      biz_cd_executive
      biz_cd_fund_distr
      business_org_type
    }
    strapiMidReportManualADO: strapiMidReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      updatedAt(formatString: "YYYY/MM/DD")
      biz_cd_executive
      biz_cd_fund_distr
      business_org_type
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
    strapiSettleReportManualFDO: strapiSettleReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      id
    }
    strapiSettleReportManualADO: strapiSettleReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      id
    }
  }
`;
