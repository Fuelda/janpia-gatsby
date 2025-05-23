import { graphql } from "gatsby";
import React, { useEffect } from "react";
import Layout from "../components/lauout/Layout";
import DetailHeader from "../components/lauout/DetailHeader";
import {
  detailAnchor,
  detailBody,
  detailRoundTabBtn,
  detailTab,
  detailTabBtnSelected,
} from "../styles/detailPage";
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
import { formatDate } from "../util/formatDate";
import { useConsortiumContext } from "../context/consortiumContext";
import { link } from "../styles/base";
import Seo from "../components/lauout/Seo";
import {
  createBusinessTypeNameLabel,
  createGroupLabel,
} from "../util/createLabel";

const Organization: React.FC<any> = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const { currentGroupCd, setCurrentGroupCd } = useConsortiumContext();

  const {
    strapiBizPlan,
    strapiBizPlanManualFDO,
    strapiBizPlanManualADO,
    allStrapiBizPlanGroup,
    allStrapiBizPlanGroupManualADO,
    allStrapiBizPlanGroupManualFDO,
    allStrapiGroup,
    allStrapiAttachedFile,
  } = data;

  const bizPlan =
    strapiBizPlan || strapiBizPlanManualFDO || strapiBizPlanManualADO;
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
  let mainGroupCd = "";
  if (bizPlan) {
    mainGroupCd =
      bizPlan.business_org_type === "F"
        ? bizPlan.fund_distr_grp_cd
        : bizPlan.executive_grp_cd;
  } else {
    mainGroupCd = mainBizPlanGroupCd;
  }
  const mainGroup = allStrapiGroup.edges.find(
    (g: any) => g.node.organization_cd === mainGroupCd
  ) || { node: {} };
  const consortiumGroup = allStrapiGroup.edges.filter(
    (g: any) => g.node.organization_cd !== mainGroupCd
  ) || { node: {} };
  const displayGroup = allStrapiGroup.edges.find(
    (g: any) => g.node.organization_cd === currentGroupCd
  ) || { node: {} };

  const legalPersonality = legalPersonalityArray.find(
    (lp) =>
      displayGroup.node.legal_personality &&
      displayGroup.node.legal_personality === String(lp.code)
  );

  const teikanFile = allStrapiAttachedFile.edges.filter(
    (af: any) =>
      af.node.item_id === "articles_of_incorporation" &&
      af.node.insert_id === displayGroup.node.insert_id
  );
  const regulationFile = allStrapiAttachedFile.edges.filter(
    (af: any) =>
      af.node.item_id === "regulations" &&
      af.node.insert_id === displayGroup.node.insert_id
  );

  const etcWebUrls = [];
  displayGroup.node.etc_web_url1 !== "" &&
    etcWebUrls.push(displayGroup.node.etc_web_url1);
  displayGroup.node.etc_web_url2 !== "" &&
    etcWebUrls.push(displayGroup.node.etc_web_url2);
  displayGroup.node.etc_web_url3 !== "" &&
    etcWebUrls.push(displayGroup.node.etc_web_url3);
  displayGroup.node.etc_web_url4 !== "" &&
    etcWebUrls.push(displayGroup.node.etc_web_url4);

  useEffect(() => {
    currentGroupCd === "" && setCurrentGroupCd(mainGroupCd);
  }, [mainGroupCd]);

  const businessTypeNameLabel = createBusinessTypeNameLabel({
    business_type_name: bizPlan.business_type_name,
  });
  const groupLabel = createGroupLabel({
    business_org_type: bizPlan.business_org_type,
    business_type_name: businessTypeNameLabel,
  });

  return (
    <Layout>
      <Seo title="団体情報 | 休眠預金活用事業 情報公開サイト" />
      <DetailHeader business_cd={slug} />
      <DetailWrapper
        category="団体情報"
        slug={slug}
        updatedAt={displayGroup && displayGroup.node.updatedAt}
      >
        {consortiumGroup.length !== 0 && (
          <div>
            <button
              css={[
                detailRoundTabBtn,
                currentGroupCd === mainGroupCd && detailTabBtnSelected,
              ]}
              onClick={() => setCurrentGroupCd(mainGroupCd)}
              tw="mb-4"
            >
              {mainGroup.node.organization_name}
            </button>
            <DetailItemWrapper itemName="コンソーシアム構成団体">
              <div css={detailTab}>
                {consortiumGroup.map((g: any) => (
                  <button
                    key={g.node.organization_cd}
                    css={[
                      detailRoundTabBtn,
                      currentGroupCd === g.node.organization_cd &&
                        detailTabBtnSelected,
                    ]}
                    onClick={() => setCurrentGroupCd(g.node.organization_cd)}
                  >
                    {g.node.organization_name}
                  </button>
                ))}
              </div>
            </DetailItemWrapper>
          </div>
        )}
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
          {teikanFile.length !== 0 && (
            <DetailAnchor
              title="定款"
              anchor={`/result/${slug}/organization/#sixthItem`}
            />
          )}
          {regulationFile.length !== 0 && (
            <DetailAnchor
              title="諸規程"
              anchor={`/result/${slug}/organization/#seventhItem`}
            />
          )}
        </div>
        <div css={detailBody}>
          <div id="firstItem">
            <DetailItemWrapper itemName="団体組織情報">
              <div tw="hidden lg:(block)">
                {legalPersonality && (
                  <div>
                    <p css={th}>法人格</p>
                    <p css={td}>{legalPersonality?.label}</p>
                  </div>
                )}
                <p css={th}>団体種別</p>
                <p css={td}>{groupLabel}</p>
                {displayGroup.node.organization_name && (
                  <div>
                    <p css={th}>団体名</p>
                    <p css={td}>{displayGroup.node.organization_name}</p>
                  </div>
                )}
                {displayGroup.node.post_code && (
                  <div>
                    <p css={th}>郵便番号</p>
                    <p css={td}>{displayGroup.node.post_code}</p>
                  </div>
                )}
                {displayGroup.node.prefectures && (
                  <div>
                    <p css={th}>都道府県</p>
                    <p css={td}>{displayGroup.node.prefectures}</p>
                  </div>
                )}
                {displayGroup.node.city && (
                  <div>
                    <p css={th}>市区町村</p>
                    <p css={td}>{displayGroup.node.city}</p>
                  </div>
                )}
                {displayGroup.node.address && (
                  <div>
                    <p css={th}>番地等</p>
                    <p css={td}>{displayGroup.node.address}</p>
                  </div>
                )}
                {displayGroup.node.tel && (
                  <div>
                    <p css={th}>電話番号</p>
                    <p css={td}>{displayGroup.node.tel}</p>
                  </div>
                )}
                {displayGroup.node.group_web_url && (
                  <div>
                    <p css={th}>団体Webサイト</p>
                    <p css={td}>
                      <a
                        href={displayGroup.node.group_web_url}
                        target="_blank"
                        css={link}
                      >
                        {displayGroup.node.group_web_url}
                      </a>
                    </p>
                  </div>
                )}
                {displayGroup.node.etc_web_url1 && (
                  <div>
                    <p css={th}>その他のWebサイト</p>
                    <p css={td}>
                      <a
                        href={displayGroup.node.etc_web_url1}
                        target="_blank"
                        css={link}
                      >
                        {displayGroup.node.etc_web_url1}
                      </a>
                    </p>
                    {displayGroup.node.etc_web_url2 && (
                      <p css={td}>
                        <a
                          href={displayGroup.node.etc_web_url2}
                          target="_blank"
                          css={link}
                        >
                          {displayGroup.node.etc_web_url2}
                        </a>
                      </p>
                    )}
                    {displayGroup.node.etc_web_url3 && (
                      <p css={td}>
                        <a
                          href={displayGroup.node.etc_web_url3}
                          target="_blank"
                          css={link}
                        >
                          {displayGroup.node.etc_web_url3}
                        </a>
                      </p>
                    )}
                    {displayGroup.node.etc_web_url4 && (
                      <p css={td}>
                        <a
                          href={displayGroup.node.etc_web_url4}
                          target="_blank"
                          css={link}
                        >
                          {displayGroup.node.etc_web_url4}
                        </a>
                      </p>
                    )}
                  </div>
                )}
                {displayGroup.node.foundation_date && (
                  <div>
                    <p css={th}>設立年月日</p>
                    <p css={td}>
                      {formatDate(displayGroup.node.foundation_date)}
                    </p>
                  </div>
                )}
                {displayGroup.node.legal_personality_d && (
                  <div>
                    <p css={th}>法人格取得年月日</p>
                    <p css={td}>
                      {formatDate(displayGroup.node.legal_personality_d)}
                    </p>
                  </div>
                )}
              </div>
              <table css={table} tw="lg:hidden">
                <tbody>
                  {legalPersonality && (
                    <tr css={tr}>
                      <th css={th}>法人格</th>
                      <td css={td}>{legalPersonality?.label}</td>
                    </tr>
                  )}
                  <tr css={tr}>
                    <th css={th}>団体種別</th>
                    <td css={td}>{groupLabel}</td>
                  </tr>
                  {displayGroup.node.organization_name && (
                    <tr css={tr}>
                      <th css={th}>団体名</th>
                      <td css={td}>{displayGroup.node.organization_name}</td>
                    </tr>
                  )}
                  {displayGroup.node.post_code && (
                    <tr css={tr}>
                      <th css={th}>郵便番号</th>
                      <td css={td}>{displayGroup.node.post_code}</td>
                    </tr>
                  )}
                  {displayGroup.node.prefectures && (
                    <tr css={tr}>
                      <th css={th}>都道府県</th>
                      <td css={td}>{displayGroup.node.prefectures}</td>
                    </tr>
                  )}
                  {displayGroup.node.city && (
                    <tr css={tr}>
                      <th css={th}>市区町村</th>
                      <td css={td}>{displayGroup.node.city}</td>
                    </tr>
                  )}
                  {displayGroup.node.address && (
                    <tr css={tr}>
                      <th css={th}>番地等</th>
                      <td css={td}>{displayGroup.node.address}</td>
                    </tr>
                  )}
                  {displayGroup.node.tel && (
                    <tr css={tr}>
                      <th css={th}>電話番号</th>
                      <td css={td}>{displayGroup.node.tel}</td>
                    </tr>
                  )}
                  {displayGroup.node.group_web_url && (
                    <tr css={tr}>
                      <th css={th}>団体Webサイト</th>
                      <td css={td}>
                        <a
                          href={displayGroup.node.group_web_url}
                          target="_blank"
                          css={link}
                        >
                          {displayGroup.node.group_web_url}
                        </a>
                      </td>
                    </tr>
                  )}
                  {displayGroup.node.etc_web_url1 && (
                    <tr css={tr}>
                      <th css={th} rowSpan={etcWebUrls.length}>
                        その他のWebサイト
                      </th>
                      <td css={td}>
                        <a
                          href={displayGroup.node.etc_web_url1}
                          target="_blank"
                          css={link}
                        >
                          {displayGroup.node.etc_web_url1}
                        </a>
                      </td>
                    </tr>
                  )}
                  {displayGroup.node.etc_web_url2 && (
                    <tr css={tr}>
                      <td css={td}>
                        <a
                          href={displayGroup.node.etc_web_url2}
                          target="_blank"
                        >
                          {displayGroup.node.etc_web_url2}
                        </a>
                      </td>
                    </tr>
                  )}
                  {displayGroup.node.etc_web_url3 && (
                    <tr css={tr}>
                      <td css={td}>
                        <a
                          href={displayGroup.node.etc_web_url3}
                          target="_blank"
                        >
                          {displayGroup.node.etc_web_url3}
                        </a>
                      </td>
                    </tr>
                  )}
                  {displayGroup.node.etc_web_url4 && (
                    <tr css={tr}>
                      <td css={td}>
                        <a
                          href={displayGroup.node.etc_web_url4}
                          target="_blank"
                        >
                          {displayGroup.node.etc_web_url4}
                        </a>
                      </td>
                    </tr>
                  )}
                  {displayGroup.node.foundation_date && (
                    <tr css={tr}>
                      <th css={th}>設立年月日</th>
                      <td css={td}>
                        {formatDate(displayGroup.node.foundation_date)}
                      </td>
                    </tr>
                  )}
                  {displayGroup.node.legal_personality_d && (
                    <tr css={tr}>
                      <th css={th}>法人格取得年月日</th>
                      <td css={td}>
                        {formatDate(displayGroup.node.legal_personality_d)}
                      </td>
                    </tr>
                  )}
                  {/* {displayGroup.node.vision && (
                    <tr css={tr}>
                      <th css={th}>団体の目的</th>
                      <td css={td}>
                        {displayGroup.node.vision && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                displayGroup.node.vision.data.childMarkdownRemark.html.replace(
                                  /\n/g,
                                  "<br />"
                                ),
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  )}
                  {displayGroup.node.mission && (
                    <tr css={tr}>
                      <th css={th}>団体の概要・活動・業務</th>
                      <td css={td}>
                        {displayGroup.node.mission && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                displayGroup.node.mission.data.childMarkdownRemark.html.replace(
                                  /\n/g,
                                  "<br />"
                                ),
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  )} */}
                </tbody>
              </table>
            </DetailItemWrapper>
          </div>
          <div id="secondItem">
            <DetailItemWrapper itemName="代表者情報">
              <div tw="hidden lg:block">
                {displayGroup.node.representative_kana && (
                  <div>
                    <p css={th}>フリガナ</p>
                    <p css={td}>{displayGroup.node.representative_kana}</p>
                  </div>
                )}
                {displayGroup.node.representative_name && (
                  <div>
                    <p css={th}>氏名</p>
                    <p css={td}>{displayGroup.node.representative_name}</p>
                  </div>
                )}
                {displayGroup.node.representative_post && (
                  <div>
                    <p css={th}>役職</p>
                    <p css={td}>{displayGroup.node.representative_post}</p>
                  </div>
                )}
              </div>
              <table css={table} tw="lg:hidden">
                <tbody>
                  {displayGroup.node.representative_kana && (
                    <tr css={tr}>
                      <th css={th}>フリガナ</th>
                      <td css={td}>{displayGroup.node.representative_kana}</td>
                    </tr>
                  )}
                  {displayGroup.node.representative_name && (
                    <tr css={tr}>
                      <th css={th}>氏名</th>
                      <td css={td}>{displayGroup.node.representative_name}</td>
                    </tr>
                  )}
                  {displayGroup.node.representative_post && (
                    <tr css={tr}>
                      <th css={th}>役職</th>
                      <td css={td}>{displayGroup.node.representative_post}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {displayGroup.node.representative_name2 && (
                <div>
                  <div tw="hidden lg:block">
                    {displayGroup.node.representative_kana2 && (
                      <div>
                        <p css={th}>フリガナ</p>
                        <p css={td}>{displayGroup.node.representative_kana2}</p>
                      </div>
                    )}
                    <div>
                      <p css={th}>氏名</p>
                      <p css={td}>{displayGroup.node.representative_name2}</p>
                    </div>
                    {displayGroup.node.representative_post2 && (
                      <div>
                        <p css={th}>役職</p>
                        <p css={td}>{displayGroup.node.representative_post2}</p>
                      </div>
                    )}
                  </div>
                  <table css={table} tw="mt-2.5 lg:hidden">
                    <tbody>
                      {displayGroup.node.representative_kana2 && (
                        <tr css={tr}>
                          <th css={th}>フリガナ</th>
                          <td css={td}>
                            {displayGroup.node.representative_kana2}
                          </td>
                        </tr>
                      )}
                      <tr css={tr}>
                        <th css={th}>氏名</th>
                        <td css={td}>
                          {displayGroup.node.representative_name2}
                        </td>
                      </tr>
                      {displayGroup.node.representative_post2 && (
                        <tr css={tr}>
                          <th css={th}>役職</th>
                          <td css={td}>
                            {displayGroup.node.representative_post2}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </DetailItemWrapper>
          </div>
          <div id="thirdItem">
            <DetailItemWrapper itemName="役員">
              {displayGroup.node.number_of_officers ? (
                <div tw="hidden lg:block">
                  <div>
                    <p css={th1}>役員数</p>
                    <p css={td}>{displayGroup.node.number_of_officers}名</p>
                  </div>
                  <div>
                    <p css={th2Sub}></p>
                    <p css={th2}>理事・取締役数</p>
                    <p css={td}>{displayGroup.node.people_director}名</p>
                  </div>
                  <div>
                    <p css={th2}>評議員数</p>
                    <p css={td}>{displayGroup.node.councilor}名</p>
                  </div>
                  <div>
                    <p css={th2}>監事/監査役・会計参与数</p>
                    <p css={td}>{displayGroup.node.auditor_people}名</p>
                  </div>
                </div>
              ) : (
                <div />
              )}
              {displayGroup.node.number_of_officers ? (
                <table css={table} tw="lg:hidden">
                  <tbody>
                    <tr css={tr}>
                      <th css={th1} colSpan={2}>
                        役員数
                      </th>
                      <td css={td}>{displayGroup.node.number_of_officers}名</td>
                    </tr>

                    <tr css={tr}>
                      <th css={th2Sub} rowSpan={3}></th>
                      <th css={th2}>理事・取締役数</th>
                      <td css={td}>{displayGroup.node.people_director}名</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th2}>評議員数</th>
                      <td css={td}>{displayGroup.node.councilor}名</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th2}>監事/監査役・会計参与数</th>
                      <td css={td}>{displayGroup.node.auditor_people}名</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div />
              )}
            </DetailItemWrapper>
          </div>
          <div id="fourthItem">
            <DetailItemWrapper itemName="職員・従業員">
              {displayGroup.node.number_of_employees ? (
                <div tw="hidden lg:block">
                  <div>
                    <p css={th1}>職員・従業員数</p>
                    <p css={td}>{displayGroup.node.number_of_employees}名</p>
                  </div>
                  <div>
                    <p css={th3}>常勤職員・従業員数</p>
                    <p css={td}>{displayGroup.node.fulltime_employees}名</p>
                  </div>
                  <div tw="flex w-full">
                    <div tw="flex w-full">
                      <p css={th3} tw="w-[40%] py-2">
                        有給数
                      </p>
                      <p css={td}>{displayGroup.node.fulltime_paid}名</p>
                    </div>
                    <div tw="flex w-full">
                      <p css={th3} tw="w-[40%] py-2">
                        無給数
                      </p>
                      <p css={td}>{displayGroup.node.fulltime_unpaid}名</p>
                    </div>
                  </div>
                  <div>
                    <p css={th3}>非常勤職員・従業員数</p>
                    <p css={td}>{displayGroup.node.parttime_employees}名</p>
                  </div>
                  <div tw="flex w-full">
                    <div tw="flex w-full">
                      <p css={th3} tw="w-[40%] py-2">
                        有給数
                      </p>
                      <p css={td}>{displayGroup.node.parttime_paid}名</p>
                    </div>
                    <div tw="flex w-full">
                      <p css={th3} tw="w-[40%] py-2">
                        無給数
                      </p>
                      <p css={td}>{displayGroup.node.parttime_unpaid}名</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div />
              )}
              {displayGroup.node.number_of_employees ? (
                <table css={table} tw="lg:hidden">
                  <tbody>
                    <tr css={tr}>
                      <th css={th1} colSpan={3}>
                        職員・従業員数
                      </th>
                      <td css={td}>
                        {displayGroup.node.number_of_employees}名
                      </td>
                    </tr>
                    <tr css={tr}>
                      <th css={th2Sub} rowSpan={6}></th>
                      <th css={th3} colSpan={2}>
                        常勤職員・従業員数
                      </th>
                      <td css={td}>{displayGroup.node.fulltime_employees}名</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th3Sub} rowSpan={2}></th>
                      <th css={th3}>有給数</th>
                      <td css={td}>{displayGroup.node.fulltime_paid}名</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th3}>無給数</th>
                      <td css={td}>{displayGroup.node.fulltime_unpaid}名</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th3} colSpan={2}>
                        非常勤職員・従業員数
                      </th>
                      <td css={td}>{displayGroup.node.parttime_employees}名</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th3Sub} rowSpan={2}></th>
                      <th css={th3}>有給数</th>
                      <td css={td}>{displayGroup.node.parttime_paid}名</td>
                    </tr>
                    <tr css={tr}>
                      <th css={th3}>無給数</th>
                      <td css={td}>{displayGroup.node.parttime_unpaid}名</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div />
              )}
            </DetailItemWrapper>
          </div>
          <div id="fifthItem">
            <DetailItemWrapper itemName="組織評価">
              <div tw="hidden lg:block">
                {displayGroup.node.organization_measure && (
                  <div>
                    <p css={thLong}>過去3年以内に組織評価を受けているか</p>
                    <p css={td}>
                      {displayGroup.node.organization_measure === "1"
                        ? "受けている"
                        : "受けていない"}
                    </p>
                  </div>
                )}
                {displayGroup.node.certification_body && (
                  <div>
                    <p css={thLong}>認証機関/認証制度名/認証年度</p>
                    <p css={td}>{displayGroup.node.certification_body}</p>
                  </div>
                )}
              </div>
              <table css={table} tw="lg:hidden">
                <tbody>
                  {displayGroup.node.organization_measure && (
                    <tr css={tr}>
                      <th css={thLong}>過去3年以内に組織評価を受けているか</th>
                      <td css={td}>
                        {displayGroup.node.organization_measure === "1"
                          ? "受けている"
                          : "受けていない"}
                      </td>
                    </tr>
                  )}
                  {displayGroup.node.certification_body && (
                    <tr css={tr}>
                      <th css={thLong}>認証機関/認証制度名/認証年度</th>
                      <td css={td}>{displayGroup.node.certification_body}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </DetailItemWrapper>
          </div>
          <div id="sixthItem">
            {teikanFile.length !== 0 && (
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
            )}
          </div>
          <div id="seventhItem">
            {regulationFile.length !== 0 && (
              <DetailItemWrapper itemName="諸規程">
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
            )}
          </div>
        </div>
      </DetailWrapper>
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
    strapiBizPlan(business_cd: { eq: $slug }) {
      business_org_type
      executive_grp_cd
      fund_distr_grp_cd
      business_type_name
    }
    strapiBizPlanManualFDO: strapiBizPlanManual(
      biz_cd_fund_distr: { eq: $slug }
      business_org_type: { eq: "F" }
    ) {
      business_org_type
      executive_grp_cd
      fund_distr_grp_cd
      business_type_name {
        label
      }
    }
    strapiBizPlanManualADO: strapiBizPlanManual(
      biz_cd_executive: { eq: $slug }
      business_org_type: { eq: "A" }
    ) {
      business_org_type
      executive_grp_cd
      fund_distr_grp_cd
      business_type_name {
        label
      }
    }
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
      filter: {
        biz_cd_fund_distr: { eq: $slug }
        business_org_type: { eq: "F" }
      }
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
      filter: {
        biz_cd_executive: { eq: $slug }
        business_org_type: { eq: "A" }
      }
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
          insert_id
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
          updatedAt(formatString: "YYYY/MM/DD")
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
          foundation_date
          legal_personality_d
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
