import React from "react";
import { useSearchContext } from "../../../../../context/searchContext";
import { textField, textFieldSide } from "../../../../../styles/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import "twin.macro";
import { h3 } from "../../../../../styles/base";

const OrganizationName = (props: { path: string }) => {
  const { searchState, searchSetState } = useSearchContext();
  const { organization_name } = searchState;
  const { setOrganizationName } = searchSetState;

  const handleTextfield = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizationName(e.target.value);
  };

  return (
    <div>
      <h3 css={h3}>団体名</h3>
      <div tw="relative px-3.5 py-2.5">
        <input
          onChange={(e) => handleTextfield(e)}
          type="text"
          css={props.path === "search" ? textField : textFieldSide}
          placeholder="団体名を入力してください"
          value={organization_name}
        />
        <button
          tw="absolute top-[35%] right-2.5"
          onClick={() => setOrganizationName("")}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </div>
    </div>
  );
};

export default OrganizationName;
