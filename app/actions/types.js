import type { Game, Credentials } from '../utils/globalTypes';

export type Action =
    { type: 'LOGIN_REQUEST', creds: Credentials }
  | { type: 'LOGIN_SUCCESS' }
  | { type: 'LOGIN_FAILURE', message: string }
  | { type: 'LOGOUT_SUCCESS' }
  | { type: 'RESET_ERROR' }
  | { type: 'START_DOWNLOAD', id: string }
  | { type: 'FINISH_DOWNLOAD' }
  | { type: 'SET_INIT_STATE', isInstalled: boolean, isDownloading: boolean }
  | { type: 'ADD_GAME', game: Game }
  | { type: 'ADD_GAMES', games: Array<Game> }
  | { type: 'ADD_EDIT_GAME', game: Game }
  | { type: 'REQUEST_GAMES' }
  | { type: 'RECEIVE_GAMES', games: Array<Game> }
  | { type: 'ALLOW_PLAYER', index: number, user: string }
  | { type: 'REQUEST_USER_GAMES' }
  | { type: 'RECEIVE_USER_GAMES', games: Array<Game> }
  | { type: 'ADD_USER_GAME', game: Game }
  | { type: string }
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
