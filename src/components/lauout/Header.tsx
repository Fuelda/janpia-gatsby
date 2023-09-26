import { Link } from "gatsby";
import React from "react";
import "twin.macro";
import { wrapper, hCenter } from "../../styles/base";
import { StaticImage } from "gatsby-plugin-image";

const Header = () => {
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
          <nav tw="flex gap-6">
            <Link to="/">ホーム</Link>
            <Link to="/search/organization">団体から探す</Link>
            <Link to="/search/project">事業から探す</Link>
            <Link to="/search/issue">社会課題から探す</Link>
            <Link to="/result">お知らせ</Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
