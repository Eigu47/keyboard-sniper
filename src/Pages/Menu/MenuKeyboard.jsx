import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useInterval from "../../hooks/useInterval";

function MenuKeyboard({ letters }) {
  const { mode } = useSelector((state) => state.game);
  const [display, setDisplay] = useState("");
  const [clear, setClear] = useState(false);
  const displayIndex = useRef(-1);

  useEffect(() => {
    displayIndex.current = -1;
    setClear(true);
  }, [letters, mode]);

  useInterval(
    () => {
      setDisplay((prev) => prev + letters[displayIndex.current]);
      displayIndex.current++;
    },
    letters.length &&
      displayIndex.current < letters.length - 1 &&
      !clear &&
      !mode
      ? 40
      : null
  );

  useInterval(
    () => {
      setDisplay((prev) => prev.slice(0, -1));
      if (display.length === 0) setClear(false);
    },
    clear ? 30 : mode ? 60 : null
  );

  return (
    <h3 className="text-center text-4xl md:text-6xl lg:text-8xl font-serif flex-1 text-slate-100 my-4 md:my-16">
      {display}
      <span className="animate-key">_</span>
    </h3>
  );
}

export default MenuKeyboard;
