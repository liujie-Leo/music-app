let initState = {
  context: {},
  name: '',
  id:''
}

const playerReducer = function (preState = initState,action) {
  let { type, data } = action;
  switch (type) {
    case "updatePlayer":
      return Object.assign({}, preState, data);
    case "pausePlayer":
      return {};
    case "startPlayer":
      return {};
    case "stopPlayer":
      return {};
    default:
      return preState;
  }
}

export default playerReducer