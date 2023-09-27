import { Link, graphql } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import DetailSidebar from "../components/organisms/DetailSidebar";
import "twin.macro";
import tw from "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailAnchor from "../components/atoms/DetailAnchor";
import {
  detailAnchor,
  detailBody,
  detailCategoryName,
  detailFlex,
  detailRoundTabBtn,
  detailTab,
  detailTabBtn,
  detailTabBtnSelected,
} from "../styles/detailPage";

type ormType = {
  node: {
    biz_cd_fund_distr: string | null;
    business_org_type: string;
    data: { url: string };
    fund_distr_grp_cd: string;
    round: number;
  };
};

const SelectedProject: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const [currentTab, setCurrentTab] = useState(1);
  const { allStrapiOfferingReportManual } = data;

  const roundArray = allStrapiOfferingReportManual
    ? allStrapiOfferingReportManual.edges.map((orm: ormType) => orm.node.round)
    : [];

  const currentItem =
    allStrapiOfferingReportManual &&
    allStrapiOfferingReportManual.edges.find(
      (orm: ormType) => orm.node.round === currentTab
    );
  const currentPdfUrl = currentItem && currentItem.node.data.url;

  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${currentPdfUrl}&embedded=true`;

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="公募結果報告">
          <div css={detailTab}>
            {roundArray.length !== 0 &&
              roundArray.map((round: number) => (
                <button
                  key={round}
                  css={[
                    detailRoundTabBtn,
                    currentTab === round && detailTabBtnSelected,
                  ]}
                  onClick={() => setCurrentTab(round)}
                >
                  第{round}回
                </button>
              ))}
          </div>
          <div css={detailBody}>
            {currentItem ? (
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

export default SelectedProject;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    allStrapiOfferingReportManual(
      filter: { biz_cd_fund_distr: { eq: $slug } }
    ) {
      edges {
        node {
          data {
            url
          }
          biz_cd_fund_distr
          business_org_type
          fund_distr_grp_cd
          round
        }
      }
    }
  }
`;
