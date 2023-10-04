import { useAlgoliaStrapiContext } from "../../../context/algoliaStrapiContext";
import { useSearchContext } from "../../../context/searchContext";
import { linkCollectionTypesManual } from "../../../util/linkCollectionTypesManual";

export const filterStrapiManualData = () => {
  const { searchState } = useSearchContext();
  const { withQuery, algoliaHits } = useAlgoliaStrapiContext();
  const linkedBizPlanManual = linkCollectionTypesManual();

  const {
    field1_1,
    field1_2,
    field1_3,
    field2_4,
    field2_5,
    field2_6,
    field3_7,
    field3_8,
  } = searchState;
  const isNotSocialIssueSelected =
    !field1_1 &&
    !field1_2 &&
    !field1_3 &&
    !field2_4 &&
    !field2_5 &&
    !field2_6 &&
    !field3_7 &&
    !field3_8;

  const algoliaFilteredBizPlan = linkedBizPlanManual.filter((item) => {
    const isBizPlanMatch = algoliaHits.some((hit) => {
      return hit.type === "business" && hit.code === item.bizPlan.business_cd;
    });
    const isGroupMatch = algoliaHits.some((hit) => {
      return (
        (hit.type === "organization" &&
          item.group.some((g) => g.organization_cd === hit.code)) ||
        item.mainGroup?.node.organization_cd === hit.code
      );
    });

    return isBizPlanMatch || isGroupMatch;
  });

  const sourceBizPlan = withQuery
    ? algoliaFilteredBizPlan
    : linkedBizPlanManual;

  const filteredBizPlanManual = sourceBizPlan.filter((item) => {
    return (
      //団体名
      (searchState.organization_name === "" ||
        item.group.some((g) =>
          g.groupData?.organization_name?.includes(
            searchState.organization_name
          )
        ) ||
        item.mainGroup?.node.organization_name?.includes(
          searchState.organization_name
        )) &&
      //団体種別
      (searchState.organization_type_cd.length === 0 ||
        item.group.some(
          (g) =>
            g.groupData?.organization_type_cd &&
            searchState.organization_type_cd.includes(
              g.groupData?.organization_type_cd
            )
        ) ||
        (item.mainGroup?.node.organization_type_cd &&
          searchState.organization_type_cd.includes(
            item.mainGroup.node.organization_type_cd
          ))) &&
      //団体所在地
      (searchState.prefectures.length === 0 ||
        item.group.some(
          (g) =>
            g.groupData?.prefectures &&
            searchState.prefectures.includes(g.groupData?.prefectures)
        ) ||
        (item.mainGroup?.node.prefectures &&
          searchState.prefectures.includes(
            item.mainGroup?.node.prefectures
          ))) &&
      //法人格
      (searchState.legal_personality.length === 0 ||
        item.group.some(
          (g) =>
            g.groupData?.legal_personality &&
            searchState.legal_personality.includes(
              parseInt(g.groupData?.legal_personality)
            )
        ) ||
        (item.mainGroup?.node.legal_personality &&
          searchState.legal_personality.includes(
            parseInt(item.mainGroup?.node.legal_personality)
          ))) &&
      //事業種別
      (searchState.business_org_type.length === 0 ||
        (item.bizPlan.business_org_type &&
          searchState.business_org_type.includes(
            item.bizPlan.business_org_type
          ))) &&
      //事業年度/事業枠
      // (searchState.business_type_name === "" ||
      //   (item.bizPlan.business_type_name &&
      //     item.bizPlan.business_type_name.label ===
      //       searchState.business_type_name)) &&
      //事業年度
      (searchState.btnYear === "" ||
        (item.bizPlan.business_type_name &&
          item.bizPlan.business_type_name.label?.includes(
            searchState.btnYear
          ))) &&
      //事業枠
      (searchState.btnCategory === "" ||
        (item.bizPlan.business_type_name &&
          item.bizPlan.business_type_name.label?.includes(
            searchState.btnCategory
          ))) &&
      //事業分類
      (searchState.business_category.length === 0 ||
        searchState.business_category.some(
          (bc) =>
            item.bizPlan.business_category &&
            bc.code === item.bizPlan.business_category.code &&
            bc.subCode === item.bizPlan.business_category.subCode
        )) &&
      //事業ステータス
      (searchState.business_status === null ||
        (searchState.business_status === 0 && !item.bizPlan.business_status) ||
        (searchState.business_status === 1 && item.bizPlan.business_status)) &&
      //事業対象地域
      (searchState.target_area.length === 0 ||
        (item.bizPlan.target_area &&
          searchState.target_area.includes(item.bizPlan.target_area))) &&
      //助成額
      (searchState.subsidy_amount.length === 0 ||
        (item.bizPlan.subsidy_amount &&
          searchState.subsidy_amount.some(
            (sa) =>
              item.bizPlan.subsidy_amount?.amount &&
              parseInt(item.bizPlan.subsidy_amount.amount) > sa.min &&
              parseInt(item.bizPlan.subsidy_amount.amount) <= sa.max
          ))) &&
      //話題のキーワード
      (searchState.topic_keywords.length === 0 ||
        searchState.topic_keywords.every((tk) =>
          item.bizPlan.topic_keywords?.some((btk) => btk?.label === tk)
        )) &&
      //社会課題
      (isNotSocialIssueSelected ||
        ((field1_1 ? item.bizPlan.field1_1 : true) &&
          (field1_2 ? item.bizPlan.field1_2 : true) &&
          (field1_3 ? item.bizPlan.field1_3 : true) &&
          (field2_4 ? item.bizPlan.field2_4 : true) &&
          (field2_5 ? item.bizPlan.field2_5 : true) &&
          (field2_6 ? item.bizPlan.field2_6 : true) &&
          (field3_7 ? item.bizPlan.field3_7 : true) &&
          (field3_8 ? item.bizPlan.field3_8 : true))) &&
      //SDGs
      (searchState.sdgs_goal.length === 0 ||
        searchState.sdgs_goal.every(
          (sg) =>
            item.bizPlan.sdgs_goals &&
            item.bizPlan.sdgs_goals.some((bsg) => bsg?.value === sg)
        ))
    );
  });

  return filteredBizPlanManual;
};
