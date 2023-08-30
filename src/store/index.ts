import { configureStore } from '@reduxjs/toolkit';

import colorReducer from './reducers/color';

const store = configureStore({
  // un REDUCER est un objet qui va contenir toutes les fonctions
  // qui vont MODIFIER LE STATE
  // → c'est fonctions sont appelées des… _reducers_
  reducer: { toto: colorReducer },
});

export default store;
