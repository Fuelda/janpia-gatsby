import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "twin.macro";
import React from "react";

const AttachedFileLink = (props: { filePath: string; fileName: string }) => {
  return (
    <a href={props.filePath} tw="flex gap-2 border rounded-[3px]">
      <p tw="text-sm w-28 truncate">{props.fileName}</p>
      <FontAwesomeIcon icon={faFilePdf} tw="text-blue-font" />
    </a>
  );
};

export default AttachedFileLink;
