import React from "react";
import "twin.macro";

const DetailWrapper: React.FC<{
  children: React.ReactNode;
  category: string;
}> = ({ children, category }) => {
  return (
    <div tw="border w-[80%] border-gray-border">
      <p tw="py-2.5 px-3.5 text-lg font-bold w-full border-b border-gray-border">
        {category}
      </p>
      <div tw="py-6 px-3.5">{children}</div>
    </div>
  );
};

export default DetailWrapper;
