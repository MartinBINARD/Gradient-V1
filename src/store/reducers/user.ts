const initialState = {
  firstName: 'Dave',
  lastName: 'Lopper',
};

function userReducer(state = initialState, action = { type: '@@INIT' }) {
  return state;
}

export default userReducer;
