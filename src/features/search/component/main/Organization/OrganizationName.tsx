import React, { useEffect, useState } from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { textField, textFieldSide } from "../../../../../styles/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import "twin.macro";
import { h3 } from "../../../../../styles/base";
import { navigate } from "gatsby";
import { useDebounce } from "../../../../../hooks/useDebounce";

const OrganizationName = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { organization_name } = searchState;
  const { setOrganizationName } = searchSetState;
  const [organizationNameInput, setOrganizationNameInput] =
    useState(organization_name);
  const [isComposing, setIsComposing] = useState(false);
  const debouncedOrganizationName = useDebounce(organizationNameInput, 500);

  useEffect(() => {
    setOrganizationName(debouncedOrganizationName);
  }, [debouncedOrganizationName]);

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isComposing) {
      navigate("/result");
    }
  };

  return (
    <div>
      <h3 css={h3}>団体名</h3>
      <div tw="relative px-3.5 py-2.5">
        <input
          type="text"
          css={props.path.includes("search") ? textField : textFieldSide}
          placeholder="団体名を入力してください"
          value={organizationNameInput}
          onChange={(e) => setOrganizationNameInput(e.target.value)}
          onKeyDown={handleEnterKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button
          tw="absolute top-1/2 transform -translate-y-1/2 right-8"
          onClick={() => setOrganizationNameInput("")}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </div>
    </div>
  );
};

export default OrganizationName;
