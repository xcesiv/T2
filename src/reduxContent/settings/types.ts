import { Node, Path } from '../../types/general';
export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export const CHANGE_NODE = 'CHANGE_NODE';
export const ADD_NODE = 'ADD_NODE';
export const REMOVE_NODE = 'REMOVE_NODE';
export const CHANGE_PATH = 'CHANGE_PATH';
export const ADD_PATH = 'ADD_PATH';
export const REMOVE_PATH = 'REMOVE_PATH';
export const CLEAR_STATE = 'CLEAR_STATE';

export interface ChangeLocaleAction {
  type: typeof CHANGE_LOCALE;
  locale: string;
}
export interface ChangeNodeAction {
  type: typeof CHANGE_NODE;
  name: string;
}

export interface AddNodeAction {
  type: typeof ADD_NODE;
  node: Node;
}

export interface RemoveNodeAction {
  type: typeof REMOVE_NODE;
  name: string;
}

export interface ChangePathAction {
  type: typeof CHANGE_PATH;
  label: string;
}

export interface AddPathAction {
  type: typeof ADD_PATH;
  path: Path;
}

export interface RemovePathAction {
  type: typeof REMOVE_PATH;
  label: string;
}

export type SettingsActionTypes =
  | ChangeNodeAction
  | ChangeLocaleAction
  | AddNodeAction
  | RemoveNodeAction
  | AddPathAction
  | ChangePathAction
  | RemovePathAction;
