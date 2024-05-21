import React from "react";
import "twin.macro";
import DetailFooter from "./DetailFooter";

const DetailWrapper: React.FC<{
  children: React.ReactNode;
  category: string;
  slug: string;
  updatedAt?: string;
}> = ({ children, category, slug, updatedAt }) => {
  return (
    <div tw="border w-[80%] border-gray-border mb-[80px] lg:(w-full border-0)">
      <div tw="py-2.5 px-3.5 w-full border-b border-gray-border flex justify-between lg:(border-0 bg-blue-base)">
        <p tw="text-lg font-bold">{category}</p>
        {updatedAt && <p>{updatedAt}更新</p>}
      </div>
      <div tw="py-6 px-3.5">{children}</div>
      <DetailFooter slug={slug} />
    </div>
  );
};

export default DetailWrapper;
