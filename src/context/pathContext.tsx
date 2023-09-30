// import React, { FC, ReactNode, createContext, useContext } from "react";
// import { useLocation } from "@reach/router";

// type pathType = {
//   path: string;
// };

// const PathContext = createContext<pathType>({
//   path: "",
// });

// const PathProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const location = useLocation();
//   const path = location.pathname;
//   return (
//     <PathContext.Provider value={{ path }}>{children}</PathContext.Provider>
//   );
// };

// export function usePathContext() {
//   return useContext(PathContext);
// }

// export default PathProvider;
