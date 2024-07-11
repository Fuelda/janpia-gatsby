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
    "offering-report-manual",
    "post-report-manual",
    "pre-report-manual",
    "progress-report-manual",
    "progress-round",
    "sdgs-goal",
    "settle-report",
    "settle-report-manual",
    "subsidy-amount",
    "topic-keyword",
    "new",
    "external-link",
  ],
  singleTypes: ["main-visual"],
  remoteFileHeaders: {
    /**
     * Customized request headers
     * For http request with a image or other files need authorization
     * For expamle: Fetch a CDN file which has a security config when gatsby building needs
     */
    Referer: "https://johokoukai.janpia.or.jp/",
    // Authorization: "Bearer eyJhabcdefg_replace_it_with_your_own_token",
  },
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: "休眠預金活用事業 情報公開サイト",
    desciption:
      "「休眠預金活用事業 情報公開サイト」は休眠預金を活用した事業や団体の情報を公開し、その情報を検索できる休眠預金活用事業の情報公開・情報検索サイトです。",
    siteUrl: `https://johokoukai.janpia.or.jp`,
    image: `/summer.png`,
    icon: `/favicon.png`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GATSBY_TRACKING_ID],
      },
    },
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
    // TODO: Algoliaの様子を見て復旧する
    // {
    //   resolve: `gatsby-plugin-algolia`,
    //   options: {
    //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     indexName: "janpia-johokokai",
    //     queries: [
    //       {
    //         query: algoliaQuery.attachedFileText,
    //         transformer: ({ data }: any) =>
    //           data.allStrapiAttachedFileText.edges.map(({ node }: any) => {
    //             return {
    //               id: node.id,
    //               insert_id: node.insert_id,
    //               content: node.content.data.content.slice(0, 3000),
    //               internal: { contentDigest: node.internal.contentDigest },
    //             };
    //           }),
    //       },
    //       {
    //         query: algoliaQuery.bizPlan,
    //         transformer: ({ data }: any) =>
    //           data.allStrapiBizPlan.edges.map(({ node }: any) => {
    //             return {
    //               id: node.id,
    //               business_cd: node.business_cd,
    //               business_name: node.business_name,
    //               business_name_sub: node.business_name_sub,
    //               vision: node.vision.data.vision.slice(0, 1500),
    //               mission: node.mission.data.mission.slice(0, 1500),
    //               business_overview:
    //                 node.business_overview.data.business_overview.slice(
    //                   0,
    //                   1500
    //                 ),
    //               internal: { contentDigest: node.internal.contentDigest },
    //             };
    //           }),
    //       },
    //       {
    //         query: algoliaQuery.group,
    //         transformer: ({ data }: any) =>
    //           data.allStrapiGroup.edges.map(({ node }: any) => {
    //             return {
    //               id: node.id,
    //               ...node,
    //             };
    //           }),
    //       },
    //       {
    //         query: algoliaQuery.bizPlanManual,
    //         transformer: ({ data }: any) =>
    //           data.allStrapiBizPlanManual.edges.map(({ node }: any) => {
    //             return {
    //               id: node.id,
    //               biz_cd_executive: node.biz_cd_executive,
    //               biz_cd_fund_distr: node.biz_cd_fund_distr,
    //               business_name: node.business_name,
    //               business_overview:
    //                 node.business_overview.data.business_overview.slice(
    //                   0,
    //                   3000
    //                 ),
    //               topic_keywords: node.topic_keywords
    //                 ? node.topic_keywords.label
    //                 : "",
    //               internal: { contentDigest: node.internal.contentDigest },
    //             };
    //           }),
    //       },
    //     ],
    //     chunkSize: 10000,
    //     settings: {
    //       queryLanguages: ["ja"],
    //     },
    //   },
    // },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "JANPIA disclosure",
        short_name: "JANPIA disclosure",
        start_url: "/",
        background_color: "#0099CA",
        theme_color: "#0099CA",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/favicon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};

export default config;
