import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "twin.macro";

const ToPageTopButton = () => {
  const [isShown, setIsShown] = useState(false);
  const pageOffset = 200;
  const changeShow = () => {
    setIsShown(window.pageYOffset > pageOffset);
  };
  const moveToPageTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    window.addEventListener("scroll", changeShow);
    return () => window.removeEventListener("scroll", changeShow);
  }, []);
  return (
    isShown && (
      <button
        tw="w-10 h-10 bg-blue-button bg-opacity-30 fixed right-2.5 bottom-2.5 z-30"
        onClick={moveToPageTop}
      >
        <FontAwesomeIcon icon={faAngleUp} tw="text-white" />
      </button>
    )
  );
};

export default ToPageTopButton;
