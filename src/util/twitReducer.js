const twitReducer = (state, action) => {
  switch (action.type) {
    case "SAVE":
      return [{...action.data, id: Math.floor(Math.random() * 1000000), isLike: false}, ...state];
    case "REMOVE":
      return state.filter((twit) => twit.id !== action.id);
    case "EDIT":
      return state.map((obj) => action.content.id === obj.id ? {...obj, ...action.content} : obj);
    case "INIT":
      return action.data;
    default:
      return state;
  }
}
export default twitReducer;