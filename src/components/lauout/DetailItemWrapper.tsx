import React from "react";
import "twin.macro";

const DetailItemWrapper: React.FC<{
  children: React.ReactNode;
  itemName: string;
}> = ({ children, itemName }) => {
  return (
    <div>
      <p tw="font-bold">{itemName}</p>
      <div tw="mt-4">{children}</div>
    </div>
  );
};

export default DetailItemWrapper;
