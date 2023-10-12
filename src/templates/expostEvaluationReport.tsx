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

const ExportEvaluationReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const { strapiPostReportManualFDO, strapiPostReportManualADO } = data;

  const strapiPostReportManual =
    strapiPostReportManualFDO || strapiPostReportManualADO;
  const pdfUrl = strapiPostReportManual && strapiPostReportManual.data.url;
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`;

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="事後評価報告" slug={slug}>
          <div css={detailBody}>
            {strapiPostReportManual ? (
              <div>
                <iframe
                  width="100%"
                  height="500px"
                  src={googleDocsViewerUrl}
                ></iframe>
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
    }
    strapiPostReportManualADO: strapiPostReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      data {
        url
      }
    }
  }
`;
