import React, {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type detailType = {
  withORM: boolean;
  setWithORM: Dispatch<boolean>;
  withPreRM: boolean;
  setWithPreRM: Dispatch<boolean>;
  withProRM: boolean;
  setWithProRM: Dispatch<boolean>;
  withMRM: boolean;
  setWithMRM: Dispatch<boolean>;
  withPostRM: boolean;
  setWithPostRM: Dispatch<boolean>;
  withSR: boolean;
  setWithSR: Dispatch<boolean>;
  withCRM: boolean;
  setWithCRM: Dispatch<boolean>;
};

const DetailContext = createContext<detailType>({
  withORM: false,
  setWithORM: () => {},
  withPreRM: false,
  setWithPreRM: () => {},
  withProRM: false,
  setWithProRM: () => {},
  withMRM: false,
  setWithMRM: () => {},
  withPostRM: false,
  setWithPostRM: () => {},
  withSR: false,
  setWithSR: () => {},
  withCRM: false,
  setWithCRM: () => {},
});

const DetailProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [withORM, setWithORM] = useState(false);
  const [withPreRM, setWithPreRM] = useState(false);
  const [withProRM, setWithProRM] = useState(false);
  const [withMRM, setWithMRM] = useState(false);
  const [withPostRM, setWithPostRM] = useState(false);
  const [withSR, setWithSR] = useState(false);
  const [withCRM, setWithCRM] = useState(false);
  const value = {
    withORM,
    setWithORM,
    withPreRM,
    setWithPreRM,
    withProRM,
    setWithProRM,
    withMRM,
    setWithMRM,
    withPostRM,
    setWithPostRM,
    withSR,
    setWithSR,
    withCRM,
    setWithCRM,
  };
  return (
    <DetailContext.Provider value={value}>{children}</DetailContext.Provider>
  );
};

export function useDetailContext() {
  return useContext(DetailContext);
}

export default DetailProvider;
