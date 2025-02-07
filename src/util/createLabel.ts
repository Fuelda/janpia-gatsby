import { isActivitySupportGroup } from "./businessTypeNameChecker";

export const createBusinessTypeNameLabel = ({
  business_type_name,
}: {
  business_type_name: string | { label: string | null };
}) => {
  if (typeof business_type_name === "string") {
    return business_type_name;
  } else if (
    typeof business_type_name === "object" &&
    business_type_name.label
  ) {
    return business_type_name.label;
  } else {
    return "";
  }
};

export const createGroupLabel = ({
  business_org_type,
  business_type_name,
}: {
  business_org_type: string;
  business_type_name: string;
}) => {
  switch (true) {
    case isActivitySupportGroup(business_type_name):
      return business_org_type === "F" ? "活動支援団体" : "支援対象団体";
    default:
      return business_org_type === "F" ? "資金分配団体" : "実行団体";
  }
};

export const createAnothetGroupLabel = ({
  business_org_type,
  business_type_name,
}: {
  business_org_type: string;
  business_type_name: string;
}) => {
  switch (true) {
    case isActivitySupportGroup(business_type_name):
      return business_org_type === "F" ? "支援対象団体" : "活動支援団体";
    default:
      return business_org_type === "F" ? "実行団体" : "資金分配団体";
  }
};
