import { useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

function Life() {
  const { life, mode } = useSelector((state) => state.game);
  const lifeRef = useRef([]);

  if (mode === "normal") lifeRef.current = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  if (mode === "hard") lifeRef.current = [1, 2, 3];

  return (
    <>
      <div className="absolute flex -top-8 left-1 text-xl gap-1 text-slate-100">
        {mode !== "easy" &&
          lifeRef.current.map((i) => {
            if (i <= life) {
              return <FaHeart key={i} />;
            } else return <FaRegHeart key={i} />;
          })}
        {mode === "easy" && <FaHeart />}
        {mode === "easy" && (
          <p className="relative -top-1 left-3 text-2xl text-slate-100 font-mono">
            x {life < 0 ? 0 : life}
          </p>
        )}
      </div>
    </>
  );
}

export default Life;
