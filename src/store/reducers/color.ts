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

function colorReducer(state = initialState, action = { type: '@@INIT' }) {
  return state;
}

export default colorReducer;
