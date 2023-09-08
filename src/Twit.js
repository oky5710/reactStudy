import React, {useMemo, useState} from "react";
import axios from "axios";

export default function Twit({id, image = null, author, content, time, isLike, removeTwit, editTwit, switchMode}) {
  const [loading, setLoading] = useState(false);
  const handleRemove = () => {
    removeTwit(id)
  }

  const [newTwit, setNewTwit] = useState(null);
  const handleEdit = () => {
    setIsWrite(true);
    setNewTwit(content);
  }
  const [isWrite, setIsWrite] = useState(false);
  const handleChange = (e) => {
    setNewTwit(e.target.value)
  }
  const handleCancel = () => {
    switchMode("list");
    setIsWrite(false);
    setNewTwit(content);
  }
  const handleSave = () => {
    editTwit({
      id,
      author,
      isLike,
      content: newTwit,
      time: new Date().getTime()
    });
    switchMode("list");
    setIsWrite(false);
  }
  const handleLike = () => {
    editTwit({
      id,
      isLike: !isLike,
    });
  }
  const [picture, setPicture] = useState(image);
  useMemo(async () => {
    if (image === null) {
      setLoading(true)
      const {data} = await axios.get("https://cataas.com/api/tags");
      const tag = data[Math.floor(Math.random() * data.length)]
      setPicture(`https://cataas.com/cat/${tag}?width=48&type=sq`);
      setLoading(false)
    }
  }, [image])

  return <li key={id}>
    <img src={loading ? "/loading.gif" : picture} alt={author}/>
    <div className="twit-right">
      <div className="twit-title">
        <strong>{author}</strong>
        <span>{time}</span>
      </div>
      {isWrite ? <textarea value={newTwit} onChange={handleChange}/> : <p>{content}</p>}
      {!isWrite ? <div className="btns-twit-list">
        <button type="button" onClick={handleEdit}><img src="/ic-edit.png" alt="수정"/></button>
        <button type="button" onClick={handleRemove}><img src="/ic-close.png" alt="삭제"/></button>
        <button type="button" onClick={handleLike}
                className={(isLike) ? "btn-like-full" : "btn-like-empty"}>{isLike ? "♥︎" : "♡"}</button>
      </div> : <div className="btns-twit-list">
        <button type="button" onClick={handleSave}><img src="/ic-save.png" alt="저장"/></button>
        <button type="button" onClick={handleCancel}><img src="/ic-cancel.png" alt="취소"/></button>
      </div>}
    </div>
  </li>
}