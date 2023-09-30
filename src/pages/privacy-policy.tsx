import React from "react";
import Layout from "../components/lauout/Layout";
import "twin.macro";
import { Link } from "gatsby";
import { hCenter } from "../styles/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import tw from "twin.macro";

const h3Pp = tw`mt-9 mb-3.5 text-lg font-bold`;

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div tw="mb-[109px]">
        <div tw="text-sm p-2 bg-blue-base gap-2" css={hCenter}>
          <Link to="/">ホーム</Link>
          <FontAwesomeIcon icon={faAngleRight} />
          <p>個人情報保護について</p>
        </div>
        <div tw="px-3.5">
          <h2 tw="text-xl py-6 font-bold">個人情報保護について</h2>
          <div tw="mt-[25px]">
            <div>
              <p>
                一般財団法人日本民間公益活動連携機構（以下「当機構」という。）は、国及び地方公共団体が対応することが困難な社会的課題の解決を図るための民間公益活動を促進することを目的とする団体です。
                <br />
                当機構は、取得する個人情報（行政手続における特定の個人を識別するための番号の利用等に関する法律（以下「番号法」という。）第2条第3項に規定する個人情報をいい、番号法第2条第8項に規定する特定個人情報を含む。）の重要性を十分に認識しており、適切に取り扱うことは当機構の重要な責務であると認識しております。
                <br />
                当機構は、当機構の事業活動のすべてにおいて、個人情報の保護に関する法令その他の規範を尊重・遵守し、個人情報を適切かつ安全に取り扱うとともに個人情報の保護に努めるものとします。
              </p>
              <h3 css={h3Pp}>1. 個人情報等の取得・利用</h3>
              <p>
                当機構は、適法かつ公正な手段により個人情報を取得し、取得の際に示した利用目的の範囲内で、当機構の事業を遂行する上で必要な限りにおいて利用いたします。また、当機構のウェブサイト（
                <a
                  href="https://www.janpia.or.jp/"
                  tw="underline text-blue-link"
                >
                  https://www.janpia.or.jp/
                </a>
                ）において、取得した個人情報の利用目的を公表いたします。
              </p>
              <h3 css={h3Pp}>2. 法令及び規範の遵守</h3>
              <p>
                当機構は、個人情報の取扱いについて、個人情報の保護に関する法令その他の規範を遵守します。
              </p>
              <h3 css={h3Pp}>3. 管理体制</h3>
              <p>
                （1）当機構は、すべての個人情報について、不正アクセス、盗難、持出し等による紛失、破壊、改ざん、漏えい等が発生しないように適正に管理し、必要な予防・是正等の適切な安全管理措置を講じます。
                <br />
                （2）当機構は、個人情報の取扱いを第三者に委託する場合は、適切な委託先を選定するとともに、委託先に安全管理措置を遵守させるために必要な契約を締結します。また、当機構は、委託先において個人情報の適正な管理が行われるよう委託先を管理・監督します。
                <br />
                （3）当機構は、取得した個人情報について、本人から開示・訂正、利用停止等を求められたときは、適切に対応します。また、個人情報の取扱いに関する問合せや苦情を受け付ける窓口を設け、問合せや苦情を受け付けた場合には、適切かつ速やかに対応します。
              </p>
              <h3 css={h3Pp}>4. 法令遵守のための取り組みの継続</h3>
              <p>
                当機構は、個人情報保護に関する方針や個人情報の管理体制等について、当機構の事業内容の変化及び当機構の事業を取り巻く法令、社会環境、IT環境の変化等に応じて、継続的に見直し、改善します。
              </p>
            </div>
            <div tw="mt-[52px]">
              <p tw="text-end">
                平成30年8月31日
                <br />
                一般財団法人日本民間公益活動連携機構
                <br />
                理事長　二宮　雅也
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
