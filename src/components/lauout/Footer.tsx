import { Link } from "gatsby";
import React from "react";
import "twin.macro";
import { hCenter, wrapper, wrapperSp } from "../../styles/base";
import { StaticImage } from "gatsby-plugin-image";
import tw from "twin.macro";

const Footer = (props: { path: string }) => {
  const { path } = props;
  return (
    <div
      tw="bg-blue-base w-full pt-6 pb-4"
      css={path === "/result/status/" && tw`hidden`}
    >
      <div css={[wrapper, wrapperSp]}>
        <div tw="flex justify-between lg:(flex-col gap-8)">
          <div>
            <p tw="text-lg font-bold">休眠預金活用事業 情報公開サイト</p>
            <div tw="mt-3.5 flex gap-9">
              <div tw="flex flex-col gap-4">
                <Link to="/">ホーム</Link>
                <Link to="/search/organization/">団体から探す</Link>
                <Link to="/search/project/">事業から探す</Link>
                <Link to="/search/issue/">社会課題から探す</Link>
              </div>
              <div tw="flex flex-col  gap-4">
                <Link to="/news/">お知らせ</Link>
                <Link to="/privacy-policy/">個人情報保護について</Link>
                <Link to="/site-policy/">サイトポリシー</Link>
              </div>
            </div>
          </div>
          <div>
            <Link to="/">
              <StaticImage
                src="../../images/logo.svg"
                alt="ロゴ"
                tw="w-[298px] h-[61px]"
              />
            </Link>

            <p tw="mt-4 leading-5 lg:(mt-8)">
              〒100-0011
              <br />
              東京都千代田区内幸町2－2－3 日比谷国際ビル314
              <br />
              email：info@janpia.or.jp　
            </p>
          </div>
        </div>
        <p tw="mt-4 text-center">©︎ 2023 JANPIA</p>
      </div>
    </div>
  );
};

export default Footer;
