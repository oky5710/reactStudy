import React from "react";
import Twit from "./Twit";

function TwitList({list, switchMode, removeTwit, editTwit}) {
  const handleClick = () => {
    switchMode("write")
  }
  return <>
    {
      list.length === 0 ? <div className="no-data">데이터가 없습니다.</div> :
        <ul className="twit-list">
          {
            list.map((twit) => {
              const timestamp = new Date().getTime() - twit.time;
              const time = (timestamp < 1000 * 60 * 60) ?
                `${Math.floor(timestamp / (1000 * 60))}분 전` :
                (timestamp < 1000 * 60 * 60 * 24) ?
                  `${Math.floor(timestamp / (1000 * 60 * 60))}시간 전` :
                  `${Math.floor(timestamp / (1000 * 60 * 60 * 24))}일 전`;
              return <Twit
                key={twit.id}
                {...twit}
                time={time}
                removeTwit={removeTwit}
                editTwit={editTwit}
                switchMode={switchMode}/>
            })
          }
        </ul>
    }
    <button type="button" title="트윗 하기" onClick={handleClick} className="btn-add-twit">트윗 하기</button>
  </>
}

export default React.memo(TwitList);