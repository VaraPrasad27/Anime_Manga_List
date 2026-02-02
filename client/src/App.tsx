import { Stack } from "@chakra-ui/react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Stack h={"100vh"}>
      <Navbar />
      <Home />
    </Stack>
  );
};

export default App;
