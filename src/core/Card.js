import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import $ from 'jquery';
import 'bootstrap';

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = f => f,
  reload = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  const handlemodal = () =>{
  $('#myModal').modal('show'); 

  }
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product}/>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescrption}
        </p>
       
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
        <div className="row">
        <div className="col-6"> <button type="button" className="btn btn-block btn-outline-success mt-2 mb-2" onClick={handlemodal}>
        View details
      </button></div>
          <div className="col-6">{showAddToCart(addtoCart)}</div>
          <div className="col-6">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
      <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">

      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product}/>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescrption}
        </p>
       
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
  
      </div>
      
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Card;
