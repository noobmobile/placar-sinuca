import { createContext, useContext, useEffect, useState } from "react";

export const CountdownContext = createContext({});

export function CountdownProvider({ children }) {
  // em minutos
  const [countdownDuration, setCountdownDuration] = useState(1);
  const [countdownRunning, setCountdownRunning] = useState(false);
  // em segundos
  const [countdownTimeLeft, setCountdownTimeLeft] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdownRunning) {
        setCountdownTimeLeft((countdownTimeLeft) => countdownTimeLeft - 1);
        if (countdownTimeLeft <= 0) {
          stop();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countdownRunning, countdownTimeLeft]);

  function stop() {
    setCountdownRunning(false);
    setCountdownTimeLeft(countdownDuration * 60);
  }

  function toggle() {
    setCountdownRunning((b) => !b);
  }

  return (
    <CountdownContext.Provider
      value={{
        toggle,
        countdownRunning,
        countdownTimeLeft,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}

export function useCountdown() {
  return useContext(CountdownContext);
}
