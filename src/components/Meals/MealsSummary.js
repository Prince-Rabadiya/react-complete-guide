import React from 'react'
import classes from './MealsSummary.module.css'

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>A place where always something delicious is being cooked.</h2>
      <p>Let us know what you like to consume and we will have it ready for you within 10 mins.</p>
      <p>It's all our duty to make sure that we don't waste any food.</p>
    </section>
  )
}

export default MealsSummary