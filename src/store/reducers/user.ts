const initialState = {
  firstName: 'Dave',
  lastName: 'Lopper',
};

function userReducer(state = initialState, action = { type: '@@INIT' }) {
  console.log('USER REDUCER', action);

  return state;
}

export default userReducer;
