import React from 'react'
import classes from './SubLayout.module.css'

const SubLayout = ({children}) => {
  return (
    <div className={classes.container}>
    <div className={classes.sub_container}>
    <img src="/assets/images/toonflix.png" alt="" className={classes.img} />
    {children}
    </div>
    </div>
  )
}

export default SubLayout
