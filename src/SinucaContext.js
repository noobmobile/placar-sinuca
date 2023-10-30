import { createContext, useContext, useState } from "react";

export const SinucaContext = createContext({});

export function SinucaProvider({ children }) {
  const [selectedBall, setSelectedBall] = useState(null);
  const [players, setPlayers] = useState([{ name: "Joao" }, { name: "Maria" }]);
  return (
    <SinucaContext.Provider
      value={{
        selectedBall,
        setSelectedBall,
        players,
        setPlayers,
      }}
    >
      {children}
    </SinucaContext.Provider>
  );
}

export function useSinuca() {
  return useContext(SinucaContext);
}
