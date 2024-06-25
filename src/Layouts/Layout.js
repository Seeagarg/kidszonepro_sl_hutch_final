import React from 'react'
import classes from './Layout.module.css'
import TopNavbar from '../Components/TopNavbar'

const Layout = ({children}) => {
  return (
    <div className={classes.container}>
    <TopNavbar/>
    {children}
    </div>
  )
}

export default Layout
