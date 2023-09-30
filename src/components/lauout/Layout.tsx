import React from "react";
// import "@fontsource/noto-sans-jp";
import "@fontsource-variable/noto-sans-jp";
import "../../styles/global.css";
import Header from "./Header";
import Footer from "./Footer";
import { GlobalStyles } from "twin.macro";
import "twin.macro";
import { wrapper } from "../../styles/base";
import { useFilteredStrapiContext } from "../../context/filteredStrapiContext";
import ToPageTopButton from "../atoms/ToPageTopButton";
import Modal from "react-modal";
import { useModalContext } from "../../context/modalContext";
import ModalPrefectures from "../../features/search/component/sidebar/modal/ModalPrefectures";

Modal.setAppElement("#___gatsby");

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const filteredAllBizPlan = useFilteredStrapiContext();
  const { isModalOpen, setIsModalOpen } = useModalContext();
  console.log(filteredAllBizPlan);
  return (
    <div tw="relative">
      <GlobalStyles />
      <Header />
      <main css={wrapper} tw="pt-[82px] lg:(pt-[100px])">
        {children}
      </main>
      <Footer />
      <ToPageTopButton />

      <Modal
        isOpen={isModalOpen !== ""}
        onRequestClose={() => setIsModalOpen("")}
        shouldCloseOnEsc={true}
        className="ResultModal"
        overlayClassName="ResultOverlay"
      >
        <ModalPrefectures />
      </Modal>
    </div>
  );
};

export default Layout;
