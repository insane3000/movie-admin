import { ActionType } from "redux/types";
import { MovieIT, movieTemplate } from "interfaces/MovieInterface";
interface showMenu {
  type: ActionType.SHOW_MENU;
  payload: boolean;
}
interface loginServer {
  type: ActionType.LOGIN;
  user: string;
  token: string;
  role: string;
}
interface search {
  type: ActionType.SEARCH;
  payload: MovieIT;
}
interface scroll {
  type: ActionType.SCROLL;
  page: String;
  payload: Number;
}
interface modal {
  type: ActionType.MODAL;
  id: string;
  payload: Boolean;
}

export type ActionsInterface = showMenu | loginServer | search | scroll | modal;
