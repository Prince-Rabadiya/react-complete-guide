import React, { useContext, useState } from 'react'
import Modal from '../UI/Modal';
import CartContext from '../../store/cartContext';
import CartItem from './CartItem';
import classes from './Cart.module.css'
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = (cartCtx.items.length > 0)

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1});
  }

  const orderHanlder = () => {
    setIsCheckOut(true);
  }

  const submitOrderHandler = async(userData) => {
    setIsSubmiting(true);
    await fetch('https://react-demo-1b4c3-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });

    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const cartItems = <ul className={classes['cart-items']}>
    {cartCtx.items.map((item) => 
      <CartItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null, item.id)} 
        onAdd={cartItemAddHandler.bind(null, item)} 
      />)}
  </ul>;

  const cartModalContent = (<React.Fragment>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && <Checkout onCancel={props.onClose} onSubmit={submitOrderHandler}/>}
      {
        !isCheckOut && 
        (
          <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
          { 
            hasItems && 
            <button className={classes.button} onClick={orderHanlder}>
              Order
            </button>
          }
          </div>
        )
      }
  </React.Fragment>)

  const isSubmitingContent = <p>Sending data...</p>
  const didSubmitContent = (
    <React.Fragment>
      <p>Order sent.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  )

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && isSubmitingContent}
      {!isSubmiting && didSubmit && didSubmitContent}
    </Modal>
  )
}

export default Cart