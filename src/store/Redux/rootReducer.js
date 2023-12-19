import { combineReducers } from "redux";
import ItemReducer from "./ItemReducer";

const rootReducer = combineReducers({
  items: ItemReducer,
});

export default rootReducer;
