import { createContext, useContext, useState } from "react";

export const SinucaContext = createContext({});

export function SinucaProvider({ children }) {
  const [selectedBall, setSelectedBall] = useState(null);
  const [players, setPlayers] = useState([{ name: "Joao" }, { name: "Maria" }]);
  const [undoHistory, setUndoHistory] = useState([]);

  function addToUndo(ball) {
    setUndoHistory([...undoHistory, ball]);
  }

  function undo() {
    const lastBall = undoHistory.pop();
    players.forEach((player) => {
      if (player.balls)
        player.balls = player.balls.filter((ball) => ball !== lastBall);
    });
    setPlayers([...players]);
    setUndoHistory([...undoHistory]);
  }

  function addBallToPlayer(player, ball) {
    player.balls = player.balls || [];
    player.balls.push(ball);
    addToUndo(ball);
    setPlayers([...players]);
  }

  return (
    <SinucaContext.Provider
      value={{
        selectedBall,
        setSelectedBall,
        players,
        setPlayers,
        undo,
        addBallToPlayer,
      }}
    >
      {children}
    </SinucaContext.Provider>
  );
}

export function useSinuca() {
  return useContext(SinucaContext);
}
