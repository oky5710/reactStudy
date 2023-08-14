import {useState} from "react";

export default function TwitWrite({ switchMode, saveTwit }){
  const handleClick = ()=>{
    saveTwit({
      ...twit,
      time: new Date().getTime()
    })
    switchMode("list");
  }
  const handleCancel = () =>{
    switchMode("list");
  }
  const [twit, setTwit] = useState({
    id: "",
    author: "",
    content: "",
    time: null
  });
  const handleChange = (e) => {
    setTwit({
      ...twit,
      [e.target.name]: e.target.value
    })
  }
  return <div>
    <input type="text" name="author" value={twit.author} onChange={handleChange} />
    <textarea name="content" onChange={handleChange} value={twit.content}/>
    <div>
        <button type="submit" onClick={handleClick}>트윗 하기</button>
        <button type="button" onClick={handleCancel}>취소 하기</button>
    </div>
  </div>
}