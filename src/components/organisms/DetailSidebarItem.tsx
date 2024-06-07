import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import "twin.macro";
import tw from "twin.macro";
import { useLocation } from "@reach/router";

const currentSidebar = tw`bg-blue-button border-blue-button text-white`;

const strapiApiURL = process.env.STRAPI_API_URL;
const judgeFieldExistance = async ({
  slug,
  endpoint,
}: {
  slug: string;
  endpoint: string;
}) => {
  try {
    const queries = [
      `filters[business_cd][$eq]=${slug}`,
      `filters[$and][0][biz_cd_fund_distr][$eq]=${slug}&filters[$and][1][business_org_type][$eq]=F`,
      `filters[$and][0][biz_cd_executive][$eq]=${slug}&filters[$and][1][business_org_type][$eq]=A`,
    ];
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

const judgeSlugEntryExistInCollectionTypes = async ({
  slug,
  collectionTypeArray,
}: {
  slug: string;
  collectionTypeArray: string[];
}) => {
  const collectionTypeExistancesArray = await Promise.all(
    collectionTypeArray.map(async (collectionType) => {
      const existance = await judgeFieldExistance({
        slug: slug,
        endpoint: collectionType,
      });
      return existance;
    })
  );
  return collectionTypeExistancesArray.some((value) => value === true);
};

export const DetailSidebarItem = ({
  slug,
  collectionTypes,
  title,
  targetPath,
}: {
  slug: string;
  collectionTypes: string[];
  title: string;
  targetPath: string;
}) => {
  const location = useLocation();
  const path = location.pathname;
  const [withField, setWithField] = useState(false);

  useEffect(() => {
    const unsub = async () => {
      const someCollectionTypeExistance =
        await judgeSlugEntryExistInCollectionTypes({
          slug: slug,
          collectionTypeArray: collectionTypes,
        });
      setWithField(someCollectionTypeExistance);
    };
    unsub();
  }, []);

  return (
    <>
      {withField && (
        <Link
          tw="block border border-gray-border py-3 px-3.5 w-full font-bold"
          css={path === `/result/${slug}/${targetPath}/` && currentSidebar}
          to={`/result/${slug}/${targetPath}`}
        >
          {title}
        </Link>
      )}
    </>
  );
};
