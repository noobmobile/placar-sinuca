import { createContext, useContext, useEffect, useState } from "react";

export const SinucaContext = createContext({});

export function SinucaProvider({ children }) {
  const [selectedBall, setSelectedBall] = useState(null);
  const [players, setPlayers] = useState([{ name: "Joao" }, { name: "Maria" }]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [finishModal, setFinishModal] = useState(false);

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

  function resetScore() {
    setPlayers((players) =>
      players.map((player) => ({ ...player, balls: [] }))
    );
  }

  useEffect(() => {
    const balls = players.flatMap((player) => player.balls).length;
    console.log(balls);
    if (balls === 15) finish();
  }, [players]);

  function finish() {
    const winner = players.reduce((prev, current) => {
      if (current.balls?.length > prev.balls?.length) return current;
      return prev;
    });
    setFinishModal(winner);
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
        resetScore,
        finishModal,
        setFinishModal,
        finish,
      }}
    >
      {children}
    </SinucaContext.Provider>
  );
}

export function useSinuca() {
  return useContext(SinucaContext);
}
