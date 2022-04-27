import React, { useEffect, useState, useContext } from 'react'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cartContext'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
  const [btnBump, setBtnBump] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const totalItems = items.reduce((currentCount, item) => {
    return currentCount + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0){
      return;
    }
    setBtnBump(true);

    const timer = setTimeout(() => {
      setBtnBump(false);
    } ,300)

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick} >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>
        Your Cart
      </span>
      <span className={classes.badge}>
        {totalItems}
      </span>
    </button>
  )
}

export default HeaderCartButton