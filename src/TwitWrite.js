import {useState} from "react";

export default function TwitWrite({ switchMode, saveTwit }){
  const [index, setIndex] = useState(0);
  const handleClick = ()=>{
    saveTwit({
      ...twit,
      id: index,
      time: new Date().getTime()
    })
    switchMode("list");
    setIndex(index + 1);
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
    <textarea name="content" onChange={handleChange}>{twit.content}</textarea>
    <div>
        <button type="submit" onClick={handleClick}>트윗 하기</button>
        <button type="button" onClick={handleCancel}>취소 하기</button>
    </div>
  </div>
}