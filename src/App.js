import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { resetStore } from "./store/gameSlice";

import Navbar from "./components/Navbar";
import About from "./Pages/About/About";
import HowToPlay from "./Pages/HowToPlay";
import Main from "./Pages/Main/Main";
import Menu from "./Pages/Menu/Menu";
import Ranking from "./Pages/Ranking";
import Record from "./Pages/Record";

function App() {
  const { playing } = useSelector((state) => state.game);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/") dispatch(resetStore());
  }, [location, dispatch]);

  return (
    <div className="h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={playing ? <Main /> : <Menu />}>
          <Route path="/record" element={<Record />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/howtoplay" element={<HowToPlay />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
