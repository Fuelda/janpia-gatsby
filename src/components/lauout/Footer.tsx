import { Link } from "gatsby";
import React from "react";
import "twin.macro";
import { hCenter, wrapper } from "../../styles/base";
import { StaticImage } from "gatsby-plugin-image";

const Footer = () => {
  return (
    <div tw="bg-blue-base w-full pt-6 pb-4">
      <div css={wrapper}>
        <div tw="flex justify-between">
          <div>
            <p tw="text-lg font-bold">休眠預金活用事業 情報公開サイト</p>
            <div tw="mt-3.5 flex gap-9">
              <div tw="flex flex-col  gap-4">
                <Link to="/">ホーム</Link>
                <Link to="/">団体から探す</Link>
                <Link to="/">事業から探す</Link>
                <Link to="/">社会課題から探す</Link>
              </div>
              <div tw="flex flex-col  gap-4">
                <Link to="/">お知らせ</Link>
                <Link to="/">個人情報保護について</Link>
                <Link to="/">サイトポリシー</Link>
              </div>
            </div>
          </div>
          <div>
            <StaticImage
              src="../../images/logo.svg"
              alt="ロゴ"
              tw="w-[298px] h-[61px]"
            />
            <p tw="mt-4 leading-5">
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
