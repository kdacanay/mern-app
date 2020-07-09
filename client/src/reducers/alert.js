// reducer is a function that takes in state that has to do with alerts and an action. action gets dispatched from an action file
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';


const initialState = [];

export default function (state = initialState, action) {

  const { type, payload } = action;


  switch (action.type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}