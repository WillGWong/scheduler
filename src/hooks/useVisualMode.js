import React, { useState, useEffect } from "react";


export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);


  const transition = function (newMode, replaceLastValueInHistory = false) {
    if (replaceLastValueInHistory) {
      setHistory(prev => ([...prev.slice(0, prev.length - 1), newMode]));
    } else {
      setHistory(prev => ([...prev, newMode]));
    }
    setMode(newMode);
  }

  const back = function () {
    const newMode = history[history.length - 2];
    setHistory(prev => {
      return prev.slice(0, prev.length - 1);
    });
    setMode(newMode);
  }



  return {mode, transition, back}
}