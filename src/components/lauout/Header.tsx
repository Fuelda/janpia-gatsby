import { Link } from "gatsby";
import React, { useState } from "react";
import "twin.macro";
import { wrapper, hCenter, wrapperSp } from "../../styles/base";
import { StaticImage } from "gatsby-plugin-image";
import tw from "twin.macro";
import HamburgerButton from "../atoms/HamburgerButton";
import Hamburger from "./Hamburger";

const currentPath = tw`p-[7px] bg-blue-vivid bg-opacity-10`;

const Header = (props: { path: string }) => {
  const path = props.path;
  const [isHamOpen, setIsHamOpen] = useState(false);

  return (
    <div
      tw="fixed top-0 w-screen bg-white z-30"
      css={path === "/result/status/" && tw`hidden`}
    >
      <div css={[wrapper, wrapperSp]}>
        <div css={hCenter} tw="justify-between py-1.5 relative">
          <Link to="/" tw="gap-3 lg:(w-[90%])" css={hCenter}>
            <StaticImage
              src="../../images/symbol.png"
              alt="シンボル"
              tw="w-[72px] h-[70px] lg:(w-16 h-16) shrink-0"
            />
            <h1>
              休眠預金活用事業
              <br />
              情報公開サイト
            </h1>
          </Link>
          <nav css={[hCenter, tw`gap-6 lg:hidden`]}>
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
            <Link
              to="/guide/"
              tw="p-[7px] text-center"
              css={path.includes("/guide/") && currentPath}
            >
              使い方ガイド
              <br />
              Q&A
            </Link>
          </nav>
          <div tw="hidden lg:(block absolute right-0 z-[2000])">
            <HamburgerButton isOpen={isHamOpen} setIsOpen={setIsHamOpen} />
          </div>
          <Hamburger path={path} isOpen={isHamOpen} />
        </div>
      </div>
    </div>
  );
};

export default Header;
