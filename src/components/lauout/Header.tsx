import { Link } from "gatsby";
import React from "react";
import "twin.macro";
import { wrapper, hCenter } from "../../styles/base";
import { StaticImage } from "gatsby-plugin-image";
import { useLocation } from "@reach/router";
import tw from "twin.macro";
//

const currentPath = tw`p-[7px] bg-blue-vivid bg-opacity-10`;

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div tw="fixed top-0 w-screen bg-white z-30">
      <div css={wrapper}>
        <div css={hCenter} tw="justify-between py-1.5">
          <Link to="/" tw="gap-3" css={hCenter}>
            <StaticImage
              src="../../images/symbol.png"
              alt="シンボル"
              tw="w-[72px] h-[70px]"
            />
            <h1>休眠預金活用事業 情報公開サイト</h1>
          </Link>
          <nav css={hCenter} tw="gap-6">
            <Link to="/" tw="p-[7px]" css={path === "/" && currentPath}>
              ホーム
            </Link>
            <Link
              to="/search/organization/"
              tw="p-[7px]"
              css={path === "/search/organization/" && currentPath}
            >
              団体から探す
            </Link>
            <Link
              to="/search/project/"
              tw="p-[7px]"
              css={path === "/search/project/" && currentPath}
            >
              事業から探す
            </Link>
            <Link
              to="/search/issue/"
              tw="p-[7px]"
              css={path === "/search/issue/" && currentPath}
            >
              社会課題から探す
            </Link>
            <Link
              to="/news/"
              tw="p-[7px]"
              css={path.includes("/news/") && currentPath}
            >
              お知らせ
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
