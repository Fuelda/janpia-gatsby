import React from "react";
import { hCenter } from "../../styles/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby";
import "twin.macro";
import { useLocation } from "@reach/router";
import tw from "twin.macro";
import { detailPageLinkType } from "./DetailWrapper";

const linkBox = tw`text-[15px] w-60 px-3 py-2.5 border border-gray-base justify-between lg:(w-full)`;
const currentSidebar = tw`opacity-50`;

const DetailFooter = ({
  detailPageLink,
}: {
  detailPageLink: detailPageLinkType[];
}) => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div tw="hidden lg:(grid px-2.5 grid-cols-2 gap-2.5 mb-10)">
      {detailPageLink &&
        detailPageLink.map((link) => (
          <Link
            to={link.path}
            css={[hCenter, linkBox, path === link.path && currentSidebar]}
          >
            <p tw="inline-block">{link.title}</p>
            <FontAwesomeIcon icon={faAngleRight} tw="text-gray-black" />
          </Link>
        ))}
    </div>
  );
};

export default DetailFooter;
