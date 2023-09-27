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

const FinancialReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const {} = data;

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="事業詳細">
          <div css={detailAnchor}>
            <DetailAnchor
              title="事業情報"
              anchor={`/result/${slug}/#firstItem`}
            />
          </div>
          <div css={detailBody}></div>
        </DetailWrapper>
      </div>
    </Layout>
  );
};

export default FinancialReport;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiBizPlan(business_cd: { eq: $slug }) {
      business_overview {
        data {
          business_overview
        }
      }
    }
  }
`;
