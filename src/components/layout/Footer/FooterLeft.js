import React from 'react'
import classes from './Footer.module.css'
import Logo from '../../layout/Header/Logo/Logo'

const FooterLeft = () => {
  return (
    <div className={classes.footerLeft}>
        <div className={classes.logoContainer}>
            <Logo className={classes.logo}/>
        </div>
    </div>
  )
}

export default FooterLeft