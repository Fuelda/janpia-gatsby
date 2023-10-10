import { useEffect } from "react";
import { useAlgoliaStrapiContext } from "../../../context/algoliaStrapiContext";
import { useSearchContext } from "../../../context/searchContext";
import { linkCollectionTypes } from "../../../util/linkCollectionTypes";

export const filterStrapiData = () => {
  const { searchState } = useSearchContext();
  const { algoliaHits } = useAlgoliaStrapiContext();
  const linkedBizPlan = linkCollectionTypes();
  const { withAlgoliaQuery } = searchState;

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

  const algoliaFilteredBizPlan = linkedBizPlan.filter((item) => {
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
    const isAttachedFileMatch = algoliaHits.some((hit) => {
      return (
        hit.type === "attachedFile" &&
        (item.group.some((g) => g.groupData?.insert_id === hit.code) ||
          item.mainGroup?.node.insert_id === hit.code ||
          hit.code === item.evaluationPlan?.insert_id)
      );
    });
    return isBizPlanMatch || isGroupMatch || isAttachedFileMatch;
  });

  const sourceBizPlan = withAlgoliaQuery
    ? algoliaFilteredBizPlan
    : linkedBizPlan;

  const filteredBizPlan = sourceBizPlan.filter((item) => {
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
            item.mainGroup?.node.organization_type_cd
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
      //事業年度
      (searchState.btnYear.length === 0 ||
        searchState.btnYear.some(
          (btny) =>
            item.bizPlan.business_type_name &&
            item.bizPlan.business_type_name?.includes(btny)
        )) &&
      //事業枠
      (searchState.btnCategory.length === 0 ||
        searchState.btnCategory.some(
          (btnc) =>
            item.bizPlan.business_type_name &&
            item.bizPlan.business_type_name?.includes(btnc)
        )) &&
      //事業分類
      (searchState.business_category.length === 0 ||
        searchState.business_category.some(
          (bc) =>
            item.bizPlan.business_category.code &&
            (item.bizPlan.business_category.subCode
              ? bc.code === item.bizPlan.business_category.code &&
                bc.subCode === item.bizPlan.business_category.subCode
              : bc.code === item.bizPlan.business_category.code)
        )) &&
      //事業ステータス
      (searchState.business_status === null ||
        item.bizPlan.business_status === searchState.business_status) &&
      //事業対象地域
      (searchState.target_area.length === 0 ||
        (item.bizPlan.target_area &&
          searchState.target_area.includes(item.bizPlan.target_area))) &&
      //助成額
      (searchState.subsidy_amount.length === 0 ||
        (item.financePlan &&
          searchState.subsidy_amount.some(
            (sa) =>
              (item.financePlan?.sum_subidy ?? 0) > sa.min &&
              (item.financePlan?.sum_subidy ?? 0) <= sa.max
          )) ||
        (item.financePlanFormer &&
          searchState.subsidy_amount.some(
            (sa) =>
              parseInt(item.financePlanFormer?.abc_ttl ?? "") > sa.min &&
              parseInt(item.financePlanFormer?.abc_ttl ?? "") <= sa.max
          ))) &&
      //話題のキーワード
      (searchState.topic_keywords.length === 0 || false) &&
      //社会課題
      (isNotSocialIssueSelected ||
        (field1_1 && item.bizPlan.field1_1 === "1") ||
        (field1_2 && item.bizPlan.field1_2 === "1") ||
        (field1_3 && item.bizPlan.field1_3 === "1") ||
        (field2_4 && item.bizPlan.field2_4 === "1") ||
        (field2_5 && item.bizPlan.field2_5 === "1") ||
        (field2_6 && item.bizPlan.field2_6 === "1") ||
        (field3_7 && item.bizPlan.field3_7 === "1") ||
        (field3_8 && item.bizPlan.field3_8 === "1")) &&
      //SDGs
      (searchState.sdgs_goal.length === 0 ||
        searchState.sdgs_goal.every((sg) =>
          item.bizPlanSub.some((bpz) => bpz.sdgs_goal === sg)
        ))
    );
  });

  return filteredBizPlan;
};
