import React, { useEffect, useState } from "react";
import { socialIssueArray } from "../../../store/filterContents";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useSearchContext } from "../../../../../context/searchContext";
import "twin.macro";
import { checkBox, checkBoxList } from "../../../../../styles/form";
import { h3, hCenter } from "../../../../../styles/base";
import tw from "twin.macro";

const SocialIssue = () => {
  const { searchState, searchSetState } = useSearchContext();
  const [isRegion1Checked, setIsRegion1Checked] = useState(false);
  const [isRegion2Checked, setIsRegion2Checked] = useState(false);
  const [isRegion3Checked, setIsRegion3Checked] = useState(false);
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
  const {
    setField1_1,
    setField1_2,
    setField1_3,
    setField2_4,
    setField2_5,
    setField2_6,
    setField3_7,
    setField3_8,
  } = searchSetState;
  const checkboxArray = socialIssueArray;

  const addFieldIssue = (code: string) => {
    if (code === "region1") {
      setIsRegion1Checked(!isRegion1Checked);
    } else if (code === "region2") {
      setIsRegion2Checked(!isRegion2Checked);
    } else if (code === "region3") {
      setIsRegion3Checked(!isRegion3Checked);
    }
  };

  useEffect(() => {
    setField1_1(isRegion1Checked);
    setField1_2(isRegion1Checked);
    setField1_3(isRegion1Checked);
    setField2_4(isRegion2Checked);
    setField2_5(isRegion2Checked);
    setField2_6(isRegion2Checked);
    setField3_7(isRegion3Checked);
    setField3_8(isRegion3Checked);
  }, [isRegion1Checked, isRegion2Checked, isRegion3Checked]);
  useEffect(() => {
    field1_1 && field1_2 && field1_3
      ? setIsRegion1Checked(true)
      : setIsRegion1Checked(false);
    field2_4 && field2_5 && field2_6
      ? setIsRegion2Checked(true)
      : setIsRegion2Checked(false);
    field3_7 && field3_8
      ? setIsRegion3Checked(true)
      : setIsRegion3Checked(false);
  }, [
    field1_1,
    field1_2,
    field1_3,
    field2_4,
    field2_5,
    field2_6,
    field3_7,
    field3_8,
  ]);

  const handleCheckbox = (code: string) => {
    code === "field1_1" && setField1_1(!field1_1);
    code === "field1_2" && setField1_2(!field1_2);
    code === "field1_3" && setField1_3(!field1_3);
    code === "field2_4" && setField2_4(!field2_4);
    code === "field2_5" && setField2_5(!field2_5);
    code === "field2_6" && setField2_6(!field2_6);
    code === "field3_7" && setField3_7(!field3_7);
    code === "field3_8" && setField3_8(!field3_8);
  };

  const isChecked = (code: string) => {
    switch (code) {
      case "field1_1":
        return field1_1;
      case "field1_2":
        return field1_2;
      case "field1_3":
        return field1_3;
      case "field2_4":
        return field2_4;
      case "field2_5":
        return field2_5;
      case "field2_6":
        return field2_6;
      case "field3_7":
        return field3_7;
      case "field3_8":
        return field3_8;
      case "region1":
        return isRegion1Checked;
      case "region2":
        return isRegion2Checked;
      case "region3":
        return isRegion3Checked;
      default:
        return;
    }
  };

  return (
    <div>
      <h3 css={h3}>社会課題</h3>
      <div tw="flex flex-col gap-2.5 px-3.5 py-2.5">
        {checkboxArray.map((checkbox) => (
          <div
            key={checkbox.code}
            css={checkbox.code.includes("field") ? tw`ml-[30px]` : tw`mt-[5px]`}
          >
            <div css={hCenter} tw="gap-2">
              <Checkbox.Root
                id={checkbox.code}
                onCheckedChange={() =>
                  checkbox.code.includes("field")
                    ? handleCheckbox(checkbox.code)
                    : addFieldIssue(checkbox.code)
                }
                css={checkBox}
                checked={isChecked(checkbox.code)}
              >
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor={checkbox.code}>{checkbox.label}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialIssue;
