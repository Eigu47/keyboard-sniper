import { useEffect, useMemo, useState } from "react";

function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);

  const [breakpoint, setBreakpoint] = useState("");

  const breakpoints = useMemo(
    () => [
      { id: "xs", w: 0 },
      { id: "sm", w: 640 },
      { id: "md", w: 768 },
      { id: "lg", w: 1024 },
      { id: "xl", w: 1280 },
      { id: "2xl", w: 1536 },
    ],
    []
  );

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    const breakpointId = breakpoints.reduce((max, bk) => {
      if (bk.w <= width) return bk.id;
      return max;
    }, breakpoints[0].id);

    setBreakpoint(breakpointId);

    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
  }, [width, breakpoints]);

  function checkWidth(id) {
    const breakpoint = breakpoints.find((bk) => bk.id === id);
    return breakpoint.w <= width;
  }

  return { width, breakpoint, checkWidth };
}

export default useBreakpoint;
