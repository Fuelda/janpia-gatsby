import React, { useEffect } from "react";
import Layout from "../components/lauout/Layout";
import "twin.macro";
import tw from "twin.macro";
import { Link, graphql } from "gatsby";
import IndexProjectCard from "../components/molecules/IndexProjectCard";
import { hCenter, vCenter, wrapperSp } from "../styles/base";
import AlgoliaIndex from "../features/search/api/AlgoliaIndex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import IndexLink from "../components/atoms/IndexLink";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { useSearchContext } from "../context/searchContext";
import ReverseButton from "../components/atoms/ReverseButton";

const indexBox = [
  tw`bg-blue-base rounded-10 px-10 pt-7 pb-10 lg:(pb-7)`,
  wrapperSp,
];
const searchBox = tw`w-[300px] h-[150px] bg-white rounded-10 px-5 py-2.5 flex justify-between lg:(w-[32.4%] h-auto flex-col px-3)`;

type NewsType = {
  id: string;
  createdAt: string;
  title: string;
};

const Index: React.FC<any> = ({ data }) => {
  const { resetSearchStatus } = useSearchContext();
  const newsEdges = data.allStrapiNew.edges;
  const linkEdges = data.allStrapiExternalLink.edges;
  const thumbnail = getImage(data.strapiMainVisual.thumbnail.localFile);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    resetSearchStatus();
  }, []);

  return (
    <Layout>
      <div tw="mb-24">
        <div tw="w-full h-[300px] relative md:(h-[166px])">
          <GatsbyImage
            image={thumbnail}
            alt="サムネイル"
            tw="w-full h-full absolute top-0 left-0 rounded-10"
            objectFit="cover"
          />
        </div>

        <div css={indexBox} tw="mt-10">
          <p tw="text-center text-2xl">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              tw="mr-3 text-blue-button"
            />
            探し方を選ぶ
          </p>
          <div tw="flex gap-5 justify-between mt-7 lg:(gap-2.5)">
            <Link css={searchBox} to="/search/organization">
              <StaticImage
                src="../images/select_search_01.png"
                alt="団体から探す"
                tw="w-[174px] lg:(w-full)"
              />
              <p tw="text-xl text-center mt-7 lg:(text-base mt-3.5)">
                <span tw="text-3xl lg:(text-xl)">団体</span>
                <br />
                から探す
              </p>
            </Link>
            <Link css={searchBox} to="/search/project">
              <StaticImage
                src="../images/select_search_02.png"
                alt="事業から探す"
                tw="w-[174px] lg:(w-full)"
              />
              <p tw="text-xl text-center mt-7 lg:(text-base mt-3.5)">
                <span tw="text-3xl lg:(text-xl)">事業</span>
                <br />
                から探す
              </p>
            </Link>
            <Link css={searchBox} tw="relative" to="/search/issue">
              <StaticImage
                src="../images/select_search_03.png"
                alt="社会課題から探す"
                tw="w-[174px] lg:(w-full)"
              />
              <p tw="text-xl text-center mt-7 absolute right-6 lg:(relative text-base mt-3.5 right-auto)">
                <span tw="text-3xl lg:(text-xl)">社会課題</span>
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
            <div tw="w-[800px] lg:(w-full)">
              <AlgoliaIndex path="/" />
            </div>
          </div>
        </div>
        <div css={[vCenter, wrapperSp]} tw="mt-10">
          <div tw="flex gap-7 lg:(gap-2.5 w-full)">
            <IndexProjectCard isFdo={true} />
            <IndexProjectCard isFdo={false} />
          </div>
        </div>
        <div tw="mt-14" css={wrapperSp}>
          <h2 tw="text-center">お知らせ</h2>
          <div tw="mt-7 flex flex-col gap-4">
            {newsEdges.map((news: { node: NewsType }) => (
              <Link
                key={news.node.id}
                to={`/news/${news.node.id}/`}
                tw="flex gap-3.5"
                css={hCenter}
              >
                <p tw="text-sm text-gray-base">{news.node.createdAt}</p>
                <p>{news.node.title}</p>
              </Link>
            ))}
          </div>
          <div tw="mt-10" css={vCenter}>
            <ReverseButton path="/news/" label="もっと見る" />
          </div>
        </div>
        <div tw="mt-14" css={wrapperSp}>
          <h2 tw="text-center">関連情報</h2>
          <div tw="mt-7 flex flex-wrap gap-5 lg:(grid grid-cols-2 gap-2.5)">
            {linkEdges.map((link: { node: { label: string; url: string } }) => (
              <IndexLink label={link.node.label} url={link.node.url} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const newsQuery = graphql`
  query MyQuery {
    strapiMainVisual {
      thumbnail {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    allStrapiNew(limit: 3) {
      edges {
        node {
          id
          title
          createdAt(formatString: "YYYY.MM.DD")
        }
      }
    }
    allStrapiExternalLink {
      edges {
        node {
          label
          url
        }
      }
    }
  }
`;
