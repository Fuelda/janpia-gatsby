import React, {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type algoliaHitType = {
  code: string;
  type: string;
};

type AlgoliaStrapiType = {
  withQuery: boolean;
  setWithQuery: Dispatch<boolean>;
  algoliaHits: algoliaHitType[];
  setAlgoliaHits: Dispatch<algoliaHitType[]>;
};

const AlgoliaStrapiContext = createContext<AlgoliaStrapiType>({
  withQuery: false,
  setWithQuery: () => {},
  algoliaHits: [{ code: "", type: "" }],
  setAlgoliaHits: () => {},
});

const AlgoliaStrapiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [withQuery, setWithQuery] = useState(false);
  const [algoliaHits, setAlgoliaHits] = useState([{ code: "", type: "" }]);
  const value = { withQuery, setWithQuery, algoliaHits, setAlgoliaHits };
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
