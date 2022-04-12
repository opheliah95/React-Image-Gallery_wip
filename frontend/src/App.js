import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import { useState } from "react";


const App = () => {
  const[word, setWord] = useState('');

  const handleSearchSubmit = (e) => {
    console.log(word);
    e.preventDefault();
  };
  console.log(`word is now: ${word}`)
  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} queryEvent={handleSearchSubmit}/>
    </div>
  );
};

export default App;
