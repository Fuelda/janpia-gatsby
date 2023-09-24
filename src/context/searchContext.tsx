import React, {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type businessCategoryType = {
  code: number;
  subCode: number;
};
type searchStateType = {
  organization_name: string;
  organization_type_cd: string[];
  prefectures: string[];
  legal_personality: number[];

  business_org_type: string[];
  business_type_name: string;
  business_category: businessCategoryType[] | [];
  business_status: number | null;
  target_area: string[];
  subsidy_amount: { min: number; max: number }[];
  topic_keywords: string[];

  field1_1: boolean;
  field1_2: boolean;
  field1_3: boolean;
  field2_4: boolean;
  field2_5: boolean;
  field2_6: boolean;
  field3_7: boolean;
  field3_8: boolean;
  sdgs_goal: string[];
};
type searchSetStateType = {
  setOrganizationName: Dispatch<string>;
  setOrganizationTypeCd: Dispatch<string[]>;
  setPrefectures: Dispatch<string[]>;
  setLegalPersonality: Dispatch<number[]>;

  setBusinessOrgType: Dispatch<string[]>;
  setBusinessTypeName: Dispatch<string>;
  setBusinessCategory: Dispatch<businessCategoryType[]>;
  setBusinessStatus: Dispatch<number | null>;
  setTargetArea: Dispatch<string[]>;
  setSubsidyAmount: React.Dispatch<
    React.SetStateAction<{ min: number; max: number }[]>
  >;
  setTopicKeywords: Dispatch<string[]>;

  setField1_1: Dispatch<boolean>;
  setField1_2: Dispatch<boolean>;
  setField1_3: Dispatch<boolean>;
  setField2_4: Dispatch<boolean>;
  setField2_5: Dispatch<boolean>;
  setField2_6: Dispatch<boolean>;
  setField3_7: Dispatch<boolean>;
  setField3_8: Dispatch<boolean>;
  setSdgsGoal: Dispatch<string[]>;
};
type searchType = {
  searchState: searchStateType;
  searchSetState: searchSetStateType;
};

const SearchContext = createContext<searchType>({
  searchState: {
    organization_name: "",
    organization_type_cd: [],
    prefectures: [],
    legal_personality: [],

    business_org_type: [],
    business_type_name: "",
    business_category: [],
    business_status: null,
    target_area: [],
    subsidy_amount: [],
    topic_keywords: [],

    field1_1: false,
    field1_2: false,
    field1_3: false,
    field2_4: false,
    field2_5: false,
    field2_6: false,
    field3_7: false,
    field3_8: false,
    sdgs_goal: [],
  },

  searchSetState: {
    setOrganizationName: () => {},
    setOrganizationTypeCd: () => {},
    setPrefectures: () => {},
    setLegalPersonality: () => {},

    setBusinessOrgType: () => {},
    setBusinessTypeName: () => {},
    setBusinessCategory: () => {},
    setBusinessStatus: () => {},
    setTargetArea: () => {},
    setSubsidyAmount: () => {},
    setTopicKeywords: () => {},

    setField1_1: () => {},
    setField1_2: () => {},
    setField1_3: () => {},
    setField2_4: () => {},
    setField2_5: () => {},
    setField2_6: () => {},
    setField3_7: () => {},
    setField3_8: () => {},
    setSdgsGoal: () => {},
  },
});

const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [organization_name, setOrganizationName] = useState("");
  const [organization_type_cd, setOrganizationTypeCd] = useState<string[]>([]);
  const [prefectures, setPrefectures] = useState<string[]>([]);
  const [legal_personality, setLegalPersonality] = useState<number[]>([]);
  const [business_org_type, setBusinessOrgType] = useState<string[]>([]);
  const [business_type_name, setBusinessTypeName] = useState("");
  const [business_category, setBusinessCategory] = useState<
    businessCategoryType[]
  >([]);
  const [business_status, setBusinessStatus] = useState<number | null>(null);
  const [target_area, setTargetArea] = useState<string[]>([]);
  const [subsidy_amount, setSubsidyAmount] = useState<
    { min: number; max: number }[]
  >([]);
  const [topic_keywords, setTopicKeywords] = useState<string[]>([]);
  const [field1_1, setField1_1] = useState(false);
  const [field1_2, setField1_2] = useState(false);
  const [field1_3, setField1_3] = useState(false);
  const [field2_4, setField2_4] = useState(false);
  const [field2_5, setField2_5] = useState(false);
  const [field2_6, setField2_6] = useState(false);
  const [field3_7, setField3_7] = useState(false);
  const [field3_8, setField3_8] = useState(false);
  const [sdgs_goal, setSdgsGoal] = useState<string[]>([]);

  const value = {
    searchState: {
      organization_name,
      organization_type_cd,
      prefectures,
      legal_personality,

      business_org_type,
      business_type_name,
      business_category,
      business_status,
      target_area,
      subsidy_amount,
      topic_keywords,

      field1_1,
      field1_2,
      field1_3,
      field2_4,
      field2_5,
      field2_6,
      field3_7,
      field3_8,
      sdgs_goal,
    },

    searchSetState: {
      setOrganizationName,
      setOrganizationTypeCd,
      setPrefectures,
      setLegalPersonality,

      setBusinessOrgType,
      setBusinessTypeName,
      setBusinessCategory,
      setBusinessStatus,
      setTargetArea,
      setSubsidyAmount,
      setTopicKeywords,

      setField1_1,
      setField1_2,
      setField1_3,
      setField2_4,
      setField2_5,
      setField2_6,
      setField3_7,
      setField3_8,
      setSdgsGoal,
    },
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export function useSearchContext() {
  return useContext(SearchContext);
}

export default SearchProvider;
