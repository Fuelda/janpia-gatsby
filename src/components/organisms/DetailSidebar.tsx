import { Link } from "gatsby";
import React from "react";
import "twin.macro";
import { vCenter } from "../../styles/base";
import tw from "twin.macro";
import { useLocation } from "@reach/router";
import { detailPageLinkType } from "../lauout/DetailWrapper";

const detailSidebarBlock = tw`block border border-gray-border py-3 px-3.5 w-full font-bold`;
const currentSidebar = tw`bg-blue-button border-blue-button text-white`;

const DetailSidebar = ({
  detailPageLink,
}: {
  detailPageLink: detailPageLinkType[];
}) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      css={[
        vCenter,
        tw`w-[205px] justify-start gap-[5px] sticky top-0 lg:hidden`,
      ]}
    >
      {detailPageLink &&
        detailPageLink.map((link) => (
          <Link
            css={[detailSidebarBlock, path === link.path && currentSidebar]}
            to={link.path}
          >
            {link.title}
          </Link>
        ))}
    </div>
  );
};

export default DetailSidebar;
