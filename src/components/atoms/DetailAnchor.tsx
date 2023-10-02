import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const DetailAnchor = (props: { title: string; anchor: string }) => {
  return (
    <AnchorLink to={props.anchor} tw="mb-1 border-b border-gray-black">
      <FontAwesomeIcon icon={faAngleDown} tw="mr-1.5" />
      {props.title}
    </AnchorLink>
  );
};

export default DetailAnchor;
