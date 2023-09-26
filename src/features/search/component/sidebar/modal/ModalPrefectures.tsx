import React from "react";
import "twin.macro";
import Prefectures from "../../main/Organization/Prefectures";
import { useModalContext } from "../../../../../context/modalContext";
import TargetArea from "../../main/Business/TargetArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalPrefectures = () => {
  const { isModalOpen, setIsModalOpen } = useModalContext();

  return (
    <div tw="relative">
      <p tw="text-xl font-bold text-center mb-6">
        団体所在地を選択してください。
      </p>
      {isModalOpen === "prefectures" ? <Prefectures /> : <TargetArea />}
      <button
        onClick={() => setIsModalOpen("")}
        tw="w-4 h-4 absolute top-0 right-0"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default ModalPrefectures;
