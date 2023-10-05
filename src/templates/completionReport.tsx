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

const CompletionReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const { strapiCompleteReportManualFDO, strapiCompleteReportManualADO } = data;

  const strapiCompleteReportManual =
    strapiCompleteReportManualFDO || strapiCompleteReportManualADO;
  const pdfUrl =
    strapiCompleteReportManual && strapiCompleteReportManual.data.url;
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`;

  console.log(data);

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="事業完了報告" slug={slug}>
          <div css={detailBody}>
            {strapiCompleteReportManual ? (
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

export default CompletionReport;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiCompleteReportManualFDO: strapiCompleteReportManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      data {
        url
      }
    }
    strapiCompleteReportManualADO: strapiCompleteReportManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      data {
        url
      }
    }
  }
`;
