import { Link, graphql } from "gatsby";
import React, { useEffect, useState } from "react";
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
  detailFlex,
  detailRoundTabBtn,
  detailTab,
  detailTabBtnSelected,
} from "../styles/detailPage";

const ProgressReport: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const [currentTab, setCurrentTab] = useState(1);
  const { allStrapiProgressReportManualFDO, allStrapiProgressReportManualADO } =
    data;

  const allStrapiProgressReportManual =
    allStrapiProgressReportManualFDO || allStrapiProgressReportManualADO;

  const sortedProgressReportManual =
    allStrapiProgressReportManual &&
    allStrapiProgressReportManual.edges.sort((a: any, b: any) => {
      const itemA = a.node.progress_round.code;
      const itemB = b.node.progress_round.code;
      return itemA - itemB;
    });

  const roundArray = allStrapiProgressReportManual
    ? allStrapiProgressReportManual.edges.map(
        (prm: any) => prm.node.progress_round.code
      )
    : [];
  const minRouond = Math.min(...roundArray);
  useEffect(() => {
    setCurrentTab(minRouond);
  }, [minRouond]);

  const currentItem =
    allStrapiProgressReportManual &&
    allStrapiProgressReportManual.edges.find(
      (prm: any) => prm.node.progress_round.code === currentTab
    );
  const currentPdfUrl = currentItem && currentItem.node.data.url;
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${currentPdfUrl}&embedded=true`;

  console.log(allStrapiProgressReportManual.edges);
  [{ node: { progress_round: { code: 1 } } }];
  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="進捗/年度末報告">
          <div css={detailTab}>
            {sortedProgressReportManual &&
              sortedProgressReportManual.map((prm: any) => (
                <button
                  key={prm.node.progress_round.code}
                  css={[
                    detailRoundTabBtn,
                    currentTab === prm.node.progress_round.code &&
                      detailTabBtnSelected,
                  ]}
                  onClick={() => setCurrentTab(prm.node.progress_round.code)}
                >
                  {prm.node.progress_round.label}
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

export default ProgressReport;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    allStrapiProgressReportManualFDO: allStrapiProgressReportManual(
      filter: {
        biz_cd_fund_distr: { eq: $slug }
        business_org_type: { eq: "F" }
      }
    ) {
      edges {
        node {
          data {
            url
          }
          progress_round {
            code
            label
          }
        }
      }
    }
    allStrapiProgressReportManualADO: allStrapiProgressReportManual(
      filter: {
        biz_cd_executive: { eq: $slug }
        business_org_type: { eq: "A" }
      }
    ) {
      edges {
        node {
          data {
            url
          }
          progress_round {
            code
            label
          }
        }
      }
    }
  }
`;
