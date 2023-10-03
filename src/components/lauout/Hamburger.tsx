import { Link } from "gatsby";
import React from "react";
import { slide as Menu } from "react-burger-menu";
import tw from "twin.macro";

const detailSidebarBlock = tw`block py-3 px-6 w-full relative`;
const currentSidebar = tw` text-blue-button font-bold before:(w-1.5 h-4/5 bg-blue-button absolute left-0 top-1/2 transform -translate-y-1/2)`;

const Hamburger = (props: { path: string; isOpen: boolean }) => {
  const { path, isOpen } = props;
  return (
    <Menu right width={"70%"} isOpen={isOpen}>
      <main>
        <div>
          <Link
            to="/"
            css={[detailSidebarBlock, path === "/" && currentSidebar]}
          >
            ホーム
          </Link>
          <Link
            to="/search/organization/"
            css={[
              detailSidebarBlock,
              path === "/search/organization/" && currentSidebar,
            ]}
          >
            団体から探す
          </Link>
          <Link
            to="/search/project/"
            css={[
              detailSidebarBlock,
              path === "/search/project/" && currentSidebar,
            ]}
          >
            事業から探す
          </Link>
          <Link
            to="/search/issue/"
            css={[
              detailSidebarBlock,
              path === "/search/issue/" && currentSidebar,
            ]}
          >
            社会課題から探す
          </Link>
          <Link
            to="/news/"
            css={[
              detailSidebarBlock,
              path.includes("/news/") && currentSidebar,
            ]}
          >
            お知らせ
          </Link>
          <Link
            to="/privacy-policy/"
            css={[
              detailSidebarBlock,
              path.includes("/privacy-policy/") && currentSidebar,
            ]}
          >
            個人情報ほどについて
          </Link>
          <Link
            to="/site-policy/"
            css={[
              detailSidebarBlock,
              path.includes("/site-policy/") && currentSidebar,
            ]}
          >
            情報公開等について
          </Link>
        </div>
      </main>
    </Menu>
  );
};

export default Hamburger;
