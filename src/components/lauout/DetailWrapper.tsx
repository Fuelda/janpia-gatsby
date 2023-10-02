import React from "react";
import "twin.macro";
import DetailFooter from "./DetailFooter";

const DetailWrapper: React.FC<{
  children: React.ReactNode;
  category: string;
  slug: string;
}> = ({ children, category, slug }) => {
  return (
    <div tw="border w-[80%] border-gray-border lg:(w-full border-0)">
      <p tw="py-2.5 px-3.5 text-lg font-bold w-full border-b border-gray-border lg:(border-0 bg-blue-base)">
        {category}
      </p>
      <div tw="py-6 px-3.5">{children}</div>
      <DetailFooter slug={slug} />
    </div>
  );
};

export default DetailWrapper;
