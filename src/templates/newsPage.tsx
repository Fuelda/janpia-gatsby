import React from "react";
import Layout from "../components/lauout/Layout";
import { Link, graphql } from "gatsby";
import "twin.macro";
import { hCenter, vCenter } from "../styles/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ReverseButton from "../components/atoms/ReverseButton";

const NewsPage: React.FC<any> = ({ data, pageContext }) => {
  const { strapiNew } = data;
  return (
    <Layout>
      <div tw="mb-[43px]">
        <div tw="text-sm p-2 bg-blue-base gap-2" css={hCenter}>
          <Link to="/">ホーム</Link>
          <FontAwesomeIcon icon={faAngleRight} />
          <Link to="/news/">お知らせ</Link>
          <FontAwesomeIcon icon={faAngleRight} />
          <p>{strapiNew.title}</p>
        </div>
        <div tw="px-3.5">
          <h2 tw="text-xl py-6 font-bold">{strapiNew.title}</h2>
          <div>
            <p tw="text-sm text-gray-base">{strapiNew.createdAt}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: strapiNew.content.data.childMarkdownRemark.html,
              }}
              className="news-body"
              tw="mt-[18px]"
            />
          </div>
        </div>
        <div tw="mt-10" css={vCenter}>
          <ReverseButton path="/news/" label="お知らせ一覧" />
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    strapiNew(id: { eq: $slug }) {
      id
      title
      createdAt(formatString: "YYYY.MM.DD")
      content {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;
