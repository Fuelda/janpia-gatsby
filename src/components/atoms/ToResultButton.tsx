import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import React from "react";
import "twin.macro";

const ToResultButton = () => {
  return (
    <Link
      to="/result"
      tw="w-[280px] bg-blue-button text-white py-2 text-center block rounded"
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} tw="mr-3" />
      検索
    </Link>
  );
};

export default ToResultButton;
