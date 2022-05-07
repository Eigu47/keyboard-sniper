import { useEffect, useRef } from "react";

function useInterval(callback, delay, type = "interval") {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      if (type === "timeout") {
        let id = setTimeout(tick, delay);
        return () => clearTimeout(id);
      } else {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }
  }, [delay, type]);
}

export default useInterval;
