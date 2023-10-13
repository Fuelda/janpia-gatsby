import React, { useState } from "react";
import Layout from "../components/lauout/Layout";
import { Link, graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { hCenter } from "../styles/base";
import PageNav from "../features/pagenation/component/molecules/PageNav";
import "twin.macro";
import Seo from "../components/lauout/Seo";

type NewsType = {
  id: string;
  createdAt: string;
  title: string;
};

const News: React.FC<any> = ({ data }) => {
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const newsEdges = data.allStrapiNew.edges;
  const newsLength = newsEdges.length;
  const itemPerPage = 20;
  const totalPageNum = Math.ceil(newsLength / itemPerPage);

  const displayNews = newsEdges.slice(
    itemPerPage * (currentPageNo - 1),
    itemPerPage * currentPageNo
  );

  return (
    <Layout>
      <Seo title="お知らせ | 休眠預金活用事業 情報公開サイト" />
      <div tw="mb-[43px]">
        <div tw="text-sm p-2 bg-blue-base gap-2" css={hCenter}>
          <Link to="/">ホーム</Link>
          <FontAwesomeIcon icon={faAngleRight} />
          <p>お知らせ</p>
        </div>
        <div tw="px-3.5">
          <h2 tw="text-xl py-6 font-bold">お知らせ</h2>
          <div tw="flex flex-col gap-4">
            {displayNews.map((news: { node: NewsType }) => (
              <Link
                key={news.node.id}
                to={`/news/${news.node.id}/`}
                tw="flex gap-3.5 lg:(flex-col items-start gap-0)"
                css={hCenter}
              >
                <p tw="text-sm text-gray-base">{news.node.createdAt}</p>
                <p tw="break-all">{news.node.title}</p>
              </Link>
            ))}
          </div>
        </div>

        <PageNav
          totalPageNum={totalPageNum}
          itemNum={newsLength}
          currentPageNo={currentPageNo}
          setCurrentPageNo={setCurrentPageNo}
          itemPerPage={itemPerPage}
        />
      </div>
    </Layout>
  );
};

export default News;

export const newsQuery = graphql`
  query MyQuery {
    allStrapiNew {
      edges {
        node {
          id
          title
          createdAt(formatString: "YYYY.MM.DD")
        }
      }
    }
  }
`;
