import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeDetails from "./components/AnimeDetails";
import { useState } from "react";
import MangaDetails from "./components/MangaDetails";

const App = () => {
  const [queryFor, setQueryFor] = useState("anime");
  const [value, setValue] = useState("");
  const [rankingType, setRankingType] = useState("all");
  const [offset, setOffset] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <Navbar
        setQueryFor={setQueryFor}
        setValue={setValue}
        value={value}
        setRankingType={setRankingType}
        setOffset={setOffset}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                queryFor={queryFor}
                value={value}
                setValue={setValue}
                rankingType={rankingType}
                setRankingType={setRankingType}
                offset={offset}
                setOffset={setOffset}
              />
            }
          />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="/manga/:id" element={<MangaDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
