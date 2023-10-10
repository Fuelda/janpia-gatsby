import React, {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type consortiumType = {
  currentGroupCd: string;
  setCurrentGroupCd: Dispatch<string>;
};

const ConsortiumContext = createContext<consortiumType>({
  currentGroupCd: "",
  setCurrentGroupCd: () => {},
});

const ConsortiumProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentGroupCd, setCurrentGroupCd] = useState("");
  const value = { currentGroupCd, setCurrentGroupCd };
  return (
    <ConsortiumContext.Provider value={value}>
      {children}
    </ConsortiumContext.Provider>
  );
};

export function useConsortiumContext() {
  return useContext(ConsortiumContext);
}

export default ConsortiumProvider;
