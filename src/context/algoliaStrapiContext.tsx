import React, {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type algoliaHitType = {
  code: string;
  type: string;
};

type AlgoliaStrapiType = {
  algoliaHits: algoliaHitType[];
  setAlgoliaHits: Dispatch<algoliaHitType[]>;
};

const AlgoliaStrapiContext = createContext<AlgoliaStrapiType>({
  algoliaHits: [{ code: "", type: "" }],
  setAlgoliaHits: () => {},
});

const AlgoliaStrapiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [algoliaHits, setAlgoliaHits] = useState([{ code: "", type: "" }]);
  const value = { algoliaHits, setAlgoliaHits };

  return (
    <AlgoliaStrapiContext.Provider value={value}>
      {children}
    </AlgoliaStrapiContext.Provider>
  );
};

export function useAlgoliaStrapiContext() {
  return useContext(AlgoliaStrapiContext);
}

export default AlgoliaStrapiProvider;
