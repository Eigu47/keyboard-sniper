function Cell({
  menu,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
  isFlipped,
  lngFlip,
  language,
}) {
  const { front, back, id, name, letters } = menu;
  const { id: flipId, flipAll } = isFlipped;

  const blank = "!bg-slate-800 !text-transparent";

  const onFlip =
    (!flipAll && flipId === id) || (flipAll === true && flipId !== id)
      ? "flip"
      : "";
  const front__flip = flipAll && flipId === id ? blank : "";
  const back__flip = flipAll && flipId !== id ? blank : "";

  const noAnim = flipAll === "noAnim" ? "noAnim" : "";

  return (
    <div
      className="flip-container select-none cursor-pointer"
      onMouseEnter={() => handleMouseEnter(id, letters)}
      onMouseLeave={() => handleMouseLeave(id)}
      onClick={() => handleClick(id, name)}
    >
      <div
        className={`flip-inside text-2xl sm:text-5xl xl:text-6xl 2xl:text-7xl text-slate-100 text-center font-mono ${onFlip} ${noAnim}`}
      >
        <div
          className={`flip-card__front flex items-center rounded-lg bg-slate-800 ${front__flip} ${
            id === 2 && "flex-col justify-center"
          }`}
        >
          {id === 2 && (
            <p className="mx-auto text-xl sm:text-4xl xl:text-6xl 2xl:text-7xl">
              {language.toUpperCase()}
            </p>
          )}
          <p className="mx-auto">{front}</p>
        </div>
        <div
          className={`flip-card__back flex items-center rounded-lg bg-slate-600 ${back__flip}`}
        >
          <p className="mx-auto">{back}</p>
        </div>
      </div>
    </div>
  );
}

export default Cell;
