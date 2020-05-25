import { useReducer, createContext, useContext } from 'react';

const StateDispatch = createContext(null);

export const useStore = () => useContext(StateDispatch);

export const Provider = StateDispatch.Provider;
