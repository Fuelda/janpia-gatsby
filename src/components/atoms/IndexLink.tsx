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
      tw="w-60 px-5 py-[22px] border border-black-font justify-between"
      href={props.url}
    >
      <p tw="inline-block">{props.label}</p>
      <FontAwesomeIcon icon={faAngleRight} />
    </a>
  );
};

export default IndexLink;
