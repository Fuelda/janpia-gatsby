// 活動支援枠か否かを判断。
export const isActivitySupportGroup = (business_type_name: string): boolean => {
  return business_type_name.includes("活動支援");
};

// 緊急支援枠か否かを判断。
export const isEmergencySupportGroup = (
  business_type_name: string
): boolean => {
  return convertBusinessTypeNameLabel(business_type_name).includes(
    "緊急支援枠"
  );
};

// 緊急支援枠のラベルに集約する。
export const convertBusinessTypeNameLabel = (label: string) => {
  if (label.includes("コロナ枠")) {
    return label.replace("コロナ枠", "緊急支援枠"); // コロナ枠は緊急支援枠に変換
  } else if (label.includes("緊急枠")) {
    return label.replace("緊急枠", "緊急支援枠"); // 緊急枠は緊急支援枠に変換
  } else {
    return label;
  }
};

// 例えば事業年度が2024年度"以降"のデータだけに適用する場合に、この関数を用いる。
export const isSpecificBusinessTypeNameYear = (
  business_type_name: string,
  year: number
) => {
  const splitBusinessTypeName = business_type_name.match(/(\d+年度)(.+)/);
  return (
    splitBusinessTypeName &&
    Number(splitBusinessTypeName[1].slice(0, 4)) >= year
  );
};

// 例えば事業年度が"ちょうど"2024年度かつ通常枠のデータだけに適用する場合に、この関数を用いる。
export const isSpecificBusinessTypeNameYearAndName = (
  business_type_name: string,
  year: number,
  name: string
) => {
  const splitBusinessTypeName = business_type_name.match(/(\d+年度)(.+)/);

  return (
    splitBusinessTypeName &&
    Number(splitBusinessTypeName[1].slice(0, 4)) == year &&
    splitBusinessTypeName[2].includes(name)
  );
};
