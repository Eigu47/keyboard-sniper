import { useDispatch, useSelector } from "react-redux";
import useInterval from "../../hooks/useInterval";
import {
  loseLife,
  removeWordById,
  setIsFlipped,
  setMissed,
} from "../../store/gameSlice";

function MainCell({ word, id, pause }) {
  const { activeWords, playing, isFlipped } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();

  const delay = 3500;

  useInterval(
    () => {
      dispatch(removeWordById(id));
      dispatch(loseLife());
      dispatch(setMissed());
    },
    pause ? null : playing && word && activeWords[id] === word ? delay : null,
    "timeout"
  );

  useInterval(
    () => {
      dispatch(setIsFlipped({ id, flipped: false }));
    },
    pause ? null : playing && isFlipped[id] ? (!word ? 0 : delay - 200) : null,
    "timeout"
  );

  return (
    <div className="flip-container select-none">
      <div className={`flip-inside ${isFlipped[id] && "flip"}`}>
        <div className="flip-card__front rounded-lg bg-slate-800" />
        <div className="flip-card__back flex items-center rounded-lg bg-slate-600">
          <p className="text-2xl sm:text-5xl xl:text-6xl 2xl:text-7xl text-slate-100 text-center font-mono mx-auto">
            {word}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainCell;
