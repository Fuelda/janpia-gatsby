export const isActivitySupportGroup = (business_type_name: string): boolean => {
  console.log(business_type_name);
  return business_type_name.includes("活動支援");
};

export const convertBusinessTypeNameLabel = (label: string) => {
  if (label.includes("コロナ枠")) {
    return label.replace("コロナ枠", "緊急支援枠"); // コロナ枠は緊急支援枠に変換
  } else if (label.includes("緊急枠")) {
    return label.replace("緊急枠", "緊急支援枠"); // 緊急枠は緊急支援枠に変換
  } else {
    return label;
  }
};
