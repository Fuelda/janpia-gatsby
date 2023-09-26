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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const filteredAllBizPlan = useFilteredStrapiContext();
  console.log(filteredAllBizPlan);
  return (
    <div>
      <GlobalStyles />
      <Header />
      <main css={wrapper} tw="pt-[82px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
