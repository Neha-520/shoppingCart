import { createStore, applyMiddleware,compose,combineReducers} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { orderReducer } from "./reducers/orderReducers";
import { productsReducer} from "./reducers/productReducers";

const initialState = {};

//used compose function to compose all middlewares together
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//we can send all info about our redux store to chrome redux devtools


//created store
const store = createStore(combineReducers({
    products: productsReducer, //can pass multiple reducers in name value pairs
    cart: cartReducer,
    order: orderReducer,
}),
initialState, 
composeEnhancer(applyMiddleware(thunk)), //using redux thunk middlewares because in our action we are sending async 
//request to server to get data such actions are handled by middlewares
);
export default store;