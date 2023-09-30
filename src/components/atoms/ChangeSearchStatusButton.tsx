import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React from "react";
import "twin.macro";

const ChangeSearchStatusButton = () => {
  return (
    <Link
      to="/result/status/"
      tw="block w-[280px] text-center py-3 border border-blue-button rounded text-blue-button lg:(w-full)"
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} tw="mr-3" />
      検索条件を変更する
    </Link>
  );
};

export default ChangeSearchStatusButton;
