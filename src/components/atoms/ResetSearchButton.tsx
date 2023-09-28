import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "twin.macro";
import { useSearchContext } from "../../context/searchContext";
import { useAlgoliaStrapiContext } from "../../context/algoliaStrapiContext";

const ResetSearchButton = () => {
  const { resetSearchStatus } = useSearchContext();

  return (
    <button tw="text-sm text-gray-border" onClick={() => resetSearchStatus()}>
      <FontAwesomeIcon icon={faCircleXmark} tw="mr-1" />
      検索条件をリセット
    </button>
  );
};

export default ResetSearchButton;
