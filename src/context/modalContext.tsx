import React, {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type modalType = {
  isModalOpen: string;
  setIsModalOpen: Dispatch<string>;
};

const ModalContext = createContext<modalType>({
  isModalOpen: "",
  setIsModalOpen: () => {},
});

const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState("");
  const value = { isModalOpen, setIsModalOpen };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export function useModalContext() {
  return useContext(ModalContext);
}

export default ModalProvider;
