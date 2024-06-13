import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import "twin.macro";
import { hCenter } from "../../styles/base";
import tw from "twin.macro";
import { useLocation } from "@reach/router";
import HamburgerButton from "../atoms/HamburgerButton";
import { detailPageLinkType } from "../lauout/DetailWrapper";

const detailSidebarBlock = tw`block py-3 px-6 w-full relative`;
const currentSidebar = tw` text-blue-button font-bold before:(w-1.5 h-4/5 bg-blue-button absolute left-0 top-1/2 transform -translate-y-1/2)`;

const DetailSelector = ({
  detailPageLink,
}: {
  detailPageLink: detailPageLinkType[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path.includes("organization")) {
      setCurrentCategory("団体情報");
    } else if (path.includes("selected-project")) {
      setCurrentCategory("公募結果報告");
    } else if (path.includes("project-plan")) {
      setCurrentCategory("事業計画");
    } else if (path.includes("evaluation-plan")) {
      setCurrentCategory("評価計画");
    } else if (path.includes("financial-plan")) {
      setCurrentCategory("資金計画");
    } else if (path.includes("exante-evaluation-report")) {
      setCurrentCategory("事前評価報告");
    } else if (path.includes("interim-report")) {
      setCurrentCategory("中間評価報告");
    } else if (path.includes("expost-evaluation-report")) {
      setCurrentCategory("事後評価報告");
    } else if (path.includes("progress-report")) {
      setCurrentCategory("進捗/年度末報告");
    } else if (path.includes("completion-report")) {
      setCurrentCategory("事業完了報告");
    } else if (path.includes("financial-report")) {
      setCurrentCategory("事業完了時精算報告");
    } else {
      setCurrentCategory("事業詳細");
    }
  }, [path]);

  return (
    <div tw="hidden lg:(block w-full px-2.5 mt-3.5 )">
      <div tw="relative">
        <button
          tw="w-full px-2 py-2.5  text-start border justify-between"
          css={[
            hCenter,
            isOpen
              ? tw`rounded-t-[8px]  border-t-gray-border border-x-gray-border border-b-gray-pale`
              : tw`border-gray-border rounded-[8px]`,
          ]}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>{currentCategory}</p>
          <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </button>
        <div
          tw="w-full px-2.5  absolute z-30 bg-white rounded-b-[8px] shadow transform transition-all duration-1000  overflow-hidden"
          css={
            isOpen
              ? tw`h-auto border border-t-gray-pale border-x-gray-border border-b-gray-border `
              : tw`h-0 `
          }
        >
          {detailPageLink &&
            detailPageLink.map((link) => (
              <Link
                css={[detailSidebarBlock, path === link.path && currentSidebar]}
                to={link.path}
              >
                {link.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailSelector;
