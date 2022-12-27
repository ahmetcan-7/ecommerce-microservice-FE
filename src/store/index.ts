import { combineReducers } from "redux";
import { CartState } from "../types/cart";
import { UserState } from "../types/user";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";

export interface AppState {
  user: UserState;
  cart: CartState;
}

const rootReducer = combineReducers<AppState>({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
