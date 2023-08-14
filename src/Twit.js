import React, {useState} from "react";

export default function Twit ({id, author, content, time, removeTwit, editTwit, switchMode}) {
  const handleRemove = () => {
    removeTwit(id)
  }
  const [newTwit, setNewTwit] = useState(content);
  const handleEdit = () =>{
    setIsWrite(true)
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
      content: newTwit,
      time: new Date().getTime()
    });
    switchMode("list");
    setIsWrite(false);
  }

  return <li key={id}>
    <div>
      <strong>{author}</strong>
      <span>{time}</span>
    </div>
    {isWrite? <textarea value={newTwit} onChange={handleChange}/>:<p>{content}</p> }
    {!isWrite? <div>
      <button type="button" onClick={handleEdit}><img src="/ic-edit.png" alt="수정"/></button>
      <button type="button" onClick={handleRemove}><img src="/ic-close.png" alt="삭제"/></button>
    </div> : <div>
      <button type="button" onClick={handleSave}><img src="/ic-save.png" alt="저장"/></button>
      <button type="button" onClick={handleCancel}><img src="/ic-cancel.png" alt="취소"/></button>
    </div>}
  </li>
}