import { Link, graphql } from "gatsby";
import React, { useEffect } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import DetailSidebar from "../components/organisms/DetailSidebar";
import "twin.macro";
import tw from "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import { businessCategoryArray } from "../features/search/store/filterContents";
import DetailAnchor from "../components/atoms/DetailAnchor";
import { table, td, th, tr } from "../styles/table";
import { detailAnchor, detailBody, detailFlex } from "../styles/detailPage";
import { useDetailContext } from "../context/detailContext";
import { useConsortiumContext } from "../context/consortiumContext";
import { link } from "../styles/base";
import Seo from "../components/lauout/Seo";
import { linkCollectionTypes } from "../util/linkCollectionTypes";
import { linkCollectionTypesManual } from "../util/linkCollectionTypesManual";

const Main: React.FC<any> = ({ data, pageContext }) => {
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
  const { setCurrentGroupCd } = useConsortiumContext();
  const { slug, organization_cd } = pageContext;
  const linkedBizPlan = linkCollectionTypes();
  const linkedBizPlanManual = linkCollectionTypesManual();
  const linkedAllBizPlan = [...linkedBizPlan, ...linkedBizPlanManual];
  const headerBizPlan = linkedAllBizPlan.find(
    (item) => item.bizPlan.business_cd === slug
  );
  const bizPlan = headerBizPlan?.bizPlan;
  const business_org_type = bizPlan?.business_org_type;
  const business_name = bizPlan?.business_name;
  const business_status = bizPlan?.business_status;
  const business_category = bizPlan?.business_category;
  const business_type_name = bizPlan?.business_type_name;
  const target_area = bizPlan?.target_area;
  const mainGroup = headerBizPlan?.mainGroup;

  let businessTypeNameLabel = "";
  if (business_type_name) {
    if (typeof business_type_name === "string") {
      businessTypeNameLabel = business_type_name;
    } else if (
      typeof business_type_name === "object" &&
      business_type_name.label
    ) {
      businessTypeNameLabel = business_type_name.label;
    }
  } else {
    businessTypeNameLabel = "";
  }

  const {
    strapiBizPlan,
    strapiBizPlanManualFDO,
    strapiBizPlanManualADO,
    strapiBizPlanLinkADO,
    strapiBizPlanLinkFDO,
    strapiBizPlanManualLinkADO,
    strapiBizPlanManualLinkFDO,
    allStrapiGroup,
    allStrapiGroupLink,

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
    strapiMidReportManualFDO,
    strapiMidReportManualADO,
    strapiPostReportManualFDO,
    strapiPostReportManualADO,
    strapiProgressReportManualFDO,
    strapiProgressReportManualADO,
    strapiCompleteReportManualFDO,
    strapiCompleteReportManualADO,
    strapiSettleReportFDO,
    strapiSettleReportADO,
  } = data;

  let mainGroupName = "";
  if (mainGroup) {
    mainGroupName = mainGroup.node.organization_name
      ? mainGroup.node.organization_name
      : "";
  } else {
    mainGroupName = "";
  }

  const mainGroupCd = mainGroup ? mainGroup.node.organization_cd : "";
  const consortiumGroup =
    allStrapiGroupLink &&
    allStrapiGroupLink.edges.filter(
      (gl: any) => gl.node.organization_cd !== mainGroupCd
    );

  let businessCategoryLabel: string | undefined = "";
  if (business_category) {
    if (business_category.code === 1) {
      businessCategoryLabel = business_category.subCode
        ? businessCategoryArray.find(
            (bcp) => business_category.subCode === bcp.subCode
          )?.label
        : "草の根活動支援事業";
    } else {
      businessCategoryLabel = businessCategoryArray.find(
        (bcp) => business_category.code === bcp.code
      )?.label;
    }
  } else {
    businessCategoryLabel = "";
  }

  let businessStatusText = "";
  if (typeof business_status === "number" && business_status === 0) {
    businessStatusText = "実施中";
  } else if (typeof business_status === "boolean" && business_status) {
    businessStatusText = "実施中";
  } else {
    businessStatusText = "終了";
  }

  const business_overview =
    (strapiBizPlan &&
      strapiBizPlan.business_overview.data &&
      strapiBizPlan.business_overview.data.childMarkdownRemark.html) ||
    (strapiBizPlanManualFDO &&
      strapiBizPlanManualFDO.business_overview.data &&
      strapiBizPlanManualFDO.business_overview.data.childMarkdownRemark.html) ||
    (strapiBizPlanManualADO &&
      strapiBizPlanManualADO.business_overview.data &&
      strapiBizPlanManualADO.business_overview.data.childMarkdownRemark.html);

  const linkedAdo =
    business_org_type === "F"
      ? [...strapiBizPlanLinkADO.edges, ...strapiBizPlanManualLinkADO.edges]
      : [...strapiBizPlanLinkFDO.edges, ...strapiBizPlanManualLinkFDO.edges];
  const pickupLinkedAdoGroupName = (organization_cd: string) => {
    const linkedAdoGroup = allStrapiGroup.edges.find(
      (g: any) => g.node.organization_cd === organization_cd
    );
    return linkedAdoGroup ? linkedAdoGroup.node.organization_name : "";
  };

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
    setWithSR(strapiSettleReportFDO || strapiSettleReportADO);

    setCurrentGroupCd("");
  }, []);

  return (
    <Layout>
      <Seo title="事業詳細 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="事業詳細" slug={slug}>
          <div css={detailAnchor}>
            <DetailAnchor
              title="事業情報"
              anchor={`/result/${slug}/#firstItem`}
            />
            {consortiumGroup.length !== 0 && (
              <DetailAnchor
                title="コンソーシアム構成団体"
                anchor={`/result/${slug}/#thirdItem`}
              />
            )}
            {linkedAdo.length !== 0 && (
              <DetailAnchor
                title={business_org_type === "F" ? "実行団体" : "資金分配団体"}
                anchor={`/result/${slug}/#secondItem`}
              />
            )}
          </div>
          <div css={detailBody}>
            <div id="firstItem">
              <DetailItemWrapper itemName="事業情報">
                <div tw="hidden lg:(block)">
                  <p css={th}>事業名</p>
                  <p css={td}>{business_name}</p>

                  {mainGroup && (
                    <div>
                      <p css={th}>団体名</p>
                      <p css={td}>{mainGroupName}</p>
                    </div>
                  )}
                  {business_type_name && (
                    <div>
                      <p css={th}>採択事業年度</p>
                      <p css={td}>
                        {businessTypeNameLabel && businessTypeNameLabel}
                      </p>
                    </div>
                  )}
                  {businessCategoryLabel && (
                    <div>
                      <p css={th}>事業分類</p>
                      <p css={td}>{businessCategoryLabel}</p>
                    </div>
                  )}
                  {target_area && (
                    <div>
                      <p css={th}>事業対象地域</p>
                      <p css={td}>{target_area}</p>
                    </div>
                  )}
                  {businessStatusText && (
                    <div>
                      <p css={th}>事業ステータス</p>
                      <p css={td}>{businessStatusText}</p>
                    </div>
                  )}
                  {business_overview && business_overview !== "" && (
                    <div>
                      <p css={th}>事業概要</p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: business_overview.replace(/\n/g, "<br />"),
                        }}
                        css={td}
                      />
                    </div>
                  )}
                </div>
                <table tw="lg:hidden">
                  <tbody>
                    <tr>
                      <th css={th}>事業名</th>
                      <td css={td}>{business_name}</td>
                    </tr>
                    {strapiBizPlan && strapiBizPlan.business_name_sub && (
                      <tr>
                        <th css={th}>事業名 (副)</th>
                        <td css={td}>{strapiBizPlan.business_name_sub}</td>
                      </tr>
                    )}
                    {mainGroup && (
                      <tr>
                        <th css={th}>団体名</th>
                        <td css={td}>{mainGroupName}</td>
                      </tr>
                    )}
                    {businessTypeNameLabel && (
                      <tr>
                        <th css={th}>採択事業年度</th>
                        <td css={td}>
                          {businessTypeNameLabel && businessTypeNameLabel}
                        </td>
                      </tr>
                    )}
                    {businessCategoryLabel && (
                      <tr>
                        <th css={th}>事業分類</th>
                        <td css={td}>{businessCategoryLabel}</td>
                      </tr>
                    )}
                    {target_area && (
                      <tr>
                        <th css={th}>事業対象地域</th>
                        <td css={td}>{target_area}</td>
                      </tr>
                    )}
                    <tr>
                      <th css={th}>事業ステータス</th>
                      <td css={td}>{businessStatusText}</td>
                    </tr>
                    {business_overview && business_overview !== "" && (
                      <tr>
                        <th css={th}>事業概要</th>
                        <td css={td}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: business_overview.replace(
                                /\n/g,
                                "<br />"
                              ),
                            }}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </DetailItemWrapper>
            </div>

            <div id="thirdItem">
              {consortiumGroup.length !== 0 && (
                <DetailItemWrapper itemName="コンソーシアム構成団体">
                  <div tw="hidden lg:block">
                    {consortiumGroup.map((cg: any) => (
                      <div key={cg.node.organization_cd}>
                        <p css={th}>
                          {business_org_type === "F"
                            ? "資金分配団体"
                            : "実行団体"}
                          名
                        </p>
                        <p css={td}>
                          <Link
                            to="organization"
                            onClick={() =>
                              setCurrentGroupCd(cg.node.organization_cd)
                            }
                            css={link}
                          >
                            {cg.node.organization_name}
                          </Link>
                        </p>
                      </div>
                    ))}
                  </div>
                  <table tw="lg:hidden">
                    <tbody>
                      {consortiumGroup.map((cg: any) => (
                        <tr key={cg.node.organization_cd}>
                          <th css={th}>
                            {business_org_type === "F"
                              ? "資金分配団体"
                              : "実行団体"}
                            名
                          </th>
                          <td css={td}>
                            <Link
                              to="organization"
                              onClick={() =>
                                setCurrentGroupCd(cg.node.organization_cd)
                              }
                              css={link}
                            >
                              {cg.node.organization_name}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </DetailItemWrapper>
              )}
            </div>

            <div id="secondItem">
              {linkedAdo.length !== 0 && (
                <DetailItemWrapper
                  itemName={
                    business_org_type === "F" ? "実行団体" : "資金分配団体"
                  }
                >
                  <div tw="flex flex-col gap-2.5">
                    {linkedAdo.map((item, i) => (
                      <div key={i}>
                        <div tw="hidden lg:(block)">
                          <p css={th}>
                            {business_org_type === "F"
                              ? "実行団体"
                              : "資金分配団体"}
                            名
                          </p>
                          <p css={td}>
                            {pickupLinkedAdoGroupName(
                              item.node.executive_grp_cd ||
                                item.node.fund_distr_grp_cd
                            )}
                          </p>
                          <p css={th}>事業名</p>
                          <p css={td}>
                            <Link
                              to={`/result/${
                                item.node.biz_cd_executive ||
                                item.node.biz_cd_fund_distr
                              }`}
                              css={link}
                            >
                              {item.node.business_name}
                            </Link>
                          </p>
                        </div>
                        <table tw="lg:hidden">
                          <tbody>
                            <tr>
                              <th css={th}>
                                {business_org_type === "F"
                                  ? "実行団体"
                                  : "資金分配団体"}
                                名
                              </th>
                              <td css={td}>
                                {pickupLinkedAdoGroupName(
                                  item.node.executive_grp_cd ||
                                    item.node.fund_distr_grp_cd
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th css={th}>事業名</th>
                              <td css={td}>
                                <Link
                                  to={`/result/${
                                    item.node.biz_cd_executive ||
                                    item.node.biz_cd_fund_distr
                                  }`}
                                  tw="underline text-blue-link"
                                >
                                  {item.node.business_name}
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </DetailItemWrapper>
              )}
            </div>
          </div>
        </DetailWrapper>
      </div>
    </Layout>
  );
};

export default Main;

export const pageQuery = graphql`
  query MyQuery(
    $slug: String!
    $biz_cd_fund_distr: String!
    $organization_cd: [String]
  ) {
    strapiBizPlan(business_cd: { eq: $slug }) {
      business_overview {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      business_name_sub
    }
    strapiBizPlanLinkADO: allStrapiBizPlan(
      filter: {
        biz_cd_fund_distr: { eq: $slug }
        business_org_type: { eq: "A" }
      }
    ) {
      edges {
        node {
          biz_cd_executive
          executive_grp_cd
          business_name
        }
      }
    }
    strapiBizPlanLinkFDO: allStrapiBizPlan(
      filter: {
        biz_cd_fund_distr: { eq: $biz_cd_fund_distr }
        business_org_type: { eq: "F" }
      }
    ) {
      edges {
        node {
          biz_cd_fund_distr
          fund_distr_grp_cd
          business_name
        }
      }
    }
    strapiBizPlanManualFDO: strapiBizPlanManual(
      biz_cd_fund_distr: { eq: $slug }
    ) {
      business_overview {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    strapiBizPlanManualADO: strapiBizPlanManual(
      biz_cd_executive: { eq: $slug }
    ) {
      business_overview {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    strapiBizPlanManualLinkADO: allStrapiBizPlanManual(
      filter: {
        biz_cd_fund_distr: { eq: $slug }
        business_org_type: { eq: "A" }
      }
    ) {
      edges {
        node {
          biz_cd_executive
          executive_grp_cd
          business_name
        }
      }
    }
    strapiBizPlanManualLinkFDO: allStrapiBizPlanManual(
      filter: {
        biz_cd_fund_distr: { eq: $biz_cd_fund_distr }
        business_org_type: { eq: "F" }
      }
    ) {
      edges {
        node {
          biz_cd_fund_distr
          fund_distr_grp_cd
          business_name
        }
      }
    }
    allStrapiGroup {
      edges {
        node {
          organization_name
          organization_cd
        }
      }
    }
    allStrapiGroupLink: allStrapiGroup(
      filter: { organization_cd: { in: $organization_cd } }
    ) {
      edges {
        node {
          organization_name
          organization_cd
        }
      }
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
  }
`;
