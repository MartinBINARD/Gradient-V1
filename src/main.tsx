// == Imports
import store from './store';

import { randomHexColor, generateSpanColor } from './utils/color';

// import { AppState } from './@types';

import './styles/index.scss';

/*
  Store (Redux)

  est un objet avec 3 méthodes principales :

  1. `getState()` : lecture du state
      output :
      {
        color: { // nom du
          firstColor: '#e367a4',
          lastColor: '#48b1f3',
          direction: '90deg',
          nbColors: 0
        }
      }

  2. `subscribe(cb)` : exécuter des callback quand le state est modifié

  3. `dispatch(action)` : émettre des actions / des intentions de modifier mon état
*/
// console.log(store.getState());

// == State
// const state: AppState = {
//   firstColor: '#e367a4',
//   lastColor: '#48b1f3',
//   direction: '90deg',
//   nbColors: 0,
// };

// == Rendu dans le DOM
function renderNbColors() {
  // je récupère le state global
  const state = store.getState();
  // je vais chercher `nbColors` dans le reducer `color`
  const { nbColors } = state.color;

  /*
    le `!` indique à TS que l'élément ne sera jamais `null`
    (à utiliser avec précaution)
  */
  document.querySelector('.nbColors')!.innerHTML = `
    ${nbColors} couleur(s) générée(s)
  `;
}
function renderGradient() {
  const { direction, firstColor, lastColor } = store.getState().color;

  /*
    par défaut, `document.querySelector` retourne un type `Element`
    qui n'a pas de propriété `style` ;
    on spécifie qu'il s'agit d'un `HTMLElement` qui l'a.
  */
  document.querySelector<HTMLElement>('.gradient')!.style.background = `
    linear-gradient(${direction},${firstColor},${lastColor})
  `;
}
function renderColors() {
  const { firstColor, lastColor } = store.getState().color;

  const firstSpan = generateSpanColor(firstColor);
  const lastSpan = generateSpanColor(lastColor);

  const result = `${firstSpan} - ${lastSpan}`;

  document.querySelector('.colors')!.innerHTML = result;
}

// == Initialisation
renderNbColors();
renderGradient();
renderColors();

/*
  Subscribe

  on appelle des fonctions à chaque modification du store
*/
store.subscribe(() => {
  console.log('state WAS UPDATED');
  // à chaque modification des données
  // on exécute les fonctions de rendus
  renderNbColors();
  renderGradient();
  renderColors();
});

// == Controls
document.getElementById('randAll')!.addEventListener('click', () => {
  // debug
  console.log('Random all colors');
  // data
  state.nbColors += 2;
  state.firstColor = randomHexColor();
  state.lastColor = randomHexColor();
  // ui
  renderNbColors();
  renderGradient();
  renderColors();
});

document.getElementById('randFirst')!.addEventListener('click', () => {
  // // data
  // state.nbColors += 1;
  // state.firstColor = randomHexColor();
  // // ui
  // renderNbColors();
  // renderGradient();
  // renderColors();
  // on veut remplacer ces instructions par un ordre, une intention
  // on utilisera un « commis » qui traduira cette intention :
  //   - modifier le state (gestion des données)
  //   - mettre à jour l'interface (gestion de l'UI)
  //
  // > on aura même droit à un outil de debug
  //
  // → commis.fais(intention) : c'est le rôle d'un **store** (_gardien du state_)

  /*
    Dispatch

    à chaque fois qu'on voudra modifier le state,
    il **faudra** émettre une intention / dispatcher une action

    Cette action sera envoyée au reducer avec le state courant par le store ;
    le reducer pourra ainsi créer et retourner un nouveau state

    nous : store.dispatch(action)
    store : state = reducer(currentState, action);

    Une obligation : un action est un OBJET avec une propriété TYPE obligatoire
  */
  const action = {
    // le type est une chaîne de caractères qui décrit notre action
    type: 'change_first_color',
  };
  // j'émets mon intention
  store.dispatch(action);
});

document.getElementById('randLast')!.addEventListener('click', () => {
  // // data
  // state.nbColors += 1;
  // state.lastColor = randomHexColor();
  // // ui
  // renderNbColors();
  // renderGradient();
  // renderColors();
  store.dispatch({
    type: 'change_last_color',
  });
});

document.getElementById('toLeft')!.addEventListener('click', () => {
  // data
  state.direction = '270deg';
  // ui
  renderGradient();
  renderColors();
});

document.getElementById('toRight')!.addEventListener('click', () => {
  // data
  state.direction = '90deg';
  // ui
  renderGradient();
  renderColors();
});
