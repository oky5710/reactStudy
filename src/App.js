import "./style/reset.css";
import "./style/twitter.css";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import TwitWrite from "./TwitWrite";
import TwitList from "./TwitList";
import axios from "axios";

function App() {
  const [twits, setTwits] = useState([]); // 트윗 목록 저장
  const [mode, setMode] = useState("list"); // write | list 모드에 따라 내용이 바뀌게

  const today = useMemo(() => {
    const now = new Date().getTime();
    const time = now - now % (1000 * 60 * 60 * 24);
    return twits.reduce((acc, cur) => {
      if (cur.time >= time) acc++;
      return acc;
    }, 0);
  }, [twits]);

  const switchMode = useCallback((state) => {
    setMode(state);
  }, []);
  const saveTwit = useCallback((twit) => {
    setTwits(prev => [{...twit, id: Math.floor(Math.random() * 1000000), isLike: false}, ...prev]);
  }, []);
  const removeTwit = useCallback((id) => {
    setTwits(prev => prev.filter((twit) => twit.id !== id));
  }, []);
  const editTwit = useCallback((newTwit) => {
    setTwits(prev => prev.map((obj) => newTwit.id === obj.id ? {...obj, ...newTwit} : obj));
  }, []);
  const randomTwit = () => {
    const randomTxt = ["개쓰레기 요일이네", "아시아 최상위권 대학에 5개국어를 하고 3개 컴퓨터 언어를 구사하는 내가?", "그런다고 욕하고 저주할 일인가요?", "회사 가기 싫다", "직장인들 퇴근 시켜라 이시간 이후 데리고 있어봤자 트위터나 한다.", "한편 나라가 디비진다", "애들아 일만하지말고 트윗 좀 열심히 해라"]
    return randomTxt[Math.floor(Math.random() * randomTxt.length)]
  }
  useEffect(() => {
    axios.get(`https://randomuser.me/api/?results=${Math.floor(Math.random() * 100)}`).then((res) => {
      setTwits(res.data.results.map((user, i) => ({
        id: i,
        author: user.name.first,
        time: new Date(user.registered.date).getTime(),
        content: randomTwit(),
        image: user.picture.thumbnail

      })))
    })
  }, []);
  return (
    <>
      <h1><img src="/twitter.svg" alt="트위터"/></h1>
      <div className="today-twit">오늘 올라온 새 트윗: <strong>{today}</strong></div>
      {mode === "list" ? <TwitList list={twits} switchMode={switchMode} removeTwit={removeTwit} editTwit={editTwit}/> :
        <TwitWrite saveTwit={saveTwit} switchMode={switchMode}/>}
    </>
  );
}

export default App;
