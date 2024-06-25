import React from 'react';
import classes from './TopNavbar.module.css';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import { setLang } from '../Slices/LanguageSlice';

const Navbar = () => {
   const dispatch = useDispatch();
   const {lang} = useSelector((state) =>state.LanguageSlice)
   console.log(lang)
  return (
    <div className={classes.container}>
    <div className={classes.logo}>
    <img src="/assets/images/toonflix.png" alt="" className={classes.logo_img} />
    </div>
    <div className={classes.buttons}>
    <button className={`${classes.btn}  ${lang == 'en' && classes.active}`} onClick={()=>{dispatch(setLang('en'))}}>
  <span>En</span>
</button>
     <button className={`${classes.btn} ${lang == 'ta' && classes.active}`} onClick={()=>{dispatch(setLang('ta'))}}>
  <span>Ta</span>
</button>
     <button className={`${classes.btn} ${lang == 'sin' && classes.active}`} onClick={()=>{dispatch(setLang('sin'))}}>
  <span>Sin</span>
</button>
    </div>
    </div>
  )
}

export default Navbar
