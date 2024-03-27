import React, { useEffect, useRef, useState } from "react";
import { socialIssueArray } from "../../../store/filterContents";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useSearchContext } from "../../../../../context/searchContext";
import "twin.macro";
import { checkBox, checkBoxList, checkMark } from "../../../../../styles/form";
import { h3, hCenter } from "../../../../../styles/base";
import tw from "twin.macro";

const SocialIssue = () => {
  const { searchState, searchSetState } = useSearchContext();
  const isFirstRegionRender = useRef(true);
  const isFirstAllFieldRender = useRef(true);

  const {
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
    allFieldCheck,
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
    setRegion1,
    setRegion2,
    setRegion3,
    setAllFieldCheck,
  } = searchSetState;
  const checkboxArray = socialIssueArray;

  const handleCheckbox = (code: string) => {
    code === "field1_1" && setField1_1(!field1_1);
    code === "field1_2" && setField1_2(!field1_2);
    code === "field1_3" && setField1_3(!field1_3);
    code === "field2_4" && setField2_4(!field2_4);
    code === "field2_5" && setField2_5(!field2_5);
    code === "field2_6" && setField2_6(!field2_6);
    code === "field3_7" && setField3_7(!field3_7);
    code === "field3_8" && setField3_8(!field3_8);
    code === "region1" && setRegion1(!region1);
    code === "region2" && setRegion2(!region2);
    code === "region3" && setRegion3(!region3);
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
        return region1;
      case "region2":
        return region2;
      case "region3":
        return region3;
      default:
        return;
    }
  };

  useEffect(() => {
    if (isFirstRegionRender.current) {
      isFirstRegionRender.current = false;
      return;
    }

    setField1_1(region1);
    setField1_2(region1);
    setField1_3(region1);
    setField2_4(region2);
    setField2_5(region2);
    setField2_6(region2);
    setField3_7(region3);
    setField3_8(region3);
  }, [region1, region2, region3]);

  useEffect(() => {
    if (isFirstAllFieldRender.current) {
      isFirstAllFieldRender.current = false;
      return;
    }

    setField1_1(allFieldCheck);
    setField1_2(allFieldCheck);
    setField1_3(allFieldCheck);
    setField2_4(allFieldCheck);
    setField2_5(allFieldCheck);
    setField2_6(allFieldCheck);
    setField3_7(allFieldCheck);
    setField3_8(allFieldCheck);
  }, [allFieldCheck]);

  useEffect(() => {
    setRegion1(field1_1 && field1_2 && field1_3);
    setRegion2(field2_4 && field2_5 && field2_6);
    setRegion3(field3_7 && field3_8);
    // setAllFieldCheck(
    //   field1_1 &&
    //     field1_2 &&
    //     field1_3 &&
    //     field2_4 &&
    //     field2_5 &&
    //     field2_6 &&
    //     field3_7 &&
    //     field3_8
    // );
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

  return (
    <div>
      <h3 css={h3}>社会課題</h3>
      <div tw="flex flex-col gap-2.5 px-3.5 py-2.5">
        <div tw="mt-[5px]">
          <div css={hCenter} tw="gap-2">
            <Checkbox.Root
              id="allIssue"
              onCheckedChange={() => setAllFieldCheck(!allFieldCheck)}
              css={checkBox}
              checked={allFieldCheck}
            >
              <Checkbox.Indicator tw="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.003"
                  height="11.252"
                  viewBox="0 0 15.003 11.252"
                  css={checkMark}
                >
                  <path
                    id="check"
                    d="M300.625,135.16l-1.876-1.876h0L295,129.533l1.875-1.875,3.751,3.751,7.5-7.5L310,125.783Z"
                    transform="translate(-294.999 -123.908)"
                  />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor="allIssue">すべてにチェック</label>
          </div>
        </div>
        {checkboxArray.map((checkbox) => (
          <div
            key={checkbox.code}
            css={checkbox.code.includes("field") ? tw`ml-[30px]` : tw`mt-[5px]`}
          >
            <div css={hCenter} tw="gap-2">
              <Checkbox.Root
                id={checkbox.code}
                onCheckedChange={() => handleCheckbox(checkbox.code)}
                css={checkBox}
                checked={isChecked(checkbox.code)}
              >
                <Checkbox.Indicator tw="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.003"
                    height="11.252"
                    viewBox="0 0 15.003 11.252"
                    css={checkMark}
                  >
                    <path
                      id="check"
                      d="M300.625,135.16l-1.876-1.876h0L295,129.533l1.875-1.875,3.751,3.751,7.5-7.5L310,125.783Z"
                      transform="translate(-294.999 -123.908)"
                    />
                  </svg>
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
