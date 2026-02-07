import { Stack } from "@chakra-ui/react";
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

  return (
    <Stack h={"100vh"}>
      <Navbar
        setQueryFor={setQueryFor}
        setValue={setValue}
        value={value}
        setRankingType={setRankingType}
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
              />
            }
          />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="/manga/:id" element={<MangaDetails />} />
        </Routes>
      </BrowserRouter>
    </Stack>
  );
};

export default App;
