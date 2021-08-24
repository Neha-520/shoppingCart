import React,{useState,useEffect} from 'react'
import Modal from 'react-modal'
import Zoom from "react-reveal/Zoom"
import Fade from "react-reveal/Fade"
import {connect} from "react-redux";
import {fetchProducts} from '../actions/productActions'
import {addToCart} from '../actions/cartActions';

function Products(props)  {
const [state, setstate] = useState({
    product: null,
});

useEffect(() => {
 props.fetchProducts();
 // eslint-disable-next-line react-hooks/exhaustive-deps
},[]);



const openModal = (product) =>{
  setstate({product});
}
const closeModal =()=>{
    setstate({product : null})
};

    return (
        <>
        <div>
        <Fade bottom cascade>
            {!props.products ? (
                <div> Loading...</div> 
                ) :( 
           <ul className="products">
             {
                 props.products.map(p =>(
                 <li key={p._id}>
                     <div className="product">
                       <a href={"# "+ p._id} onClick={() => openModal(p)}>
                           <img src={p.image} alt={p.title}/>
                       <p>
                           {p.title}
                       </p>
                       </a>
                       <div className="product-price">
                         <div>
                             {`Rs. ${p.price}`}
                         </div>
                         <button onClick={() =>props.addToCart(p)} className="button primary">
                             Add To Cart
                         </button>
                       </div>
                     </div>
                 </li>
             ))}
           </ul> 
           )}      
           </Fade>
           { state.product && (
             <Modal isOpen={true} onRequestClose={closeModal}>
                <Zoom>
                <button className="close-modal" onClick={closeModal}>x</button>
                 <div className="product-details">
                     <img src={state.product.image} alt={state.product.title}></img>
                     <div className="product-details-description">
                     <p>
                         <strong>{state.product.title}</strong>
                     </p>
                     <p>
                         {state.product.description}
                     </p>
                     <p>
                         Available Sizes: {" "}
                         {
                             state.product.availableSizes.map( x=>(
                                 <span> {" "}
                                 <button className="button">{x}</button>
                                 </span>
                             ))
                         }
                     </p>
                     <div className="product-price">
                        <div> {`Rs ${state.product.price}`}</div>
                        <button className="button primary" onClick={()=>{
                            props.addToCart(state.product);
                            closeModal();
                        }}>
                            Add To Cart
                        </button>
                     </div>
                     </div>
                 </div>
                 </Zoom>
             </Modal>
            )} 
        </div>
        </>
    )
}
//1st param is function that accept state and return an object that define which part of redux state we r going to use
//2nd param is the list of action we are going to use
//connect function itself return other function and the param  it accepts is name of component we r going to connect
export default connect(
(state) => ({ products: state.products.filteredItems}),
{
    fetchProducts,
    addToCart,
}
)(Products);
