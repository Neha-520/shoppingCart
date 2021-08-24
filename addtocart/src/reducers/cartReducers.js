import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../types";

export const cartReducer = (
    state= {cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]")} //is cartItems doesnt exist we pass an empty array as string which will be parsed to an empty array
    ,action
    ) =>{
    switch(action.type){
       case ADD_TO_CART:
           return{
               cartItems: action.payload.cartItems
           };
        case REMOVE_FROM_CART:
            return{
             cartItems: action.payload.cartItems
            };
        case CLEAR_CART:
         return {
         cartItems: []
      }  
       default:
           return state;    
    }
}