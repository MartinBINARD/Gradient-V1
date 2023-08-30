import { Reducer } from 'react';
import { AnyAction } from '@reduxjs/toolkit';

import { AppState } from '../../@types';

/*
  Un reducer est une FONCTION
  qui RETOURNE **UN** STATE

  Ce state sera créé à partir du :
    - state courant
    - action pour modifier ce state

  > un reducer prend le state courant et une action
  > pour générer un nouveau state qu'il retourne

  À la création du store, Redux appelle toues les reducers sans argument
  (colorReducer()) ; notre reducer va lui retourner un state à l'état initial

  Ce state va être mémoriser par le store
*/
// je crée mon state initial
const initialState: AppState = {
  firstColor: '#b0b',
  lastColor: '#c0ffee',
  direction: '90deg',
  nbColors: 0,
};

/*
  Avec Redux « normal » (non Toolkit),
  je dois typer mon reducer pour être sûr
  du type de state retourné
*/
const colorReducer: Reducer<AppState, AnyAction> = (
  state = initialState,
  action = { type: '@@INIT' }
) => {
  console.log(action);

  /*
    on a le state actuel et une action pour le modifier
    le rôle d'un reducer est de retourné ce nouveau state
  */

  // je traduis mon action `change_first_color` en modifiant le state
  // if (action.type === 'change_first_color') {
  //   return {
  //     ...state, // je déverse tout le state actuel
  //     nbColors: state.nbColors + 1, // je modifie la valeur de `nbColors`
  //     firstColor: '#fab',
  //   };
  // }

  switch (action.type) {
    case 'change_first_color':
      return {
        ...state, // je déverse tout le state actuel
        nbColors: state.nbColors + 1, // je modifie la valeur de `nbColors`
        // je modifie la valeur avec l'info reçue dans mon action = le payload
        firstColor: action.payload,
      };

    case 'change_last_color':
      return {
        ...state, // je déverse tout le state actuel
        nbColors: state.nbColors + 1, // je modifie la valeur de `nbColors`
        lastColor: action.payload,
      };

    default:
      return state;
  }

  return state;
};

export default colorReducer;
