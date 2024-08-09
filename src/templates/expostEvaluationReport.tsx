import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import { detailBody } from "../styles/detailPage";
import Seo from "../components/lauout/Seo";

const ExportEvaluationReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const { strapiPostReportManualFDO, strapiPostReportManualADO } = data;

  const strapiPostReportManual =
    strapiPostReportManualFDO || strapiPostReportManualADO;

  const pdfUrl =
    strapiPostReportManual &&
    strapiPostReportManual.data &&
    `https://docs.google.com/viewer?url=${strapiPostReportManual.data.url}&embedded=true`;

  return (
    <Layout>
      <Seo title="事後評価報告 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <DetailWrapper
        category="事後評価報告"
        slug={slug}
        updatedAt={strapiPostReportManual && strapiPostReportManual.updatedAt}
      >
        <div css={detailBody}>
          {strapiPostReportManual && pdfUrl ? (
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

export default ExportEvaluationReport;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiPostReportManualFDO: strapiPostReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      data {
        url
      }
      updatedAt(formatString: "YYYY/MM/DD")
    }
    strapiPostReportManualADO: strapiPostReportManual(
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
