import { linkCollectionTypes } from "../util/linkCollectionTypes";
import { linkCollectionTypesManual } from "../util/linkCollectionTypesManual";

export type BusinessCategory =
  | {
      code: number | null;
      subCode: number | null;
    }
  | {
      readonly code: number | null;
      readonly subCode: number | null;
    };

export type MainGroup =
  | {
      readonly node: {
        readonly organization_cd: string | null;
        readonly legal_personality: string | null;
        readonly organization_type_cd: string | null;
        readonly organization_name: string | null;
        readonly prefectures: string | null;
        readonly insert_id: string | null;
      };
    }
  | undefined;

export type BasicInfo = {
  business_type_name: string | null;
  business_name: string | null;
  business_org_type: string | null;
  business_status: string | null;
  business_category: BusinessCategory | null;
  support_category: string | null;
  mainGroup: MainGroup | null;
};

export const useBasicInfo = (business_cd: string): BasicInfo => {
  const linkedBizPlan = linkCollectionTypes();
  const linkedBizPlanManual = linkCollectionTypesManual();
  const linkedAllBizPlan = [...linkedBizPlan, ...linkedBizPlanManual];

  const headerBizPlan = linkedAllBizPlan.find(
    (item) => item.bizPlan.business_cd === business_cd
  );

  const bizPlan = headerBizPlan?.bizPlan;
  const business_type_name =
    typeof bizPlan?.business_type_name === "string"
      ? bizPlan.business_type_name
      : bizPlan?.business_type_name?.label || null;
  const business_name = bizPlan?.business_name;
  const business_org_type = bizPlan?.business_org_type;
  const business_status = bizPlan?.business_status;
  const business_category = bizPlan?.business_category;
  const support_category =
    bizPlan && "support_category" in bizPlan ? bizPlan?.support_category : null;
  const mainGroup = headerBizPlan?.mainGroup;

  const businessStatusText =
    (typeof business_status === "number" && business_status === 0) ||
    (typeof business_status === "boolean" && business_status)
      ? "実施中"
      : "終了";

  return {
    business_type_name: business_type_name,
    business_name: business_name || null,
    business_org_type: business_org_type || null,
    business_status: businessStatusText,
    business_category: business_category || null,
    support_category: support_category || null,
    mainGroup: mainGroup || null,
  };
};
