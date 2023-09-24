import * as RadioGroup from "@radix-ui/react-radio-group";
import { CheckIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { useStrapiContext } from "../../../../../context/strapiContext";

const BusinessTypeName = () => {
  const { searchState, searchSetState } = useSearchContext();
  const { allStrapiBizPlan } = useStrapiContext();
  const { business_type_name } = searchState;
  const { setBusinessTypeName } = searchSetState;
  const [btmYear, setBtmYear] = useState<string | null>("");
  const [btmCategory, setBtmCategory] = useState<string | null>("");

  const businessTypeNameYear = allStrapiBizPlan.edges.map((item) => {
    return item.node.business_type_name;
  });
  const uniqueBusinessTypeNameYear = [...new Set(businessTypeNameYear)];
  const regexPattern = /\d{4}年度/g;
  const yearBusinessTypeNameYear = uniqueBusinessTypeNameYear.map((item) => {
    const matches = item?.match(regexPattern);
    return matches ? matches[0] : item;
  });
  const uniqueYearBusinessTypeNameYear = [
    ...new Set(yearBusinessTypeNameYear),
  ].sort();

  const businessTypeNameCategory = ["通常枠", "コロナ枠"];

  console.log(btmYear);

  return (
    <div>
      <RadioGroup.Root aria-label="View density">
        {uniqueYearBusinessTypeNameYear.map((radiobox) => (
          <div key={radiobox}>
            <RadioGroup.Item value={radiobox || ""} id={radiobox || ""}>
              <RadioGroup.Indicator />
            </RadioGroup.Item>
            <label htmlFor={radiobox || ""}>{radiobox}</label>
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  );
};

export default BusinessTypeName;
