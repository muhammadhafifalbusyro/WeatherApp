import React, {useReducer, createContext, useEffect} from 'react';

const initialValue = {
  isDark: false,
};

const globalTypes = {
  TOGGLE_IS_DARK: 'TOGGLE_IS_DARK',
  TOGGLE_IS_LIGHT: 'TOGGLE_IS_LIGHT',
  SET_THEME: 'SET_THEME',
};

const reducer = (state, action) => {
  switch (action.type) {
    case globalTypes.TOGGLE_IS_DARK:
      return {isDark: true};
    case globalTypes.TOGGLE_IS_LIGHT:
      return {isDark: false};
    case globalTypes.SET_THEME:
      return {isDark: action.payload};
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialValue);
export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  console.log('ini state', state);
  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};
