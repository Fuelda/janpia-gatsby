import React from "react";
import "@fontsource-variable/noto-sans-jp";
import "../../styles/global.css";
import Header from "./Header";
import Footer from "./Footer";
import tw, { GlobalStyles } from "twin.macro";
import "twin.macro";
import { wrapper } from "../../styles/base";
import { useFilteredStrapiContext } from "../../context/filteredStrapiContext";
import ToPageTopButton from "../atoms/ToPageTopButton";
import Modal from "react-modal";
import { useModalContext } from "../../context/modalContext";
import ModalPrefectures from "../../features/search/component/sidebar/modal/ModalPrefectures";
import ModalPrefecturesSp from "../../features/search/component/sidebar/modal/ModalPrefecturesSp";
import { useLocation } from "@reach/router";

Modal.setAppElement("#___gatsby");

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isModalOpen, setIsModalOpen } = useModalContext();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div tw="relative">
      <GlobalStyles />
      <Header path={path} />
      <main
        css={[
          wrapper,
          path === "/result/status/" ? tw`pt-0` : tw`pt-[82px] lg:(pt-[100px])`,
        ]}
      >
        {children}
      </main>
      <Footer path={path} />
      <ToPageTopButton />

      <Modal
        isOpen={isModalOpen === "prefectures" || isModalOpen === "targetArea"}
        onRequestClose={() => setIsModalOpen("")}
        shouldCloseOnEsc={true}
        className="ResultModal"
        overlayClassName="ResultOverlay"
      >
        <ModalPrefectures />
      </Modal>
      <Modal
        isOpen={
          isModalOpen === "prefecturesSp" || isModalOpen === "targetAreaSp"
        }
        onRequestClose={() => setIsModalOpen("")}
        shouldCloseOnEsc={true}
        className="SearchSpModal"
        overlayClassName="ResultOverlay"
      >
        <ModalPrefecturesSp />
      </Modal>
    </div>
  );
};

export default Layout;
