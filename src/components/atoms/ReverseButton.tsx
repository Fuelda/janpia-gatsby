import { Link } from "gatsby";
import React from "react";
import "twin.macro";

const ReverseButton = (props: { path: string; label: string }) => {
  return (
    <Link
      to={props.path}
      tw="w-[280px] text-center py-3 border border-blue-button rounded text-blue-button"
    >
      {props.label}に戻る
    </Link>
  );
};

export default ReverseButton;
