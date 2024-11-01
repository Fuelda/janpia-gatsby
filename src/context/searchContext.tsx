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

  orgTypeSelections: { code: string; activitySupport: boolean }[];
  btnYear: string[];
  btnCategory: string[];
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
  region1: boolean;
  region2: boolean;
  region3: boolean;
  sdgs_goal: string[];
  allFieldCheck: boolean;

  withAlgoliaQuery: boolean;
};
type searchSetStateType = {
  setOrganizationName: Dispatch<string>;
  setOrganizationTypeCd: Dispatch<string[]>;
  setPrefectures: Dispatch<string[]>;
  setLegalPersonality: Dispatch<number[]>;

  setOrgTypeSelections: Dispatch<{ code: string; activitySupport: boolean }[]>;
  setBtnYear: Dispatch<string[]>;
  setBtnCategory: Dispatch<string[]>;
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
  setRegion1: Dispatch<boolean>;
  setRegion2: Dispatch<boolean>;
  setRegion3: Dispatch<boolean>;
  setSdgsGoal: Dispatch<string[]>;
  setAllFieldCheck: Dispatch<boolean>;

  setWithAlgoliaQuery: Dispatch<boolean>;
};
type searchType = {
  searchState: searchStateType;
  searchSetState: searchSetStateType;
  resetSearchStatus: () => void;
};

const SearchContext = createContext<searchType>({
  searchState: {
    organization_name: "",
    organization_type_cd: [],
    prefectures: [],
    legal_personality: [],

    orgTypeSelections: [],
    btnYear: [],
    btnCategory: [],
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
    region1: false,
    region2: false,
    region3: false,
    sdgs_goal: [],
    allFieldCheck: false,

    withAlgoliaQuery: false,
  },

  searchSetState: {
    setOrganizationName: () => {},
    setOrganizationTypeCd: () => {},
    setPrefectures: () => {},
    setLegalPersonality: () => {},

    setOrgTypeSelections: () => {},
    setBtnYear: () => {},
    setBtnCategory: () => {},
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
    setRegion1: () => {},
    setRegion2: () => {},
    setRegion3: () => {},
    setSdgsGoal: () => {},
    setAllFieldCheck: () => {},

    setWithAlgoliaQuery: () => {},
  },
  resetSearchStatus: () => {},
});

const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [organization_name, setOrganizationName] = useState("");
  const [organization_type_cd, setOrganizationTypeCd] = useState<string[]>([]);
  const [prefectures, setPrefectures] = useState<string[]>([]);
  const [legal_personality, setLegalPersonality] = useState<number[]>([]);
  const [orgTypeSelections, setOrgTypeSelections] = useState<
    { code: string; activitySupport: boolean }[]
  >([]);
  const [btnYear, setBtnYear] = useState<string[]>([]);
  const [btnCategory, setBtnCategory] = useState<string[]>([]);
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
  const [region1, setRegion1] = useState(false);
  const [region2, setRegion2] = useState(false);
  const [region3, setRegion3] = useState(false);
  const [sdgs_goal, setSdgsGoal] = useState<string[]>([]);
  const [allFieldCheck, setAllFieldCheck] = useState(false);
  const [withAlgoliaQuery, setWithAlgoliaQuery] = useState(false);

  const resetSearchStatus = () => {
    setOrganizationName("");
    setOrganizationTypeCd([]);
    setPrefectures([]);
    setLegalPersonality([]);

    setOrgTypeSelections([]);
    setBtnYear([]);
    setBtnCategory([]);
    setBusinessCategory([]);
    setBusinessStatus(null);
    setTargetArea([]);
    setSubsidyAmount([]);
    setTopicKeywords([]);

    setField1_1(false);
    setField1_2(false);
    setField1_3(false);
    setField2_4(false);
    setField2_5(false);
    setField2_6(false);
    setField3_7(false);
    setField3_8(false);
    setRegion1(false);
    setRegion2(false);
    setRegion3(false);
    setSdgsGoal([]);
    setAllFieldCheck(false);

    setWithAlgoliaQuery(false);
  };

  const value = {
    searchState: {
      organization_name,
      organization_type_cd,
      prefectures,
      legal_personality,

      orgTypeSelections,
      btnYear,
      btnCategory,
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
      region1,
      region2,
      region3,
      sdgs_goal,
      allFieldCheck,

      withAlgoliaQuery,
    },

    searchSetState: {
      setOrganizationName,
      setOrganizationTypeCd,
      setPrefectures,
      setLegalPersonality,

      setOrgTypeSelections,
      setBtnYear,
      setBtnCategory,
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
      setRegion1,
      setRegion2,
      setRegion3,
      setSdgsGoal,
      setAllFieldCheck,

      setWithAlgoliaQuery,
    },

    resetSearchStatus: resetSearchStatus,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export function useSearchContext() {
  return useContext(SearchContext);
}

export default SearchProvider;
