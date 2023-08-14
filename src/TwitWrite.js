import {useRef, useState} from "react";

export default function TwitWrite({ switchMode, saveTwit }){
  const [error, setError] = useState({
    author: null,
    content: null
  });
  const inpRef = useRef();
  const textareaRef = useRef();
  const handleClick = ()=>{
    if(!twit.author) {
      setError({...error, author: "작성자를 입력해주세요."});
      return;
    }
    if(!twit.content) {
      setError({...error, content: "트윗을 입력해주세요."});
      return;
    }
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
    time: null,
    isLike:false
  });
  const handleChange = (e) => {
    setError({
      ...error,
      [e.target.name]: e.target.value? null: e.target.name === "author"? "직성자를 입력해주세요.": "트윗을 입력해주세요"
    });
    if(error[e.target.name] !== null) return;
    setTwit({
      ...twit,
      [e.target.name]: e.target.value
    })
  }
  return <div className="form-twit">
    <input type="text" name="author" value={twit.author} onChange={handleChange} ref={inpRef} />
    {error.author && <p className="error">{error.author}</p>}
    <textarea name="content" onChange={handleChange} value={twit.content} ref={textareaRef}/>
    {error.content && <p className="error">{error.content}</p>}
    <div className="btns-twit">
        <button type="submit" onClick={handleClick} className="btn-twit">트윗 하기</button>
        <button type="button" onClick={handleCancel} className="btn-cancel-twit">취소 하기</button>
    </div>
  </div>
}