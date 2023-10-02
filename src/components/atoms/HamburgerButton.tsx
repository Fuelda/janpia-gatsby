import React, { Dispatch } from "react";
import "twin.macro";
import tw from "twin.macro";

const hamItem = tw`absolute w-full h-0.5 bg-gray-black transform transition-all duration-300`;

const HamburgerButton = (props: {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
}) => {
  const { isOpen, setIsOpen } = props;
  console.log(isOpen);
  return (
    <div
      tw="relative w-5 h-4 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        tw="top-0"
        css={[hamItem, isOpen ? tw`rotate-45 translate-y-1.5` : tw``]}
      />
      <div
        tw="top-1/2 transform -translate-y-1/2"
        css={[hamItem, isOpen ? tw`opacity-0` : tw``]}
      />
      <div
        tw="bottom-0"
        css={[hamItem, isOpen ? tw`-rotate-45 -translate-y-2` : tw``]}
      />
    </div>
  );
};

export default HamburgerButton;
