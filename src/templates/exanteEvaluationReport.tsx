import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import { detailBody } from "../styles/detailPage";
import Seo from "../components/lauout/Seo";

const ExanteEvaluationReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const { strapiPreReportManualFDO, strapiPreReportManualADO } = data;

  const strapiPreReportManual =
    strapiPreReportManualFDO || strapiPreReportManualADO;

  const pdfUrl =
    strapiPreReportManual &&
    strapiPreReportManual.data &&
    `https://docs.google.com/viewer?url=${strapiPreReportManual.data.url}&embedded=true`;

  return (
    <Layout>
      <Seo title="事前評価報告 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <DetailWrapper
        category="事前評価報告"
        slug={slug}
        updatedAt={strapiPreReportManual && strapiPreReportManual.updatedAt}
      >
        <div css={detailBody}>
          {strapiPreReportManual && pdfUrl ? (
            <div>
              <iframe width="100%" height="500px" src={pdfUrl}></iframe>
            </div>
          ) : (
            <p>データはありません</p>
          )}
        </div>
      </DetailWrapper>
    </Layout>
  );
};

export default ExanteEvaluationReport;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiPreReportManualFDO: strapiPreReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      data {
        url
      }
      updatedAt(formatString: "YYYY/MM/DD")
    }
    strapiPreReportManualADO: strapiPreReportManual(
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
