
const initState = {}

const userReducer = function (preState = initState, action) {
  let { type, data } = action;
  switch (type) {
    case 'updateUserInfo':
      return Object.assign({}, preState, data);
    case 'clearUserInfo':
      return Object.assign({}, {})
    default:
      return preState
  }
}

export default userReducer;

