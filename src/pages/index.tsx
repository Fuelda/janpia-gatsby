import React from "react";
import Layout from "../components/lauout/Layout";
import MainVisual from "../components/organisms/MainVisual";
import tw from "twin.macro";
import { Link } from "gatsby";
import IndexProjectCard from "../components/molecules/IndexProjectCard";
import { vCenter } from "../styles/base";
import AlgoliaIndex from "../features/search/api/AlgoliaIndex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import IndexLink from "../components/atoms/IndexLink";
import { StaticImage } from "gatsby-plugin-image";

const indexBox = tw`bg-blue-base rounded-10 px-10 pt-7 pb-10`;
const searchBox = tw`w-[300px] h-[150px] bg-white rounded-10 px-5 py-2.5`;

const Index = () => {
  return (
    <Layout>
      <div tw="mb-24">
        <MainVisual />
        <div css={indexBox} tw="mt-10">
          <p tw="text-center text-2xl">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              tw="mr-3 text-blue-button"
            />
            探し方を選ぶ
          </p>
          <div tw="flex gap-5 justify-between mt-7">
            <Link
              css={searchBox}
              tw="flex justify-between"
              to="/search/organization"
            >
              <div tw="bg-red-base w-[174px] h-[125px]" />
              <StaticImage
                src="../images/select_search_01.png"
                alt="団体から探す"
              />
              <p tw="text-xl">
                <span tw="text-3xl">団体</span>
                <br />
                から探す
              </p>
            </Link>
            <Link
              css={searchBox}
              tw="flex justify-between"
              to="/search/project"
            >
              <div tw="bg-red-base w-[174px] h-[125px]" />
              <p tw="text-xl">
                <span tw="text-3xl">団体</span>
                <br />
                から探す
              </p>
            </Link>
            <Link css={searchBox} tw="flex justify-between" to="/search/issue">
              <div tw="bg-red-base w-[174px] h-[125px]" />
              <p tw="text-xl">
                <span tw="text-3xl">団体</span>
                <br />
                から探す
              </p>
            </Link>
          </div>
        </div>
        <div css={indexBox} tw="mt-7">
          <div css={vCenter} tw="gap-7">
            <p tw="text-center  text-2xl">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                tw="mr-3 text-blue-button"
              />
              フリーワードから探す
            </p>
            <div tw="w-[800px]">
              <AlgoliaIndex path="/" />
            </div>
          </div>
        </div>
        <div css={vCenter} tw="mt-10">
          <div tw="flex gap-7">
            <IndexProjectCard isFdo={true} />
            <IndexProjectCard isFdo={false} />
          </div>
        </div>
        <div tw="mt-14">
          <h2 tw="text-center">関連情報</h2>
          <div tw="mt-7 flex flex-wrap gap-5">
            <IndexLink label="休眠預金活用とは" url="/" />
            <IndexLink label="休眠預金活用とは" url="/" />
            <IndexLink label="休眠預金活用とは" url="/" />
            <IndexLink label="休眠預金活用とは" url="/" />
            <IndexLink label="休眠預金活用とは" url="/" />
            <IndexLink label="休眠預金活用とは" url="/" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
