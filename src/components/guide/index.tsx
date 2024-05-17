import {
  faAngleRight,
  faCaretDown,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "twin.macro";
import { indexBox, searchBox } from "../../pages";
import { StaticImage } from "gatsby-plugin-image";
import { vCenter } from "../../styles/base";
import { FAQItem } from "./FAQItem";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const GuideHeading = ({ text }: { text: string }) => {
  return <h2 tw="text-xl px-3">■ {text}</h2>;
};

const FAQList = [
  {
    question: "検索結果はどのように表示されますか？",
    answer:
      "各団体が実施する事業単位で表示されます。ただし、複数事業で採択されている団体の「団体情報」に関しては、共通の内容が表示されます。",
  },
  {
    question: "フリーワード検索の検索対象はどのようになっていますか？",
    answer:
      "フリーワードの検索対象は次の通りです。また、結果には部分一致する情報が含まれている事業が表示されます。\n•　事業計画より：事業名（主）、事業名（副）、団体の目的、団体の概要・活動・業務、事業概要\n•　団体情報より：代表者：フリガナ、代表者：氏名、団体名",
  },
  {
    question:
      "フリーワード検索をしたのですが、結果一覧のサイドバーにあるフリーワード入力窓には転記されないのですか？",
    answer:
      "トップページのフリーワード検索窓で入力された内容をもとに検索されますが、結果一覧のサイドバーには転記されません。ただし、サイドバーで新たに条件を入力することで、絞込検索をすることが可能です。なお、トップページのフリーワード検索窓からの検索結果は、絞り込み条件をリセットされるまで、条件として引き継がれます。",
  },
  {
    question: "採択事業年度とは何ですか？",
    answer:
      "採択事業年度は、資金分配団体を採択された年度です。実行団体の採択事業年度の表示は、資金分配団体の採択事業年度に準じます。",
  },
  {
    question:
      "「事業から探す」にある事業枠の通常枠を選択すると表示される事業分類とは何ですか？",
    answer:
      "「通常枠」とは助成期間が最大3年間の助成事業です。通常枠には、以下の４つの助成事業の区分があります。\n（1） 草の根活動支援事業\n（2） ソーシャルビジネス形成 支援事業\n（3） イノベーション企画支援事業\n（4） 災害支援事業\nこの区分は助成期間が最大1年間の「緊急支援枠」にはないため、選択肢は通常枠を選択したときのみ表示されます。\nなお、「社会課題から探す」では、事業分類まで選択できませんので、結果一覧よりさらに絞り込み検索をご活用ください。",
  },
  {
    question:
      "検索結果で表示された事業を見たら、すべての書類が公開されていないようです。公開される時期など決まっているのですか？",
    answer:
      "情報公開サイトでは、休眠預金活用事業に採択された団体が用いる業務管理を目的としたシステムに入力された情報を、必要な確認・承認プロセスを経たのちに公開しています。登録されたばかりの事業では団体情報・事業計画・資金計画など初期の計画が表示されます。\nその後事業の進捗に応じてシステムに入力された情報が、確認・承認を経て随時公開されます。そのため書類の公開時期については、団体の書類提出と承認の状況によってタイミングが異なることとなります。",
  },
  {
    question:
      "以前、ある団体の事業計画を検索して見たのですが、今見ると同じ書類なのに情報が少し違うようです。なぜでしょうか？",
    answer:
      "情報公開サイトでは、団体がシステムに登録している最新の情報が表示されます。そのため、事業実施途中で事業計画の一部が変更された場合などは、その内容が情報公開サイトに反映され、結果、以前ご覧いただいた内容とは一部異なる内容が表示されている場合がございます。",
  },
];

export const GuideIndex = () => {
  return (
    <div tw="space-y-16 lg:mt-6">
      <section tw="space-y-4">
        <GuideHeading text="検索の仕方" />
        <p tw="px-3">
          「団体から探す/事業から探す/社会課題から探す」の3つから探し方を選択いただけます。
          <br />
          「探す」ページにて条件を選択し、検索することで、目的の情報を取得しやすくなります。
        </p>
        <div css={vCenter} tw="gap-6 lg:px-2.5">
          <div css={indexBox} tw="w-full space-y-5">
            <p tw="text-center text-xl font-bold">STEP 1</p>
            <div tw="flex gap-5 justify-between lg:(gap-2.5)">
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
            <p tw="text-center">トップページより探し方を選択</p>
          </div>
          <StaticImage src="../../images/icon_triangleDown.svg" alt="下矢印" />
          <div css={indexBox} tw="w-full">
            <div tw="flex gap-6 items-start lg:(gap-4 flex-col items-center)">
              <div css={vCenter} tw="gap-4">
                <p tw="font-bold text-xl">STEP 2</p>
                <StaticImage
                  src="../../images/guide_step2.jpg"
                  alt="STEP2"
                  tw="w-[229px] lg:w-[45%]"
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
                tw="-rotate-90 mt-44 lg:(rotate-0 mt-0 w-10)"
              />
              <div css={vCenter} tw="gap-4">
                <p tw="font-bold text-xl">STEP 3</p>
                <StaticImage
                  src="../../images/guide_step3.jpg"
                  alt="STEP3"
                  tw="w-[229px] lg:w-[45%]"
                />
                <div css={vCenter} tw="gap-4">
                  <p tw="text-center">
                    検索結果一覧から
                    <br />
                    事業を選択
                  </p>
                  <AnchorLink to="/guide#search">
                    <div tw="flex items-center gap-4 text-sm relative">
                      <p>詳細はこちら</p>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        tw="absolute -right-4"
                      />
                    </div>
                  </AnchorLink>
                </div>
              </div>
              <StaticImage
                src="../../images/icon_triangleDown.svg"
                alt="下矢印"
                tw="-rotate-90 mt-44 lg:(rotate-0 mt-0 w-10)"
              />
              <div css={vCenter} tw="gap-4">
                <p tw="font-bold text-xl">STEP 4</p>
                <StaticImage
                  src="../../images/guide_step4.jpg"
                  alt="STEP4"
                  tw="w-[229px] lg:w-[45%]"
                />
                <div css={vCenter} tw="gap-4">
                  <p tw="text-center">
                    事業詳細ページで
                    <br />
                    情報を確認
                  </p>
                  <AnchorLink to="/guide#detail">
                    <div tw="flex items-center gap-4 text-sm relative">
                      <p>詳細はこちら</p>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        tw="absolute -right-4"
                      />
                    </div>
                  </AnchorLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section tw="space-y-4" id="search">
        <GuideHeading text="検索結果ページの見方" />
        <div tw="flex gap-4 lg:(flex-col px-2.5 gap-6)">
          <StaticImage
            src="../../images/guide_result_introduction.jpg"
            alt="検索結果ページで分かること"
            tw="w-[60%] lg:hidden"
          />
          <StaticImage
            src="../../images/guide_result_introduction_sp.jpg"
            alt="検索結果ページで分かること"
            tw="w-full hidden lg:block"
          />
          <ol className="ol__colorNum" tw="space-y-4">
            <li>事業名、団体名、採択事業年度順で並び替えができます</li>
            <li>表示件数を選択できます</li>
            <li>検索条件を追加し、さらに絞り込み可能です</li>
          </ol>
        </div>
      </section>
      <section tw="space-y-4" id="detail">
        <GuideHeading text="事業詳細ページで分かること" />
        <p tw="px-3">
          事業詳細ページでは、団体や休眠預金活用事業に関連する情報を閲覧できます。
        </p>
        <StaticImage
          src="../../images/guide_detail_introduction.jpg"
          alt="詳細ページで分かること"
          tw="lg:hidden"
        />
        <StaticImage
          src="../../images/guide_detail_introduction_sp.jpg"
          alt="詳細ページで分かること"
          tw="hidden lg:block"
        />
      </section>
      <section tw="space-y-4" id="QnA">
        <GuideHeading text="Q & A" />
        <p tw="px-3 lg:px-2.5">以下Q＆Aをご紹介します。</p>
        <div tw="px-3 lg:px-2.5">
          {FAQList.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </div>
  );
};
