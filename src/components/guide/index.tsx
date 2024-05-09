import { faCaretDown, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "twin.macro";
import { indexBox, searchBox } from "../../pages";
import { StaticImage } from "gatsby-plugin-image";
import { vCenter } from "../../styles/base";
import { FAQItem } from "./FAQItem";

const GuideHeading = ({ text }: { text: string }) => {
  return <h2 tw="text-xl px-3">■ {text}</h2>;
};

const FAQList = [
  {
    question: "検索結果はどのように表示されますか？",
    answer:
      "団体が実施する事業ごとに表示されます。ただし、団体情報に関しては、共通の内容となっています。",
  },
  {
    question: "フリーワード検索の検索対象はどのようになっていますか？",
    answer:
      "フリーワードの検索対象は次の通りです。また、結果には部分一致する情報が含まれている事業が表示されます。\n•　事業計画より：事業名（主）、事業名（副）、団体の目的、団体の概要・活動・業務、事業概要\n•　団体情報より：代表者(1)フリガナ、代表者(1)氏名、代表者(2)フリガナ、代表者(2)氏名、団体名",
  },
  {
    question:
      "フリーワード検索をしたのですが、結果一覧のサイドバーにあるフリーワード入力窓には転記されないのですか？",
    answer:
      "入力内容をもとに検索されますが、結果一覧のサイドバーに表示はされません。ただし、絞り込み検索で、新たに入力された内容を反映することは可能です。なお、フリーワードの検索結果は絞り込み条件をリセットされるまで、条件として引き継がれます。",
  },
  {
    question: "採択事業年度とは何ですか？",
    answer:
      "採択事業年度は、JANPIA行う公募が資金分配団体を採択した年度です。実行団体の採択年度はは資金分配団体の採択年度に準じます。",
  },
  {
    question:
      "「事業から探す」にある通常事業枠を選択すると出てくる事業分類とは何ですか？",
    answer:
      "「通常枠」とは最大で3年間の事業を行う助成事業です。通常枠には、以下の４つの助成事業の区分があります。\n（1） 草の根活動支援事業\n（2） ソーシャルビジネス形成 支援事業\n（3） イノベーション企画支援事業\n（4） 災害支援事業\n「緊急枠」には事業分類（助成期間は最大1年間）がないため、選択肢は表出しません。\nなお、「社会課題から探す」では、事業分類まで選択できませんので、結果一覧よりさらに絞り込み検索をご活用ください。",
  },
];

export const GuideIndex = () => {
  return (
    <div tw="space-y-16">
      <div tw="space-y-4">
        <GuideHeading text="使い方ガイド" />
        <p tw="px-3">
          「団体から探す/事業から探す/社会課題から探す」の3つから探し方を選択いただけます。
          <br />
          「探す」ページにて条件を選択し、検索することで、目的の情報を取得しやすくなります。
        </p>
        <div css={vCenter} tw="gap-6">
          <div css={indexBox} tw="w-full">
            <p tw="text-center">
              <span tw="text-xl font-bold">STEP 1</span> 探し方を選択
            </p>
            <div tw="flex gap-5 justify-between mt-5 lg:(gap-2.5)">
              <p css={searchBox}>
                <StaticImage
                  src="../../images/select_search_01.png"
                  alt="団体から探す"
                  tw="w-[174px] lg:(w-full)"
                />
                <p tw="text-xl text-center mt-7 lg:(text-base mt-3.5)">
                  <span tw="text-3xl lg:(text-xl)">団体</span>
                  <br />
                  から探す
                </p>
              </p>
              <p css={searchBox}>
                <StaticImage
                  src="../../images/select_search_02.png"
                  alt="事業から探す"
                  tw="w-[174px] lg:(w-full)"
                />
                <p tw="text-xl text-center mt-7 lg:(text-base mt-3.5)">
                  <span tw="text-3xl lg:(text-xl)">事業</span>
                  <br />
                  から探す
                </p>
              </p>
              <p css={searchBox} tw="relative">
                <StaticImage
                  src="../../images/select_search_03.png"
                  alt="社会課題から探す"
                  tw="w-[174px] lg:(w-full)"
                />
                <p tw="text-xl text-center mt-7 absolute right-6 lg:(relative text-base mt-3.5 right-auto)">
                  <span tw="text-3xl lg:(text-xl)">社会課題</span>
                  <br />
                  から探す
                </p>
              </p>
            </div>
          </div>
          <StaticImage src="../../images/icon_triangleDown.svg" alt="下矢印" />
          <div css={indexBox} tw="w-full">
            <div tw="flex gap-6 items-center lg:(gap-4 flex-col)">
              <div css={vCenter} tw="gap-4">
                <p tw="font-bold text-xl">STEP 2</p>
                <StaticImage
                  src="../../images/guide_step2.jpg"
                  alt="STEP2"
                  tw="w-[229px]"
                />
                <p tw="text-center">
                  希望条件を
                  <br />
                  選択して検索
                </p>
              </div>
              <StaticImage
                src="../../images/icon_triangleDown.svg"
                alt="下矢印"
                tw="-rotate-90 lg:(rotate-0)"
              />
              <div css={vCenter} tw="gap-4">
                <p tw="font-bold text-xl">STEP 3</p>
                <StaticImage
                  src="../../images/guide_step3.jpg"
                  alt="STEP3"
                  tw="w-[229px]"
                />
                <p tw="text-center">
                  検索結果一覧から
                  <br />
                  事業を選択
                </p>
              </div>
              <StaticImage
                src="../../images/icon_triangleDown.svg"
                alt="下矢印"
                tw="-rotate-90 lg:(rotate-0)"
              />
              <div css={vCenter} tw="gap-4">
                <p tw="font-bold text-xl">STEP 4</p>
                <StaticImage
                  src="../../images/guide_step4.jpg"
                  alt="STEP4"
                  tw="w-[229px]"
                />
                <p tw="text-center">
                  事業詳細ページで
                  <br />
                  情報を確認
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div tw="space-y-4">
        <GuideHeading text="事業詳細ページで分かること" />
        <p tw="px-3">
          事業詳細ページでは、団体や休眠預金活用事業に関連する情報を閲覧できます。
        </p>
        <StaticImage
          src="../../images/guide_detail_introduction.jpg"
          alt="詳細ページで分かること"
        />
      </div>
      <div tw="space-y-4">
        <GuideHeading text="検索結果ページの見方" />
        <div tw="flex gap-4">
          <StaticImage
            src="../../images/guide_detail_introduction.jpg"
            alt="詳細ページで分かること"
            tw="w-[60%]"
          />
          <ol className="ol__colorNum" tw="space-y-4">
            <li>事業名、団体名、採択事業年度順で並び替えができます</li>
            <li>表示件数を選択できます</li>
            <li>検索条件を追加し、さらに絞り込み可能です</li>
          </ol>
        </div>
      </div>
      <div tw="space-y-4" id="QnA">
        <GuideHeading text="Q & A" />
        <p tw="px-3">以下Q＆Aをご紹介します。</p>
        <div tw="px-3">
          {FAQList.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};
