import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isSixChars = value => value.trim().length === 6;

const Checkout = (props) => {
  const [formFieldsValidity, setFormFieldsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityRef.current.value;

    const nameValid = !isEmpty(enteredName);
    const streetValid = !isEmpty(enteredStreet);
    const cityValid = !isEmpty(enteredCity);
    const postalValid = isSixChars(enteredPostal);

    setFormFieldsValidity({
      name: nameValid,
      street: streetValid,
      postal: postalValid,
      city: cityValid,
    });

    const isFormValid = nameValid && streetValid && postalValid && cityValid

    if (!isFormValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredCity,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  const dynamicNameClasses = `${classes.control} ${formFieldsValidity.name ? '' : classes.invalid}`;
  const dynamicStreetClasses = `${classes.control} ${formFieldsValidity.street ? '' : classes.invalid}`;
  const dynamicPostalClasses = `${classes.control} ${formFieldsValidity.postal ? '' : classes.invalid}`;
  const dynamicCityClasses = `${classes.control} ${formFieldsValidity.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={dynamicNameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef}/>
        {!formFieldsValidity.name && <p>Invalid Name</p>}
      </div>
      <div className={dynamicStreetClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef}/>
        {!formFieldsValidity.street && <p>Invalid Street</p>}
      </div>
      <div className={dynamicPostalClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalRef}/>
        {!formFieldsValidity.postal && <p>Invalid Postal</p>}
      </div>
      <div className={dynamicCityClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef}/>
        {!formFieldsValidity.city && <p>Invalid City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;