import React from "react";
import { useModalContext } from "../../../../../context/modalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import "twin.macro";
import { hCenter } from "../../../../../styles/base";
import PrefecturesSpCard from "../../main/Organization/PrefecturesSpCard";
import TargetAreaSpCard from "../../main/Business/TargetAreaSpCard";

const ModalPrefecturesSp = () => {
  const { isModalOpen, setIsModalOpen } = useModalContext();
  return (
    <div tw="relative">
      <div
        css={hCenter}
        tw="w-screen fixed z-30 top-0 left-0 bg-white px-2.5 py-6 justify-between"
      >
        <div css={hCenter} tw="gap-5">
          <button tw="text-gray-black" onClick={() => setIsModalOpen("")}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <p>
            {isModalOpen === "prefecturesSp" ? "団体所在地" : "事業対象地域"}
            を選択してください。
          </p>
        </div>
        <button tw="text-gray-black" onClick={() => setIsModalOpen("")}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div>
        {(isModalOpen === "prefecturesSp" && <PrefecturesSpCard />) ||
          (isModalOpen === "targetAreaSp" && <TargetAreaSpCard />)}
      </div>
    </div>
  );
};

export default ModalPrefecturesSp;
