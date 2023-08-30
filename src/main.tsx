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
*/
console.log(store.getState());

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
});

document.getElementById('randLast')!.addEventListener('click', () => {
  // data
  state.nbColors += 1;
  state.lastColor = randomHexColor();
  // ui
  renderNbColors();
  renderGradient();
  renderColors();
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
