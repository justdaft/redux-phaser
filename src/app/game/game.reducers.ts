import {Reducer} from '@ngrx/store';

export const ADD_GAME_STATE = 'ADD_GAME_STATE';

export const gameStates: Reducer<any> = (state: Array<any> = [], {type, payload }) => {
  console.log('ACTION:', type, payload);
  switch (type) {
    case ADD_GAME_STATE:
      return state.concat([Object.assign({}, payload, {id: state.length + 1})]);
    default:
      return state;
  }
};
