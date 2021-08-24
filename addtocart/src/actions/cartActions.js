import { ADD_TO_CART, REMOVE_FROM_CART,CLEAR_CART } from "../types";
import store from "../store";
export const addToCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExists = false;
    cartItems.forEach((x) => {
      if (x._id === product._id) {
        alreadyExists = true;
        x.count++;
      }
    });
    if (!alreadyExists) {
      cartItems.push({ ...product, count: 1 });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: { cartItems },
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  
 export const removeFromCart = (product) => (dispatch) => {
     const cartItems = store.getState()
       .cart.cartItems.slice()
       .filter((x) => x._id !== product._id);
     dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
     localStorage.setItem("cartItems", JSON.stringify(cartItems));
   };

   export const clearCart = () => (dispatch) =>{
    dispatch({
        type:CLEAR_CART,
    })
}


// export const removeFromCart = (product)=>(dispatch) =>{
//     const cartItems = s.getState()
//     .cart.cartItems.slice()
//     .filter(
//         x => x.id !== product.id
//     )
//     dispatch({
//         type: actions.REMOVE_FROM_CART,
//         payload: {cartItems}
//     })
//     localStorage.setItem("cartItems",JSON.stringify(cartItems))
// }