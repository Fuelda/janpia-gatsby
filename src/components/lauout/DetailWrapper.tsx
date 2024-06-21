import React, { useEffect, useState } from "react";
import "twin.macro";
import DetailFooter from "./DetailFooter";
import DetailSidebar from "../organisms/DetailSidebar";
import DetailSelector from "../organisms/DetailSelector";
import { CircularProgress } from "@mui/material";

export type detailPageLinkType = {
  title: string;
  path: string;
  collectionTypes?: string[];
};

const DetailWrapper: React.FC<{
  children: React.ReactNode;
  category: string;
  slug: string;
  updatedAt?: string;
}> = ({ children, category, slug, updatedAt }) => {
  const [detailPageLink, setDetailPageLink] = useState<detailPageLinkType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const strapiApiURL = process.env.STRAPI_API_URL;

  const detailPageCategoryInfo = [
    { title: "事業詳細", path: `/result/${slug}/` },
    { title: "団体情報", path: `/result/${slug}/organization/` },
    {
      title: "公募結果報告",
      path: `/result/${slug}/selected-project/`,
      collectionTypes: ["offering-reports", "offering-report-manuals"],
    },
    { title: "事業計画", path: `/result/${slug}/project-plan/` },
    {
      title: "評価計画",
      path: `/result/${slug}/evaluation-plan/`,
      collectionTypes: ["evaluation-plans", "evaluation-plan-manuals"],
    },
    {
      title: "資金計画",
      path: `/result/${slug}/financial-plan/`,
      collectionTypes: [
        "finance-plans",
        "finance-plan-formers",
        "finance-plan-manuals",
      ],
    },
    {
      title: "事前評価報告",
      path: `/result/${slug}/exante-evaluation-report/`,
      collectionTypes: ["pre-report-manuals"],
    },
    {
      title: "中間評価報告",
      path: `/result/${slug}/interim-report/`,
      collectionTypes: ["mid-reports", "mid-report-manuals"],
    },
    {
      title: "事後評価報告",
      path: `/result/${slug}/expost-evaluation-report/`,
      collectionTypes: ["post-report-manuals"],
    },
    {
      title: "進捗/年度末報告",
      path: `/result/${slug}/progress-report/`,
      collectionTypes: ["progress-reports", "progress-report-manuals"],
    },
    {
      title: "事業完了報告",
      path: `/result/${slug}/completion-report/`,
      collectionTypes: ["complete-reports", "complete-report-manuals"],
    },
    {
      title: "事業完了時精算報告",
      path: `/result/${slug}/financial-report/`,
      collectionTypes: ["settle-reports", "settle-report-manuals"],
    },
  ];

  const checkEntryExistance = async (endpoint: string) => {
    const queries = [
      `filters[business_cd][$eq]=${slug}`,
      `filters[$and][0][biz_cd_fund_distr][$eq]=${slug}&filters[$and][1][business_org_type][$eq]=F`,
      `filters[$and][0][biz_cd_executive][$eq]=${slug}&filters[$and][1][business_org_type][$eq]=A`,
    ];
    try {
      const responses = await Promise.all(
        queries.map(async (query) => {
          try {
            const response = await fetch(
              `${strapiApiURL}api/${endpoint}?fields[0]=id&${query}`
            );
            if (response.ok) {
              return response.json();
            } else {
              return null;
            }
          } catch (err) {
            return null;
          }
        })
      );

      return responses.some((d) => d && d.data.length > 0);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const filterCategoryWithEntryExistance = async () => {
    const filteredArray = [];

    for (const category of detailPageCategoryInfo) {
      if (!category.collectionTypes) {
        filteredArray.push(category);
        continue;
      }

      const entryExistance = await Promise.all(
        category.collectionTypes.map(async (collectionType) => {
          const existance = await checkEntryExistance(collectionType);
          return existance;
        })
      );

      if (entryExistance.some((value) => value === true)) {
        filteredArray.push(category);
      }
    }

    return filteredArray;
  };

  useEffect(() => {
    const unsub = async () => {
      setIsLoading(true);
      const entryExistCollectionType = await filterCategoryWithEntryExistance();
      setDetailPageLink(entryExistCollectionType);
      setIsLoading(false);
    };
    unsub();
  }, []);

  return (
    <div tw="flex gap-[5px] mt-6 relative lg:(block mt-3.5)">
      <DetailSelector detailPageLink={detailPageLink} isLoading={isLoading} />
      {isLoading ? (
        <div tw="w-[205px] flex justify-center mt-8 text-blue-button lg:(hidden)">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <DetailSidebar detailPageLink={detailPageLink} />
      )}
      <div tw="border w-[80%] border-gray-border mb-[80px] lg:(w-full border-0 mt-6)">
        <div tw="py-2.5 px-3.5 w-full border-b border-gray-border flex justify-between lg:(border-0 bg-blue-base)">
          <p tw="text-lg font-bold">{category}</p>
          {updatedAt && <p>{updatedAt}更新</p>}
        </div>
        <div tw="py-6 px-3.5">{children}</div>
        {isLoading ? (
          <div tw="w-full justify-center mt-8 text-blue-button hidden lg:(flex)">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <DetailFooter detailPageLink={detailPageLink} />
        )}
      </div>
    </div>
  );
};

export default DetailWrapper;
