import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import useInterval from "../../hooks/useInterval";
import GameOver from "./GameOver";
import Keyboard from "./Keyboard";
import Life from "./Life";
import Score from "./Score";
import WordsGrid from "./WordsGrid";

function Main() {
  const { life, mode } = useSelector((state) => state.game);
  const [modal, setModal] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (life < 0) {
      setPause(true);
    }
  }, [life]);

  useInterval(
    () => {
      setModal(true);
    },
    pause ? 700 : null,
    "timeout"
  );

  useInterval(
    () => {
      setFlipped((prev) => !prev);
    },
    modal ? 50 : null,
    "timeout"
  );

  return (
    <>
      <main className="relative container mx-auto md:mt-20 mt-10 bg-slate-300 basis-3/4 min-h-[18rem] md:min-h-[25rem] 2xl:min-h-[30rem] rounded-xl">
        <Life />
        <Score />
        <WordsGrid pause={pause} />
        {modal && (
          <Modal>
            <GameOver mode={mode} flipped={flipped} setFlipped={setFlipped} />
          </Modal>
        )}
      </main>
      <Keyboard pause={pause} />
    </>
  );
}

export default Main;
