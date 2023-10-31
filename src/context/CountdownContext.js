import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@countdownDuration";

export const CountdownContext = createContext({});

export function CountdownProvider({ children }) {
  // em minutos
  const [countdownDuration, setCountdownDuration] = useState(1);
  const [countdownRunning, setCountdownRunning] = useState(false);
  // em segundos
  const [countdownTimeLeft, setCountdownTimeLeft] = useState(60);

  function saveCountdown() {
    if (countdownDuration) {
      AsyncStorage.setItem(STORAGE_KEY, countdownDuration.toString());
    }
  }

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value) {
        setCountdownDuration(parseInt(value));
      }
    });
  }, []);

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

  useEffect(() => {
    setCountdownTimeLeft(countdownDuration * 60);
  }, [countdownDuration]);

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
        stop,
        toggle,
        countdownRunning,
        countdownTimeLeft,
        countdownDuration,
        setCountdownDuration,
        saveCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}

export function useCountdown() {
  return useContext(CountdownContext);
}
