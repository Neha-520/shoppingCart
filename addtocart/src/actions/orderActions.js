import {CLEAR_ORDER, CREATE_ORDER } from "../types"

export const createOrder = (order) =>(dispatch) =>{
    //we need to send ajax req to server to create an order
    //fetch method returns a promise
  fetch("/api/orders",{
      method: "POST",
     headers: {
         "Content-Type" : "application/json",
     },
     body: JSON.stringify(order),
  }).then((res) =>res.json())
  .then((data) =>{
      dispatch({type:CREATE_ORDER, payload: data});
     localStorage.clear("cartItems");
 });
};
export const clearOrder = () => (dispatch) =>{
  dispatch({
      type: CLEAR_ORDER,
      payload:null,
  })
};