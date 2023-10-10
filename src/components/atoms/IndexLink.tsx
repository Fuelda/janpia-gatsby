import { Link } from "gatsby";
import React from "react";
import { hCenter } from "../../styles/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "twin.macro";

const IndexLink = (props: { label: string; url: string }) => {
  return (
    <a
      css={hCenter}
      tw="w-60 px-4 py-[22px] border border-gray-base justify-between lg:(w-full)"
      href={props.url}
      target="_blank"
    >
      <p tw="inline-block">{props.label}</p>
      <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
    </a>
  );
};

export default IndexLink;
