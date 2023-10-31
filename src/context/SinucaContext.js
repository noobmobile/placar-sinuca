import { createContext, useContext, useEffect, useState } from "react";
import { useCountdown } from "./CountdownContext";

export const SinucaContext = createContext({});

export function SinucaProvider({ children }) {
  const [selectedBall, setSelectedBall] = useState(null);
  const [players, setPlayers] = useState([{ name: "Joao" }, { name: "Maria" }]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [finishModal, setFinishModal] = useState(false);
  const { stop, countdownRunning, countdownTimeLeft } = useCountdown();

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
    setUndoHistory([]);
  }

  useEffect(() => {
    if (countdownRunning) {
      if (countdownTimeLeft <= 0) {
        finish();
      }
    }
  }, [countdownRunning, countdownTimeLeft]);

  useEffect(() => {
    const balls = players
      .flatMap((player) => player.balls)
      .filter((b) => !!b).length;
    if (balls === 15) finish();
  }, [players]);

  function finish() {
    const winner = players
      .map((p) => ({
        ...p,
        total: p.balls?.reduce((acc, ball) => acc + ball, 0) || 0,
      }))
      .reduce((acc, player) => {
        if (player.total > acc.total) return player;
        return acc;
      });
    stop();
    setFinishModal(winner);
    setUndoHistory([]);
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
