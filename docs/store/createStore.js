/*
  `createStore`, c'est quoi ? quel type ?
    → c'est une fonction qui prends des options
    → qui retourne un objet

  les options (paramètres) ressemblent à quoi ?
    → un objet avec une propriété `reducer`

  à l'initialisation, qu'est-ce qui se passe ?
    → crée le state
      en appelant les reducers sans arguments
      les reducers retournent alors « leur » `initialState`
  
  comment lire le state ?
    → grâce à la méthode (retournée) `getState()`

  comment modifie-t-on le state ?
    → grâce à la méthode (retournée) `dispatch()`

  que fait `dispatch` ?
    → il modifie le state en appelant le reducer
    avec, comme arguments, le state actuel
    et l'action reçue en paramètre

  que se passe-t-il quand le state est modifié ?
    → on exécute les callbacks abonnés

  comment crée-t-on un _subscriber_ ?
    → grâce à la méthode (retournée) `subscribe()`
*/
function createStore({ reducer }) {
  // (en mode simplifié)
  // le reducer est appelé sans argument pour initialiser le state global
  let state = reducer();
  const subscribers = [];

  // le store est un objet
  return {
    // méthode pour lire le state
    getState() {
      return state;
    }

    subscribe(cb) {
      subscribers.push(cb);
    }

    // méthode pour modifier la state
    dispatch(action) {
      // on récupère un state modifié en appelant le reducer
      state = reducer(state, action);

      // on execute les callback abonnés (subscribers)
      subscribers.forEach((subscriber) => {
        subscriber();
      })
    }
  }
}

const store = createStore();