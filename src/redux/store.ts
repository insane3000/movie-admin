import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// reducers
import appReducer from "redux/reducers/appReducer";

const reducers = combineReducers({
  app: appReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
