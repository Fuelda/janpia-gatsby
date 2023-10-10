import { useSearchContext } from "../../../context/searchContext";

export const OrganizationTypeCdArray = [
  { code: "F", label: "資金分配団体" },
  { code: "A", label: "実行団体" },
];

export const prefecturesArray = {
  hokkaido: ["北海道"],
  tohoku: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  kanto: [
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "山梨県",
  ],
  hokuriku: ["新潟県", "富山県", "石川県", "福井県"],
  tokai: ["長野県", "岐阜県", "静岡県", "愛知県", "三重県"],
  kinki: ["滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
  chugoku: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
  shikoku: ["徳島県", "香川県", "愛媛県", "高知県"],
  kyushu: [
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
  ],
  okinawa: ["沖縄県"],
};

export const legalPersonalityArray = [
  { code: 1, label: "NPO" },
  { code: 12, label: "株式会社" },
  { code: 3, label: "社団法人" },
  { code: 4, label: "財団法人" },
  { code: 20, label: "社会福祉法人" },
  { code: 14, label: "更生保護法人" },
  { code: 24, label: "任意団体" },
  { code: 99, label: "その他" },
  // { code: 2, label: "認定NPO法人" },
  // { code: 5, label: "労働金庫" },
  // { code: 6, label: "信用金庫" },
  // { code: 7, label: "公益社団法人" },
  // { code: 8, label: "公益財団法人" },
  // { code: 9, label: "医療法人" },
  // { code: 10, label: "合同会社" },
  // { code: 11, label: "合名会社" },
  // { code: 13, label: "宗教法人" },
  // { code: 15, label: "消費者生活協同組合" },
  // { code: 16, label: "独立行政法人" },
  // { code: 17, label: "地方独立行政法人" },
  // { code: 18, label: "協業組合" },
  // { code: 19, label: "相互会社" },
  // { code: 21, label: "認可地縁団体" },
  // { code: 22, label: "農業協同組合" },
  // { code: 23, label: "森林組合" },
];

export const businessCategoryArray = [
  { label: "草の根活動支援事業 (全国)", code: 1, subCode: 21 },
  { label: "草の根活動支援事業 (地域)", code: 1, subCode: 22 },
  {
    label: "ソーシャルビジネス支援事業",
    code: 2,
    subCode: -1,
  },
  { label: "イノベーション企画支援事業", code: 3, subCode: -2 },
  { label: "災害支援事業", code: 4, subCode: -3 },
];

export const businessStatusArray = [
  { code: 0, label: "実施中" },
  { code: 1, label: "終了" },
];

export const subsidyAmountArray = [
  { min: 0, max: 5000000, label: "~500万円" },
  { min: 5000000, max: 10000000, label: "~1,000万円" },
  { min: 10000000, max: 50000000, label: "~5,000万円" },
  { min: 50000000, max: 100000000, label: "~1億円" },
  { min: 100000000, max: 500000000, label: "~5億円" },
  { min: 500000000, max: 9999999999999999, label: "5億円以上" },
];

export const topicKeywordArray = [
  "子ども",
  "高齢者",
  "ひきこもり",
  "障がい者",
  "こども食堂",
  "居場所づくり",
  "地域活性化",
];

export const socialIssueArray = [
  {
    code: "region1",
    label: "子ども及び若者の支援に係る活動",
  },
  {
    code: "field1_1",
    label: "経済的困窮など、家庭内に課題を抱える子どもの支援",
  },
  {
    code: "field1_2",
    label: "日常生活や成長に困難を抱える子どもと若者の育成支援",
  },
  {
    code: "field1_3",
    label: "社会的課題の解決を担う若者の能力開発支援",
  },
  {
    code: "region2",
    label: "日常生活または社会生活を営む上での困難を有する者の支援に関する活動",
  },
  { code: "field2_4", label: "働くことが困難な人への支援" },
  { code: "field2_5", label: "孤独・孤立や社会的差別の解消に向けた支援" },
  { code: "field2_6", label: "女性の経済的自立への支援" },
  {
    code: "region3",
    label:
      "地域社会における活力の低下その他の社会的に困難な状況に直面している地域の支援に関する活動",
  },
  {
    code: "field3_7",
    label: "地域の働く場づくりや地域活性化などの課題解決に向けた取組の支援",
  },
  { code: "field3_8", label: "安心・安全に暮らせるコミュニティづくりへの支援" },
];

export const sdgsGoalArray = [
  { label: "1. 貧困をなくそう", code: "G01" },
  { label: "2. 飢餓をゼロに", code: "G02" },
  { label: "3. すべての人に健康と福祉を", code: "G03" },
  { label: "4. 質の高い教育をみんなに", code: "G04" },
  { label: "5. ジェンダー平等を実現しよう", code: "G05" },
  { label: "6. 安全な水とトイレを世界中に", code: "G06" },
  { label: "7. エネルギーをみんなに、そしてクリーンに", code: "G07" },
  { label: "8. 働きがいも経済成長も", code: "G08" },
  { label: "9. 産業、技術革新と基盤をつくろう", code: "G09" },
  { label: "10. 人や国の不平等をなくそう", code: "G10" },
  { label: "11. 住み続けられる街づくりを", code: "G11" },
  { label: "12. つくる生活、つかう生産を", code: "G12" },
  { label: "13. 気候変動に具体的な対策を", code: "G13" },
  { label: "14. 海の豊かさを守ろう", code: "G14" },
  { label: "15. 陸の豊かさも守ろう", code: "G15" },
  { label: "16. 平和と公正をすべての人に", code: "G16" },
  { label: "17. パートナーシップで目標を達成しよう", code: "G17" },
];

export const evaluationFactorArray = [
  { label: "なし", code: "CA-001" },
  { label: "課題の分析", code: "CA-002" },
  { label: "事業設計の分析", code: "CA-003" },
  { label: "実施状況の分析", code: "CA-004" },
  { label: "アウトカムの分析", code: "CA-005" },
];
export const evaluationRequiredArray = [
  { label: "なし", code: "1" },
  { label: "定量的データ", code: "2" },
  { label: "定性的データ", code: "3" },
  { label: "定量データ及び定性データ", code: "4" },
];
export const evaluationMethodArray = [
  { label: "なし", code: "1" },
  { label: "文献調査", code: "2" },
  { label: "アンケート調査", code: "3" },
  { label: "ワークショップ", code: "4" },
  { label: "関係者へのインタビュー", code: "5" },
  { label: "フォーカスグループディスカッション", code: "6" },
  { label: "ケーススタディ", code: "7" },
  { label: "直接観察", code: "8" },
  { label: "定量データの収集", code: "9" },
  { label: "その他", code: "10" },
];
export const evaluationSeasonArray = [
  { label: "なし", code: "0" },
  { label: "事前評価", code: "1" },
  { label: "中間評価", code: "2" },
  { label: "事後評価", code: "3" },
];
