import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./pages/Home";

import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";
import Favorite from "./pages/Favorite";
import MovieDetail from "./pages/MoveiDetail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getSessionId = async () => {
      Cookies.get("session_id") && setIsLoggedIn(true);
    };
    getSessionId();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />

        {isLoggedIn ? (
          <>
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/favorites" element={<Favorite />} />
          </>
        ) : null}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
