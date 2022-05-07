import { useSelector } from "react-redux";

function Score() {
  const { score } = useSelector((state) => state.game);

  return (
    <>
      <p className="absolute -top-10 right-5 text-3xl gap-1 text-slate-100 font-mono">
        {score}
      </p>
    </>
  );
}

export default Score;
