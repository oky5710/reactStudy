import React, {useState} from "react";
import TwitWrite from "./TwitWrite";
import TwitList from "./TwitList";

function App() {
  const [twits, setTwits] = useState([]); // 트윗 목록 저장
  const [mode, setMode] = useState("list"); // write | list 모드에 따라 내용이 바뀌게
  const [index, setIndex] = useState(0);
  const switchMode = (state) => {
    setMode(state);
  }
  const saveTwit = (twit) => {
    setTwits([{...twit, id: index}, ...twits]);
    setIndex(index + 1);
  }
  const removeTwit = (id) => {
    setTwits(twits.filter((twit)=>twit.id !== id));
  }
  const editTwit = (newTwit)=>{
    setTwits(twits.map((obj)=>newTwit.id === obj.id? newTwit : obj));
  }
  return (
    <>
        <h1><img src="/twitter.svg" alt="트위터"/></h1>
        {mode === "list" ? <TwitList list={twits} switchMode={switchMode} removeTwit={removeTwit} editTwit={editTwit}/>:
          <TwitWrite saveTwit={saveTwit} switchMode={switchMode} /> }
    </>
  );
}

export default App;
