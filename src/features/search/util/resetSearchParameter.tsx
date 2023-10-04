import React from "react";
import { useSearchContext } from "../../../context/searchContext";
import { useAlgoliaStrapiContext } from "../../../context/algoliaStrapiContext";

const resetSearchParameter = () => {
  const { searchSetState } = useSearchContext();
  const { setWithQuery } = useAlgoliaStrapiContext();
  const {
    setOrganizationName,
    setOrganizationTypeCd,
    setPrefectures,
    setLegalPersonality,

    setBusinessOrgType,
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
    setSdgsGoal,
  } = searchSetState;

  const resetSearchStatus = () => {
    setOrganizationName("");
    setOrganizationTypeCd([]);
    setPrefectures([]);
    setLegalPersonality([]);

    setBusinessOrgType([]);
    setBtnYear([]), setBtnCategory([]), setBusinessCategory([]);
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
    setSdgsGoal([]);

    setWithQuery(false);
  };
  return { resetSearchStatus };
};

export default resetSearchParameter;
