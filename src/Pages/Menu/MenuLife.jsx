import { useRef, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import useInterval from "../../hooks/useInterval";

function Life() {
  const { mode } = useSelector((state) => state.game);
  const [display, setDisplay] = useState([]);
  const lifeRef = useRef([]);
  const displayIndex = useRef(0);

  if (mode === "easy") lifeRef.current = ["FaHeart", "x", 3];
  if (mode === "normal") lifeRef.current = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
  if (mode === "hard") lifeRef.current = [1, 1, 1];

  useInterval(
    () => {
      setDisplay([...display, lifeRef.current[displayIndex.current]]);
      displayIndex.current++;
    },
    displayIndex.current < lifeRef.current.length
      ? mode === "normal"
        ? 45
        : 160
      : null
  );

  return (
    <div className="absolute flex -top-8 left-1 text-xl gap-1 text-slate-100">
      {mode !== "easy" &&
        display.map((life, i) => {
          if (life) {
            return <FaHeart key={i} />;
          } else return <FaRegHeart key={i} />;
        })}
      {mode === "easy" &&
        display.map((life, i) => {
          if (life === "FaHeart") return <FaHeart key={i} />;
          return (
            <p
              className={`relative -top-1 text-2xl text-slate-100 font-mono ${
                life === "x" ? "left-3" : "left-[21px]"
              }`}
              key={i}
            >
              {life}
            </p>
          );
        })}
    </div>
  );
}

export default Life;
