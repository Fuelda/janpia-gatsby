import React, { useState } from "react";
import "twin.macro";
import { hCenter } from "../../styles/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import tw from "twin.macro";

export const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div tw="py-6 border-b border-gray-300 pl-3.5 pr-10 space-y-4 lg:px-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        css={hCenter}
        tw="justify-between w-full lg:(gap-8)"
      >
        <div tw="gap-4 flex items-start">
          <p
            tw="bg-blue-button rounded-full w-9 h-9 text-white font-bold text-lg text-center shrink-0
          lg:(w-7 h-7 text-base)"
          >
            Q
          </p>
          <p tw="text-start lg:text-sm">{question}</p>
        </div>
        <FontAwesomeIcon
          icon={faAngleDown}
          css={isOpen && tw`rotate-180`}
          tw="transition-transform"
        />
      </button>
      <div css={!isOpen && tw`hidden`}>
        <div tw="gap-4 flex items-start">
          <p
            tw="bg-white border-blue-button border rounded-full w-9 h-9 text-blue-button font-bold text-lg text-center shrink-0
          lg:(w-7 h-7 text-base)"
          >
            A
          </p>
          <p tw="whitespace-pre-wrap lg:text-sm">{answer}</p>
        </div>
      </div>
    </div>
  );
};
