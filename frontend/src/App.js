import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import { useState } from "react";

const UNSPLASH_KEY = REACT_APP_UNSPLASH_ACCESS_KEY;
const UNSPLASH_SECRET = process.env.REACT_APP_UNSPLASH_SECRET;

const App = () => {
  const [word, setWord] = useState("");

  const handleSearchSubmit = (e) => {
    console.log(word);
    e.preventDefault();
  };

  console.log(`word is now: ${word}`);
  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} queryEvent={handleSearchSubmit} />
    </div>
  );
};

export default App;
