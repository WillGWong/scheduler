import React, { useState, useEffect } from "react";


export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);


  const transition = function (newMode, replace = false) {
    if (replace) {history.pop()}
    history.push(mode);
    setMode(newMode);
  }

  const back = function () {
    setMode(history.pop())
  }



  return {mode, transition, back}
}