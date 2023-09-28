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

const InterimReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const { strapiMidReportManualFDO, strapiMidReportManualADO } = data;

  const strapiMidReportManual =
    strapiMidReportManualFDO || strapiMidReportManualADO;
  const pdfUrl = strapiMidReportManual && strapiMidReportManual.data.url;
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`;

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="中間評価報告">
          <div css={detailBody}>
            {strapiMidReportManual ? (
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

export default InterimReport;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiMidReportManualFDO: strapiMidReportManual(
      biz_cd_fund_distr: { eq: $slug }
    ) {
      biz_cd_executive
      biz_cd_fund_distr
      business_org_type
      data {
        url
      }
    }
    strapiMidReportManualADO: strapiMidReportManual(
      biz_cd_executive: { eq: $slug }
    ) {
      biz_cd_executive
      biz_cd_fund_distr
      business_org_type
      data {
        url
      }
    }
  }
`;
