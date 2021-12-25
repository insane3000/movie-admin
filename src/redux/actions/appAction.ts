import { ActionType } from "redux/types";
import { Dispatch } from "redux";
import { ActionsInterface } from "interfaces/ActionsInterface";
import { MovieIT } from "interfaces/MovieInterface";

// !Seteando SHOW MENU
export const showMenu = (data: boolean) => (dispatch: Dispatch<ActionsInterface>) => {
  // console.log(data);
  dispatch({
    type: ActionType.SHOW_MENU,
    payload: data,
  });
};
// !Seteando LOGIN
export const loginServer =
  (user: string, token: string, role: string) => (dispatch: Dispatch<ActionsInterface>) => {
    // console.log(data);
    dispatch({
      type: ActionType.LOGIN,
      user,
      token,
      role,
    });
  };
// !Seteando SEARCH
export const search = (data: MovieIT) => (dispatch: Dispatch<ActionsInterface>) => {
  // console.log(data);
  dispatch({
    type: ActionType.SEARCH,
    payload: data,
  });
};
// !Seteando SCROLL
export const restartScroll =
  (page: String, data: Number) => (dispatch: Dispatch<ActionsInterface>) => {
    // console.log(page, data);
    dispatch({
      type: ActionType.SCROLL,
      page,
      payload: data,
    });
  };
// !Seteando MODAL
export const setModal = (id: string, data: Boolean) => (dispatch: Dispatch<ActionsInterface>) => {
  console.log(data);
  dispatch({
    type: ActionType.MODAL,
    id: id,
    payload: data,
  });
};
