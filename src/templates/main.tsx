import { Link, graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import "twin.macro";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import {
  businessCategoryArray,
  supportCategoryArray,
} from "../features/search/store/filterContents";
import DetailAnchor from "../components/atoms/DetailAnchor";
import { td, th } from "../styles/table";
import { detailAnchor, detailBody } from "../styles/detailPage";
import { useConsortiumContext } from "../context/consortiumContext";
import { link } from "../styles/base";
import Seo from "../components/lauout/Seo";
import { linkCollectionTypes } from "../util/linkCollectionTypes";
import { linkCollectionTypesManual } from "../util/linkCollectionTypesManual";
import {
  createAnothetGroupLabel,
  createBusinessTypeNameLabel,
  createGroupLabel,
} from "../util/createLabel";
import { isActivitySupportGroup } from "../util/businessTypeNameChecker";

const Main: React.FC<any> = ({ data, pageContext }) => {
  const { setCurrentGroupCd } = useConsortiumContext();
  const { slug } = pageContext;
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
  const support_category =
    bizPlan && "support_category" in bizPlan ? bizPlan?.support_category : null;
  const business_type_name = bizPlan?.business_type_name;
  const target_area = bizPlan?.target_area;
  const mainGroup = headerBizPlan?.mainGroup;

  const businessTypeNameLabel = createBusinessTypeNameLabel({
    business_type_name: business_type_name || "",
  });
  const isActivitySupport = isActivitySupportGroup(businessTypeNameLabel);

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

  let supportCategoryLabel: string | undefined = "";
  supportCategoryLabel = supportCategoryArray.find(
    (scp) => support_category && support_category === scp.code.toString()
  )?.label;

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
    setCurrentGroupCd("");
  }, []);

  const groupDetailAnchorLabel = createGroupLabel({
    business_org_type: business_org_type || "",
    business_type_name: businessTypeNameLabel,
  });
  const anothetGroupDetailAnchorLabel = createAnothetGroupLabel({
    business_org_type: business_org_type || "",
    business_type_name: businessTypeNameLabel,
  });

  return (
    <Layout>
      <Seo title="事業詳細 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
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
              title={anothetGroupDetailAnchorLabel}
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
                    <p css={td}>{businessTypeNameLabel}</p>
                  </div>
                )}
                {businessCategoryLabel && !isActivitySupport && (
                  <div>
                    <p css={th}>事業分類</p>
                    <p css={td}>{businessCategoryLabel}</p>
                  </div>
                )}
                {supportCategoryLabel && (
                  <div>
                    <p css={th}>支援対象区分</p>
                    <p css={td}>{supportCategoryLabel}</p>
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
                  <tr>
                    <th css={th}>採択事業年度</th>
                    <td css={td}>{businessTypeNameLabel}</td>
                  </tr>
                  {businessCategoryLabel && !isActivitySupport && (
                    <tr>
                      <th css={th}>事業分類</th>
                      <td css={td}>{businessCategoryLabel}</td>
                    </tr>
                  )}
                  {supportCategoryLabel && (
                    <tr>
                      <th css={th}>支援対象区分</th>
                      <td css={td}>{supportCategoryLabel}</td>
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
                            __html: business_overview.replace(/\n/g, "<br />"),
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
                      <p css={th}>{groupDetailAnchorLabel}名</p>
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
                        <th css={th}>{groupDetailAnchorLabel}名</th>
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
              <DetailItemWrapper itemName={anothetGroupDetailAnchorLabel}>
                <div tw="flex flex-col gap-2.5">
                  {linkedAdo.map((item, i) => (
                    <div key={i}>
                      <div tw="hidden lg:(block)">
                        <p css={th}>{anothetGroupDetailAnchorLabel}名</p>
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
      support_category
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
      business_org_type: { eq: "F" }
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
      business_org_type: { eq: "A" }
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
  }
`;
