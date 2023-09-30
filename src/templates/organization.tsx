import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import { detailAnchor, detailBody, detailFlex } from "../styles/detailPage";
import DetailSidebar from "../components/organisms/DetailSidebar";
import DetailWrapper from "../components/lauout/DetailWrapper";
import DetailAnchor from "../components/atoms/DetailAnchor";
import "twin.macro";
import DetailItemWrapper from "../components/lauout/DetailItemWrapper";
import {
  table,
  td,
  th,
  th1,
  th2,
  th2Sub,
  th3,
  th3Sub,
  thLong,
  tr,
} from "../styles/table";
import { legalPersonalityArray } from "../features/search/store/filterContents";
import AttachedFileLink from "../components/atoms/AttachedFileLink";

const Organization: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const {
    allStrapiBizPlanGroup,
    allStrapiBizPlanGroupManualADO,
    allStrapiBizPlanGroupManualFDO,
    allStrapiGroup,
    allStrapiAttachedFile,
  } = data;

  const bizPlanGroupArray = [
    ...allStrapiBizPlanGroup.edges,
    ...allStrapiBizPlanGroupManualFDO.edges,
    ...allStrapiBizPlanGroupManualADO.edges,
  ];
  const mainBizPlanGroup = bizPlanGroupArray.find((bpg) => {
    const groupRole =
      bpg.node.business_org_type === "F"
        ? bpg.node.org_role_fdo
        : bpg.node.org_role_ado;
    return groupRole === 0 || 1;
  });
  const mainBizPlanGroupCd = mainBizPlanGroup
    ? mainBizPlanGroup.node.organization_cd
    : "";
  const mainGroup = allStrapiGroup.edges.find(
    (g: any) => g.node.organization_cd === mainBizPlanGroupCd
  ) || { node: {} };

  const legalPersonality = legalPersonalityArray.find(
    (lp) =>
      mainGroup.node.legal_personality &&
      mainGroup.node.legal_personality === String(lp.code)
  );

  const teikanFile = allStrapiAttachedFile.edges.filter(
    (af: any) => af.node.item_id === "articles_of_incorporation"
  );
  const regulationFile = allStrapiAttachedFile.edges.filter(
    (af: any) => af.node.item_id === "regulations"
  );

  const etcWebUrls = [];
  mainGroup.node.etc_web_url1 !== "" &&
    etcWebUrls.push(mainGroup.node.etc_web_url1);
  mainGroup.node.etc_web_url2 !== "" &&
    etcWebUrls.push(mainGroup.node.etc_web_url2);
  mainGroup.node.etc_web_url3 !== "" &&
    etcWebUrls.push(mainGroup.node.etc_web_url3);
  mainGroup.node.etc_web_url4 !== "" &&
    etcWebUrls.push(mainGroup.node.etc_web_url4);

  return (
    <Layout>
      <DetailHeader business_cd={slug} />
      <div css={detailFlex}>
        <DetailSidebar slug={slug} />
        <DetailWrapper category="団体情報">
          <div css={detailAnchor}>
            <DetailAnchor
              title="団体組織情報"
              anchor={`/result/${slug}/organization/#firstItem`}
            />
            <DetailAnchor
              title="代表者情報"
              anchor={`/result/${slug}/organization/#secondItem`}
            />
            <DetailAnchor
              title="役員"
              anchor={`/result/${slug}/organization/#thirdItem`}
            />
            <DetailAnchor
              title="職員・従業員"
              anchor={`/result/${slug}/organization/#fourthItem`}
            />
            <DetailAnchor
              title="組織評価"
              anchor={`/result/${slug}/organization/#fifthItem`}
            />
            <DetailAnchor
              title="定款"
              anchor={`/result/${slug}/organization/#sixthItem`}
            />
            <DetailAnchor
              title="諸規定"
              anchor={`/result/${slug}/organization/#seventhItem`}
            />
          </div>
          <div css={detailBody}>
            <div id="firstItem">
              <DetailItemWrapper itemName="団体組織情報">
                <table css={table}>
                  <tbody>
                    {legalPersonality && (
                      <tr css={tr}>
                        <th css={th}>法人格</th>
                        <td css={td}>{legalPersonality?.label}</td>
                      </tr>
                    )}
                    <tr css={tr}>
                      <th css={th}>団体種別</th>
                      <td css={td}>
                        {mainGroup.node.organization_type_cd === "F"
                          ? "資金分配団体"
                          : "実行団体"}
                      </td>
                    </tr>
                    {mainGroup.node.organization_name && (
                      <tr css={tr}>
                        <th css={th}>団体名</th>
                        <td css={td}>{mainGroup.node.organization_name}</td>
                      </tr>
                    )}
                    {mainGroup.node.post_code && (
                      <tr css={tr}>
                        <th css={th}>郵便番号</th>
                        <td css={td}>{mainGroup.node.post_code}</td>
                      </tr>
                    )}
                    {mainGroup.node.prefectures && (
                      <tr css={tr}>
                        <th css={th}>都道府県</th>
                        <td css={td}>{mainGroup.node.prefectures}</td>
                      </tr>
                    )}
                    {mainGroup.node.city && (
                      <tr css={tr}>
                        <th css={th}>市区町村</th>
                        <td css={td}>{mainGroup.node.city}</td>
                      </tr>
                    )}
                    {mainGroup.node.address && (
                      <tr css={tr}>
                        <th css={th}>番地等</th>
                        <td css={td}>{mainGroup.node.address}</td>
                      </tr>
                    )}
                    {mainGroup.node.tel && (
                      <tr css={tr}>
                        <th css={th}>電話番号</th>
                        <td css={td}>{mainGroup.node.tel}</td>
                      </tr>
                    )}
                    {mainGroup.node.group_web_url && (
                      <tr css={tr}>
                        <th css={th}>団体Webサイト</th>
                        <td css={td}>
                          <a
                            href={mainGroup.node.group_web_url}
                            target="_blank"
                          >
                            {mainGroup.node.group_web_url}
                          </a>
                        </td>
                      </tr>
                    )}
                    {mainGroup.node.etc_web_url1 && (
                      <tr css={tr}>
                        <th css={th} rowSpan={etcWebUrls.length}>
                          その他のWebサイト
                        </th>
                        <td css={td}>
                          <a href={mainGroup.node.etc_web_url1} target="_blank">
                            {mainGroup.node.etc_web_url1}
                          </a>
                        </td>
                      </tr>
                    )}
                    {mainGroup.node.etc_web_url2 && (
                      <tr css={tr}>
                        <td css={td}>
                          <a href={mainGroup.node.etc_web_url2} target="_blank">
                            {mainGroup.node.etc_web_url2}
                          </a>
                        </td>
                      </tr>
                    )}
                    {mainGroup.node.etc_web_url3 && (
                      <tr css={tr}>
                        <td css={td}>
                          <a href={mainGroup.node.etc_web_url3} target="_blank">
                            {mainGroup.node.etc_web_url3}
                          </a>
                        </td>
                      </tr>
                    )}
                    {mainGroup.node.etc_web_url4 && (
                      <tr css={tr}>
                        <td css={td}>
                          <a href={mainGroup.node.etc_web_url4} target="_blank">
                            {mainGroup.node.etc_web_url4}
                          </a>
                        </td>
                      </tr>
                    )}
                    {mainGroup.node.foundation_date && (
                      <tr css={tr}>
                        <th css={th}>設立年月日</th>
                        <td css={td}>{mainGroup.node.foundation_date}</td>
                      </tr>
                    )}
                    {mainGroup.node.legal_personality_d && (
                      <tr css={tr}>
                        <th css={th}>法人格取得年月日</th>
                        <td css={td}>{mainGroup.node.legal_personality_d}</td>
                      </tr>
                    )}
                    {mainGroup.node.vision && (
                      <tr css={tr}>
                        <th css={th}>団体の目的</th>
                        <td css={td}>
                          {mainGroup.node.vision && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  mainGroup.node.vision.data.childMarkdownRemark
                                    .html,
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    )}
                    {mainGroup.node.mission && (
                      <tr css={tr}>
                        <th css={th}>団体の概要・活動・業務</th>
                        <td css={td}>
                          {mainGroup.node.mission && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  mainGroup.node.mission.data
                                    .childMarkdownRemark.html,
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </DetailItemWrapper>
            </div>
            <div id="secondItem">
              <DetailItemWrapper itemName="代表者情報">
                <table css={table}>
                  <tbody>
                    {mainGroup.node.representative_kana && (
                      <tr css={tr}>
                        <th css={th}>フリガナ</th>
                        <td css={td}>{mainGroup.node.representative_kana}</td>
                      </tr>
                    )}
                    {mainGroup.node.representative_name && (
                      <tr css={tr}>
                        <th css={th}>氏名</th>
                        <td css={td}>{mainGroup.node.representative_name}</td>
                      </tr>
                    )}
                    {mainGroup.node.representative_post && (
                      <tr css={tr}>
                        <th css={th}>役職</th>
                        <td css={td}>{mainGroup.node.representative_post}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {mainGroup.node.representative_name2 && (
                  <table css={table} tw="mt-2.5">
                    <tbody>
                      {mainGroup.node.representative_kana2 && (
                        <tr css={tr}>
                          <th css={th}>フリガナ</th>
                          <td css={td}>
                            {mainGroup.node.representative_kana2}
                          </td>
                        </tr>
                      )}
                      <tr css={tr}>
                        <th css={th}>氏名</th>
                        <td css={td}>{mainGroup.node.representative_name2}</td>
                      </tr>
                      {mainGroup.node.representative_post2 && (
                        <tr css={tr}>
                          <th css={th}>役職</th>
                          <td css={td}>
                            {mainGroup.node.representative_post2}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </DetailItemWrapper>
            </div>
            <div id="thirdItem">
              <DetailItemWrapper itemName="役員">
                <table css={table}>
                  <tbody>
                    {mainGroup.node.number_of_officers && (
                      <tr css={tr}>
                        <th css={th1} colSpan={2}>
                          役員数
                        </th>
                        <td css={td}>{mainGroup.node.number_of_officers}名</td>
                      </tr>
                    )}
                    {mainGroup.node.people_director && (
                      <tr css={tr}>
                        <th css={th2Sub} rowSpan={3}></th>
                        <th css={th2}>理事・取締役数</th>
                        <td css={td}>{mainGroup.node.people_director}名</td>
                      </tr>
                    )}
                    {mainGroup.node.councilor && (
                      <tr css={tr}>
                        <th css={th2}>評議員数</th>
                        <td css={td}>{mainGroup.node.councilor}名</td>
                      </tr>
                    )}
                    {mainGroup.node.auditor_people && (
                      <tr css={tr}>
                        <th css={th2}>監事/監査役・会計参与数</th>
                        <td css={td}>{mainGroup.node.auditor_people}名</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </DetailItemWrapper>
            </div>
            <div id="fourthItem">
              <DetailItemWrapper itemName="職員・従業員">
                <table css={table}>
                  <tbody>
                    {mainGroup.node.number_of_employees && (
                      <tr css={tr}>
                        <th css={th1} colSpan={3}>
                          職員・従業員数
                        </th>
                        <td css={td}>{mainGroup.node.number_of_employees}名</td>
                      </tr>
                    )}
                    {mainGroup.node.fulltime_employees && (
                      <tr css={tr}>
                        <th css={th2Sub} rowSpan={6}></th>
                        <th css={th3} colSpan={2}>
                          常勤職員・従業員数
                        </th>
                        <td css={td}>{mainGroup.node.fulltime_employees}名</td>
                      </tr>
                    )}
                    {mainGroup.node.fulltime_paid && (
                      <tr css={tr}>
                        <th css={th3Sub} rowSpan={2}></th>
                        <th css={th3}>有給数</th>
                        <td css={td}>{mainGroup.node.fulltime_paid}名</td>
                      </tr>
                    )}
                    {mainGroup.node.fulltime_unpaid && (
                      <tr css={tr}>
                        <th css={th3}>無給数</th>
                        <td css={td}>{mainGroup.node.fulltime_unpaid}名</td>
                      </tr>
                    )}
                    {mainGroup.node.parttime_employees && (
                      <tr css={tr}>
                        <th css={th3} colSpan={2}>
                          非常勤職員・従業員数
                        </th>
                        <td css={td}>{mainGroup.node.parttime_employees}名</td>
                      </tr>
                    )}
                    {mainGroup.node.parttime_paid && (
                      <tr css={tr}>
                        <th css={th3Sub} rowSpan={2}></th>
                        <th css={th3}>有給数</th>
                        <td css={td}>{mainGroup.node.parttime_paid}名</td>
                      </tr>
                    )}
                    {mainGroup.node.parttime_unpaid && (
                      <tr css={tr}>
                        <th css={th3}>無給数</th>
                        <td css={td}>{mainGroup.node.parttime_unpaid}名</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </DetailItemWrapper>
            </div>
            <div id="fifthItem">
              <DetailItemWrapper itemName="代表者情報">
                <table css={table}>
                  <tbody>
                    {mainGroup.node.organization_measure && (
                      <tr css={tr}>
                        <th css={thLong}>
                          過去3年以内に組織評価を受けているか
                        </th>
                        <td css={td}>
                          {mainGroup.node.organization_measure === "1"
                            ? "受けている"
                            : "受けていない"}
                        </td>
                      </tr>
                    )}
                    {mainGroup.node.certification_body && (
                      <tr css={tr}>
                        <th css={thLong}>認証機関/認証制度名/認証年度</th>
                        <td css={td}>{mainGroup.node.certification_body}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </DetailItemWrapper>
            </div>
            <div id="sixthItem">
              <DetailItemWrapper itemName="定款">
                <div tw="flex gap-[5px] flex-wrap">
                  {teikanFile.map((tf: any) => (
                    <AttachedFileLink
                      filePath={tf.node.data.url}
                      fileName={tf.node.file_name}
                      key={tf.node.data.url}
                    />
                  ))}
                </div>
              </DetailItemWrapper>
            </div>
            <div id="seventhItem">
              <DetailItemWrapper itemName="諸規定">
                <div tw="flex gap-[5px] flex-wrap">
                  {regulationFile.map((rf: any) => (
                    <AttachedFileLink
                      filePath={rf.node.data.url}
                      fileName={rf.node.file_name}
                      key={rf.node.data.url}
                    />
                  ))}
                </div>
              </DetailItemWrapper>
            </div>
          </div>
        </DetailWrapper>
      </div>
    </Layout>
  );
};

export default Organization;

export const pageQuery = graphql`
  query MyQuery(
    $slug: String!
    $insert_id: [String]
    $organization_cd: [String]
  ) {
    allStrapiBizPlanGroup(filter: { business_cd: { eq: $slug } }) {
      edges {
        node {
          business_cd
          organization_cd
          business_org_type
          org_role_fdo
          org_role_ado
        }
      }
    }
    allStrapiBizPlanGroupManualFDO: allStrapiBizPlanGroupManual(
      filter: { biz_cd_fund_distr: { eq: $slug } }
    ) {
      edges {
        node {
          biz_cd_executive
          biz_cd_fund_distr
          business_org_type
          executive_grp_cd
          fund_distr_grp_cd
          org_role_ado
          org_role_fdo
        }
      }
    }
    allStrapiBizPlanGroupManualADO: allStrapiBizPlanGroupManual(
      filter: { biz_cd_executive: { eq: $slug } }
    ) {
      edges {
        node {
          biz_cd_executive
          biz_cd_fund_distr
          business_org_type
          executive_grp_cd
          fund_distr_grp_cd
          org_role_ado
          org_role_fdo
        }
      }
    }
    allStrapiAttachedFile(filter: { insert_id: { in: $insert_id } }) {
      edges {
        node {
          item_id
          file_name
          data {
            url
          }
        }
      }
    }
    allStrapiGroup(filter: { organization_cd: { in: $organization_cd } }) {
      edges {
        node {
          insert_id
          legal_personality
          organization_type_cd
          organization_type
          post_code
          prefectures
          city
          address
          tel
          group_web_url
          etc_web_url1
          etc_web_url2
          etc_web_url3
          etc_web_url4
          foundation_date(formatString: "yyyy/mm/dd")
          legal_personality_d(formatString: "yyyy/mm/dd")
          representative_kana
          representative_name
          representative_kana2
          representative_name2
          representative_post
          representative_post2
          number_of_officers
          people_director
          councilor
          auditor_people
          number_of_employees
          fulltime_employees
          fulltime_paid
          fulltime_unpaid
          parttime_employees
          parttime_paid
          parttime_unpaid
          organization_measure
          certification_body
          organization_cd
          organization_name
          vision {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
          mission {
            data {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  }
`;
