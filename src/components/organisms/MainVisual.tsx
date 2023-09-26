import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import "twin.macro";

const MainVisual = () => {
  return (
    <div tw="w-full h-[300px] pt-10 pb-[76px] px-20 relative">
      <StaticImage
        src="../../images/kv-summer.png"
        alt="シンボル"
        tw="w-full absolute top-0 left-0"
      />
      <div>
        <p tw="text-[45px] font-bold text-center">休眠預金を、社会のために。</p>
        <p tw="text-xl font-bold mt-4 tracking-wide text-center">
          「休眠預金活用事業 情報公開サイト」は
          <br />
          休眠預金を活用した地域や社会の課題解決団体を検索できる
          <br />
          休眠預金活用事業専門の情報検索サービスです。
        </p>
      </div>
    </div>
  );
};

export default MainVisual;
