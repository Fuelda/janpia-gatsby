import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";

interface SeoType {
  title?: string;
  description?: string;
}

const Seo = ({ title, description }: SeoType) => {
  const { site } = useStaticQuery(query);
  const { defaultTitle, defaultDescription, siteUrl, image } =
    site?.siteMetadata ?? {};
  const { pathname } = useLocation();

  const seoInfo = {
    title: title ? title : defaultTitle,
    description: description ? description : defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet>
      <html lang="ja" />
      <title>{seoInfo.title}</title>
      <meta name="description" content={seoInfo.description} />
      <meta name="image" content={seoInfo.image} />
      <meta property="og:url" content={seoInfo.url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoInfo.title} />
      <meta property="og:description" content={seoInfo.description} />
      <meta property="og:site_name" content={seoInfo.title} />
      <meta property="og:image" content={seoInfo.image} />
    </Helmet>
  );
};

export default Seo;

const query = graphql`
  query SeoQuery {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl
        image
      }
    }
  }
`;
