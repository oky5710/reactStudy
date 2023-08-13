import React from "react";

export default function TwitList({list,switchMode}){
  const handleClick = ()=>{
    switchMode("write")
  }
  return <>
    {
      list.length === 0 ? <div>데이터가 없습니다.</div> :
        <ul>
          {
            list.map((twit)=>{
              const timestamp = new Date().getTime() - twit.time;
              const time = (timestamp < 1000*60*60)?
                `${Math.floor(timestamp/(1000*60))}분 전` :
                (timestamp < 1000*60*60*24) ?
                  `${Math.floor(timestamp/(1000*60*60))}시간 전` :
                  `${Math.floor(timestamp/(1000*60*60*24))}일 전`;
              return <li key={twit.id}>
              <div>
                <strong>{twit.author}</strong>
                <span>{time}</span>
              </div>
              <p>{twit.content}</p>
            </li>})
          }
        </ul>
    }
    <button type="button" title="트윗 하기" onClick={handleClick}>+</button>
  </>
}