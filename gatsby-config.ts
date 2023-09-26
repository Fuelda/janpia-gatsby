import type { GatsbyConfig } from "gatsby";
const algoliaQuery = require("./src/gatsby/algoliaQuery.ts");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    "attached-file",
    "attached-file-text",
    "biz-plan",
    "biz-plan-group",
    "biz-plan-group-manual",
    "biz-plan-manual",
    "biz-plan-sub",
    "business-category",
    "business-type-name",
    "complete-report-manual",
    "evaluation-plan",
    "evaluation-plan-manual",
    "evaluation-plan-sub",
    "finance-plan",
    "finance-plan-former",
    "finance-plan-manual",
    "group",
    "mid-report-manual",
    "offering-result-manual",
    "post-report-manual",
    "pre-report-manual",
    "progress-report-manual",
    "progress-round",
    "sdgs-goal",
    "settle-report-manual",
    "subsidy-amount",
    "topic-keyword",
  ],
  singleTypes: [],
  remoteFileHeaders: {
    /**
     * Customized request headers
     * For http request with a image or other files need authorization
     * For expamle: Fetch a CDN file which has a security config when gatsby building needs
     */
    Referer: "https://your-site-domain/",
    // Authorization: "Bearer eyJhabcdefg_replace_it_with_your_own_token",
  },
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: `JANPIA disclosure`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    // "gatsby-plugin-google-gtag",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: "janpia_search",
        queries: [
          {
            query: algoliaQuery.attachedFileText,
            transformer: ({ data }: any) =>
              data.allStrapiAttachedFileText.edges.map(({ node }: any) => {
                return {
                  id: node.id,
                  ...node,
                };
              }),
          },
          {
            query: algoliaQuery.bizPlan,
            transformer: ({ data }: any) =>
              data.allStrapiBizPlan.edges.map(({ node }: any) => {
                return {
                  id: node.id,
                  ...node,
                };
              }),
          },
          {
            query: algoliaQuery.group,
            transformer: ({ data }: any) =>
              data.allStrapiGroup.edges.map(({ node }: any) => {
                return {
                  id: node.id,
                  ...node,
                };
              }),
          },
          {
            query: algoliaQuery.bizPlanSub,
            transformer: ({ data }: any) =>
              data.allStrapiBizPlanSub.edges.map(({ node }: any) => {
                return {
                  id: node.id,
                  ...node,
                };
              }),
          },
          {
            query: algoliaQuery.bizPlanManual,
            transformer: ({ data }: any) =>
              data.allStrapiBizPlanManual.edges.map(({ node }: any) => {
                return {
                  id: node.id,
                  ...node,
                };
              }),
          },
        ],
        chunkSize: 100000,
        settings: {
          queryLanguages: ["ja"],
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100,
      },
    },
  ],
};

export default config;
